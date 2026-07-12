import {Editor, useEditorState} from '@tiptap/react'
import { resolveImageSource } from './parsing-image-source';
import barloading from '../../../images/barloading.gif'
import UploadGambarSoalService from '~/infrastructures/services/upload-gambar-soal-service-implements';
/** 
 * function untuk mengecek apakah urlGambar: itu berbentuk `base64`, `urlHttps`, atau `file` 
 * Jika parameter berupa url base64, maka yang di return: `data:image/jpeg`
 * */
export function extractDataUrlFromHtmlOrText(htmlOrText: string | null) {
    if (!htmlOrText) return null;
    const m = htmlOrText.match(/src\s*=\s*"(data:image\/[^"]+)"/i) || htmlOrText.match(/(data:image\/[a-zA-Z0-9+\-/=]+);base64,[a-zA-Z0-9+/=]+/i);
    return m ? m[1] : null;
}


export default async function InsertImage(urlGambar:string|File,editor:Editor){
    
    
    const verifyUrl =  await  resolveImageSource(urlGambar);
    console.log('verifyUrl', verifyUrl)
    if(verifyUrl.isImage && verifyUrl.type === 'image-url'){
        const url = verifyUrl.value as string;
        if(url){
            editor.chain().focus().setImage({ src: url }).run()
        }
        return;
    }
    if(verifyUrl.isImage && verifyUrl.type === 'base64'){
        const found = verifyUrl.value as string;
        const blob = dataURLtoBlob(found);
        const file = new File([blob], `pasted.${extensionFromMime(blob.type)}`, { type: blob.type });
        void handleFile(file, editor);
        return;
    }
    if(verifyUrl.type === 'file'){
        console.log('isFile', verifyUrl.value);
        void handleFile(verifyUrl.value as File, editor);
    }
        
    // const dataUrl = extractDataUrlFromHtmlOrText(urlGambar);
    console.log(urlGambar);
    console.log('verifyUrl cek', verifyUrl)
}

async function handleFile(file: File, Editorview:Editor){
    try {
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(file);
    });

    // insert placeholderd (base64) immediately with uploading flag and initial progress
    const view =Editorview.view;
    const { state, dispatch } = view;
    const { schema } = state;
    const imageNode = schema.nodes.image.create({ src: dataUrl, uploading: true, uploadProgress: 0 });

    dispatch(state.tr.replaceSelectionWith(imageNode).scrollIntoView());

    // upload and then replace placeholder src with returned src
    let returnedSrc = "";
    try {
      returnedSrc = await UploadImageService(file, (p: number) => {
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
async function UploadImageService(file: File, onProgress?: (p: number) => void){
    try {
        const svc = new UploadGambarSoalService();
        const url = await svc.uploadFile(file, onProgress);
        console.log(url);
        return url;
    } catch (err) {
        console.error("upload error", err);
        return "";
    }
}