// import { convertImageToBase64, convertToPngBase64 } from "~/export/docx/parser/img-parser";

export interface ImageNodeExcel {
  type: "image-excel";
  data: string,//Uint8Array;
  mimeType: "image/png" | "image/jpeg";
  width: number;
  height: number;
  alignment: string;//"left" | "center" | "right";
  }
  export async function parseImageExcel(
    img: HTMLImageElement
  ): Promise<ImageNodeExcel | null> {
    if (!img) return null;

    const style = window.getComputedStyle(img);

    if (
      img.classList.contains("print:hidden") ||
      style.display === "none" ||
      style.visibility === "hidden"
    ) {
      return null;
    }

    const alignment = style.textAlign;// resolveAlignment(style);
    
    const width = parseFloat(style.width) || img.naturalWidth || img.offsetWidth || 100;
    const height =  parseFloat(style.height) || img.naturalHeight || img.offsetHeight || 100;

    let base64Data: string;
  const mimeType = img.src.includes("jpeg") || img.src.includes("jpg")
  ? "image/jpeg"
  : "image/png";
  
  if (img.src.startsWith("data:image/webp")) {
    base64Data = await convertToPngBase64(img);
  } else if (img.src.startsWith("data:")) {
    base64Data = img.src;//.split(",")[1];
  } else {
    const fetched = await convertImageToBase64(img.src);

    // Kalau hasilnya webp juga
    if (fetched.startsWith("UklGR")) { // WEBP signature
      base64Data = await convertToPngBase64(img);
    } else {
      base64Data = fetched;
    }
  }

// console.log("Final base64 length:", base64Data.length);
  return {
    type: "image-excel",
    data: base64Data,
    mimeType,
    width,
    height,
    alignment,
  };
}

async function convertImageToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      // console.log(result);
      resolve(result); // remove prefix
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function convertToPngBase64(img: HTMLImageElement): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl;//.split(",")[1]; // dont remove prefix
}