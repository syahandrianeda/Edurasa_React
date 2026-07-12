import React, { useEffect, useRef } from 'react';

export interface UseIframeEditorOptions {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  initialContent?: string;
  onChange?: (html: string) => void;
  debounceMs?: number;
  appScriptUrl?: string;
  onContextMenu?: (payload: { x: number; y: number; text: string }) => void;
}

export function useIframeEditor(opts: UseIframeEditorOptions) {
  const { iframeRef, initialContent = '', onChange, debounceMs = 600, appScriptUrl, onContextMenu } = opts;
  const changeTimer = useRef<number | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      // Inject bootstrap CSS
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
      doc.head.appendChild(link);

      // Initialize editable area
      doc.body.contentEditable = 'true';
      doc.body.style.padding = '8px';

      // set initial content
      doc.body.innerHTML = initialContent;

      // enable resizing for objects where possible
      try {
        // @ts-ignore
        doc.execCommand && doc.execCommand('enableObjectResizing', false, 'true');
      } catch (e) {
        // ignore
      }

      // Handlers
      const handleInput = () => scheduleChange();

      const handleBlur = () => scheduleChange(true);

      const handleContext = (e: MouseEvent) => {
        e.preventDefault();
        const sel = getSelectionText();
        onContextMenu && onContextMenu({ x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY, text: sel });
      };

      const handlePaste = async (e: ClipboardEvent) => {
        if (!e.clipboardData) return;
        const items = Array.from(e.clipboardData.items || []);
        const imageItem = items.find((it) => it.type.indexOf('image') !== -1);
        if (!imageItem) return; // let normal paste
        e.preventDefault();
        const blob = imageItem.getAsFile();
        if (!blob || !appScriptUrl) return;

        const fd = new FormData();
        fd.append('file', blob, 'pasted-image.png');

        try {
          const res = await fetch(appScriptUrl, { method: 'POST', body: fd });
          const data = await res.json();
          const id_image = data.id_image || data.url || data.src;
          if (id_image) {
            insertHTMLAtCursor(`<img src="${id_image}" alt="pasted-image" />`);
            scheduleChange(true);
          }
        } catch (err) {
          // swallow
          console.error(err);
        }
      };

      // Image resize (simple drag-to-resize)
      let resizing = false;
      let targetImg: HTMLImageElement | null = null;
      let startX = 0;
      let startY = 0;
      let startW = 0;
      let startH = 0;

      const onMouseDown = (ev: MouseEvent) => {
        const t = ev.target as HTMLElement;
        if (t && t.tagName === 'IMG') {
          // start resize if near corner (last 12px)
          const img = t as HTMLImageElement;
          const rect = img.getBoundingClientRect();
          const relX = ev.clientX - rect.left;
          const relY = ev.clientY - rect.top;
          if (relX > rect.width - 12 && relY > rect.height - 12) {
            resizing = true;
            targetImg = img;
            startX = ev.clientX;
            startY = ev.clientY;
            startW = img.width;
            startH = img.height;
            ev.preventDefault();
          }
        }
      };

      const onMouseMove = (ev: MouseEvent) => {
        if (!resizing || !targetImg) return;
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        const newW = Math.max(16, startW + dx);
        const newH = Math.max(16, startH + dy);
        targetImg.width = newW;
        targetImg.height = newH;
      };

      const onMouseUp = () => {
        if (resizing) {
          resizing = false;
          targetImg = null;
          scheduleChange(true);
        }
      };

      doc.addEventListener('input', handleInput);
      doc.addEventListener('blur', handleBlur);
      doc.addEventListener('contextmenu', handleContext);
      doc.addEventListener('paste', handlePaste as any);
      doc.addEventListener('mousedown', onMouseDown);
      doc.addEventListener('mousemove', onMouseMove);
      doc.addEventListener('mouseup', onMouseUp);

      // cleanup on unload
      // @ts-ignore
      iframe.__cleanup = () => {
        try {
          doc.removeEventListener('input', handleInput);
          doc.removeEventListener('blur', handleBlur);
          doc.removeEventListener('contextmenu', handleContext);
          doc.removeEventListener('paste', handlePaste as any);
          doc.removeEventListener('mousedown', onMouseDown);
          doc.removeEventListener('mousemove', onMouseMove);
          doc.removeEventListener('mouseup', onMouseUp);
        } catch (e) {}
      };
    };

    iframe.addEventListener('load', onLoad);
    // if already loaded
    if ((iframe.contentDocument && iframe.contentDocument.readyState === 'complete') || (iframe.contentWindow && iframe.contentWindow.document.readyState === 'complete')) {
      setTimeout(onLoad, 10);
    }

    return () => {
      iframe.removeEventListener('load', onLoad);
      // call cleanup if present
      try {
        // @ts-ignore
        iframe.__cleanup && iframe.__cleanup();
      } catch (e) {}
    };
  }, [iframeRef]);

  const scheduleChange = (flush = false) => {
    if (changeTimer.current) {
      window.clearTimeout(changeTimer.current);
      changeTimer.current = null;
    }
    if (flush) {
      flushChange();
    } else {
      changeTimer.current = window.setTimeout(() => flushChange(), debounceMs);
    }
  };

  const flushChange = () => {
    const html = getContent();
    onChange && onChange(html);
  };

  const getContent = () => {
    const iframe = iframeRef.current;
    if (!iframe) return '';
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return '';
    return doc.body.innerHTML;
  };

  const setContent = (html: string) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.body.innerHTML = html;
  };

  const insertHTMLAtCursor = (html: string) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const win = iframe.contentWindow as Window | null;
    const doc = iframe.contentDocument as Document | null;
    if (!win || !doc) return;
    win.focus();
    try {
      doc.execCommand('insertHTML', false, html);
    } catch (e) {
      // fallback: append
      const range = win.getSelection && win.getSelection()?.getRangeAt(0);
      if (range) {
        const el = doc.createElement('div');
        el.innerHTML = html;
        const frag = doc.createDocumentFragment();
        let node;
        // move nodes
        while ((node = el.firstChild)) {
          frag.appendChild(node);
        }
        range.deleteContents();
        range.insertNode(frag);
      }
    }
  };

  const getSelectionText = () => {
    const iframe = iframeRef.current;
    if (!iframe) return '';
    const win = iframe.contentWindow as Window | null;
    if (!win) return '';
    const sel = win.getSelection();
    return sel ? sel.toString() : '';
  };

  const wrapSelectionWithSpan = (attrs: Record<string, string>) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    const win = iframe.contentWindow as Window | null;
    if (!doc || !win) return;
    const sel = win.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0).cloneRange();
    const span = doc.createElement('span');
    Object.keys(attrs).forEach((k) => span.setAttribute(k, attrs[k]));
    try {
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);
      scheduleChange(true);
    } catch (e) {
      console.error('wrapSelectionWithSpan failed', e);
    }
  };

  const convertFractionSelection = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const win = iframe.contentWindow as Window | null;
    const doc = iframe.contentDocument || (win && win.document);
    if (!win || !doc) return;
    const sel = win.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const text = sel.toString().trim();
    const parts = text.split('/');
    if (parts.length !== 2) return;
    const num = parts[0].trim();
    const den = parts[1].trim();
    const url = `https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${encodeURIComponent(num)}%7D%20%7B${encodeURIComponent(den)}%7D%7D`;
    // replace selection with image
    range.deleteContents();
    const img = doc.createElement('img');
    img.src = url;
    img.alt = 'equation';
    range.insertNode(img);
    sel.removeAllRanges();
    scheduleChange(true);
  };

  return {
    getContent,
    setContent,
    insertHTMLAtCursor,
    getSelectionText,
    wrapSelectionWithSpan,
    convertFractionSelection,
    scheduleChange,
  };
}

export default useIframeEditor;
