import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

type PasteImageOptions = {
  upload: (file: File, onProgress?: (percent: number) => void) => Promise<string>;
  maxFileSize?: number; // bytes
};

function dataURLtoBlob(dataurl: string) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function extractDataUrlFromHtmlOrText(htmlOrText: string | null) {
  if (!htmlOrText) return null;
  const m = htmlOrText.match(/src\s*=\s*"(data:image\/[^"]+)"/i) || htmlOrText.match(/(data:image\/[a-zA-Z0-9+\-/=]+);base64,[a-zA-Z0-9+/=]+/i);
  return m ? m[1] : null;
}

function extensionFromMime(mime: string) {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
  };
  return map[mime] || mime.split("/").pop() || "bin";
}

export const PasteImage = Extension.create<PasteImageOptions>({
  name: "pasteImage",

  addOptions() {
    return {
      upload: async (_file: File) => {
        throw new Error("PasteImage: no upload handler provided");
      },
      maxFileSize: 10 * 1024 * 1024,
    } as PasteImageOptions;
  },

  addProseMirrorPlugins() {
    const extension = this;

    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            const clipboard = event.clipboardData;
            if (!clipboard) return false;

            const items = Array.from(clipboard.items || []);
            const imageItems = items.filter((i) => i.type && i.type.startsWith("image"));

            // helper to handle a File as pasted image
            const handleFile = async (file: File) => {
              try {
                const reader = new FileReader();
                const dataUrl = await new Promise<string>((resolve, reject) => {
                  reader.onerror = () => reject(new Error("Failed to read file"));
                  reader.onload = () => resolve(String(reader.result));
                  reader.readAsDataURL(file);
                });

                // insert placeholderd (base64) immediately with uploading flag and initial progress
                const { state, dispatch } = view;
                const { schema } = state;
                const imageNode = schema.nodes.image.create({ src: dataUrl, uploading: true, uploadProgress: 0 });

                dispatch(state.tr.replaceSelectionWith(imageNode).scrollIntoView());

                // upload and then replace placeholder src with returned src
                let returnedSrc = "";
                try {
                  returnedSrc = await extension.options.upload(file, (p: number) => {
                    // update node progress where src === dataUrl
                    const trProgress = view.state.tr;
                    view.state.doc.descendants((node, pos) => {
                      if (node.type.name === "image" && node.attrs && node.attrs.src === dataUrl) {
                        trProgress.setNodeMarkup(pos, undefined, { ...node.attrs, uploading: true, uploadProgress: Math.round(p) });
                      }
                      return true;
                    });
                    if (trProgress.docChanged) dispatch(trProgress);
                  });
                } catch (err) {
                  // propagate error to outer catch
                  throw err;
                }

                // iterate and replace matching image node with returned src (or remove on empty)
                const tr = view.state.tr;
                let replaced = false;
                view.state.doc.descendants((node, pos) => {
                  if (node.type.name === "image" && node.attrs && node.attrs.src === dataUrl) {
                    if (returnedSrc) {
                      tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: returnedSrc, uploading: false, uploadProgress: 100 });
                    } else {
                      // remove node on failure
                      tr.delete(pos, pos + node.nodeSize);
                    }
                    replaced = true;
                  }
                  return true;
                });

                if (tr.docChanged) dispatch(tr.scrollIntoView());
              } catch (err) {
                // silent fail; keep original paste behaviour as fallback
                console.error("paste-image upload error", err);
              }
            };

            if (imageItems.length > 0) {
              event.preventDefault();
              imageItems.forEach((item) => {
                const file = item.getAsFile();
                if (!file) return;
                if (extension.options.maxFileSize && file.size > extension.options.maxFileSize) return;
                void handleFile(file);
              });
              return true;
            }

            // fallback: detect data URL in html/plain text clipboard
            const html = clipboard.getData("text/html");
            const text = clipboard.getData("text/plain");
            const found = extractDataUrlFromHtmlOrText(html) || extractDataUrlFromHtmlOrText(text);
            if (found) {
              event.preventDefault();
              const blob = dataURLtoBlob(found);
              const file = new File([blob], `pasted.${extensionFromMime(blob.type)}`, { type: blob.type });
              void handleFile(file);
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});

export default PasteImage;
