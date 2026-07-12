import React, { useRef, useState, useEffect } from 'react';
import useIframeEditor from './hooks/useIframeEditor';
import Toolbar from './Toolbar';
import ContextMenu from './ContextMenu';

export interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (html: string) => void;
  appScriptUrl?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue = '', onChange, appScriptUrl }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [mode, setMode] = useState<'wysiwyg' | 'raw'>('wysiwyg');
  const [rawValue, setRawValue] = useState(initialValue);
  const [contextVisible, setContextVisible] = useState(false);
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 });
  const [selectionText, setSelectionText] = useState('');

  const editor = useIframeEditor({ iframeRef, initialContent: initialValue, onChange: (html) => {
    setRawValue(html);
    onChange && onChange(html);
  }, appScriptUrl, onContextMenu: ({ x, y, text }) => {
    setSelectionText(text);
    // transform coords relative to container; here we use client coords
    setContextPos({ x, y });
    setContextVisible(true);
  } });

  useEffect(() => {
    setRawValue(initialValue);
    editor.setContent(initialValue);
  }, [initialValue]);

  const toggleMode = () => {
    if (mode === 'wysiwyg') {
      // switch to raw
      const html = editor.getContent();
      setRawValue(html);
      setMode('raw');
    } else {
      // switch to wysiwyg
      editor.setContent(rawValue);
      setMode('wysiwyg');
    }
  };

  const handleRawChange = (v: string) => {
    setRawValue(v);
  };

  const handleRawBlur = () => {
    editor.setContent(rawValue);
    editor.scheduleChange(true);
    onChange && onChange(rawValue);
  };

  const handleConvertFraction = () => {
    editor.convertFractionSelection();
    setContextVisible(false);
  };

  const handleTagData = (value: string) => {
    if (!value) return;
    editor.wrapSelectionWithSpan({ 'data-type': 'custom-item', 'data-value': value });
    setContextVisible(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar mode={mode} onToggleMode={toggleMode} />
      {mode === 'wysiwyg' ? (
        <div style={{ border: '1px solid #ccc', borderRadius: 4, minHeight: 200 }}>
          <iframe ref={iframeRef} style={{ width: '100%', height: 300, border: 0 }} title="rich-editor" />
        </div>
      ) : (
        <textarea className="form-control" value={rawValue} onChange={(e) => handleRawChange(e.target.value)} onBlur={handleRawBlur} style={{ minHeight: 300 }} />
      )}

      <ContextMenu
        x={contextPos.x}
        y={contextPos.y}
        visible={contextVisible}
        onClose={() => setContextVisible(false)}
        onConvertFraction={handleConvertFraction}
        onTagData={handleTagData}
        selectionText={selectionText}
      />
    </div>
  );
};

export default RichTextEditor;
