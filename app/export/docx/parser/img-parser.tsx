
import type { ImageNodeEdura } from "~/export/word-edura/parser/common-comps/type-comp";

export interface ImageNode {
  type: "image";
  data: Uint8Array;
  mimeType: "image/png" | "image/jpeg";
  width: number;
  height: number;
  alignment: "left" | "center" | "right";
  }
  export async function parseImage(
    img: HTMLImageElement
  ): Promise<ImageNode|ImageNodeEdura | null> {
    if (!img) return null;

    const style = window.getComputedStyle(img);

    if (
      img.classList.contains("print:hidden") ||
      style.display === "none" ||
      style.visibility === "hidden"
    ) {
      return null;
    }

    const alignment = resolveAlignment(style);
    
    const width = parseFloat(style.width) || img.naturalWidth || img.offsetWidth || 100;
    const height =  parseFloat(style.height) || img.naturalHeight || img.offsetHeight || 100;
    
  let base64Data: string;
  const mimeType = img.src.includes("jpeg") || img.src.includes("jpg")
  ? "image/jpeg"
  : "image/png";
  
  if (img.src.startsWith("data:image/webp")) {
    base64Data = await convertToPngBase64(img);
  } else if (img.src.startsWith("data:")) {
    base64Data = img.src.split(",")[1];
  } else {
    const fetched = await convertImageToBase64(img.src);

    // Kalau hasilnya webp juga
    if (fetched.startsWith("UklGR")) { // WEBP signature
      base64Data = await convertToPngBase64(img);
    } else {
      base64Data = fetched;
    }
  }
  
  return {
    type: "image",
    data: base64ToUint8Array(base64Data),
    mimeType,
    width,
    height,
    alignment,
  };
}

function resolveAlignment(
  style: CSSStyleDeclaration
): "left" | "center" | "right" {
  if (style.display === "block" && style.marginLeft === "auto" && style.marginRight === "auto") {
    return "center";
  }

  if (style.float === "right") return "right";
  if (style.float === "left") return "left";

  return "left";
}

export async function convertImageToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result?.split(",")[1]); // remove prefix
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export async function convertToPngBase64(img: HTMLImageElement): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl.split(",")[1]; // remove prefix
}

async function convertUrlToPngBase64(url: string): Promise<string> {
  const response = await fetch(url, { mode: "cors" });

  if (!response.ok) {
    throw new Error("Failed to fetch image: " + response.status);
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // remove prefix
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function convertUrlToPngUint8Array(url: string): Promise<Uint8Array> {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = url;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  ctx.drawImage(img, 0, 0);

  const dataUrl = canvas.toDataURL("image/png"); // FORCE PNG

  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}
