import { toBlob as domToBlob } from "html-to-image";
import type { ImageNodeEdura } from "~/export/word-edura/parser/common-comps/type-comp";

/**
 * Ambil gambar dari DOM sebagai byte PNG yang valid untuk docx.
 *
 * Urutan strategi:
 * 1. data URL  -> canvas -> PNG
 * 2. fetch CORS -> blob -> canvas -> PNG (ini yang menyelesaikan gambar Google Drive)
 * 3. html-to-image (fetch internal + cache bust)
 * 4. canvas langsung dari <img> yang sudah termuat
 *
 * Semua hasil dikonversi ke PNG agar Word tidak menampilkan
 * "this picture can't be displayed" (webp/jpeg rusak, mime tidak cocok).
 */

const MIN_IMAGE_BYTES = 100;
const MAX_CANVAS_SIDE = 4000;
const MAX_FETCH_ATTEMPTS = 3;

/** Cache hasil per URL supaya export berulang tidak memicu rate limit (429). */
const pngCache = new Map<string, Promise<Uint8Array | null>>();

export default async function loadImageAsPng(
  img: HTMLImageElement
): Promise<ImageNodeEdura | null> {
  if (!img) return null;

  const style = window.getComputedStyle(img);

  if (
    img.classList.contains("print:hidden") ||
    style.display === "none" ||
    style.visibility === "hidden"
  ) {
    return null;
  }

  const { width, height } = measureImage(img, style);
  const data = await resolvePngBytes(img);

  if (!data || data.length < MIN_IMAGE_BYTES) return null;

  return {
    type: "image",
    data,
    mimeType: "image/png",
    width,
    height,
    alignment: resolveAlignment(style),
  };
}

function measureImage(img: HTMLImageElement, style: CSSStyleDeclaration) {
  const rect = img.getBoundingClientRect();
  const cssWidth = parseFloat(style.width);
  const cssHeight = parseFloat(style.height);

  const width =
    rect.width > 0
      ? rect.width
      : Number.isFinite(cssWidth) && cssWidth > 0
        ? cssWidth
        : img.naturalWidth || img.width || 100;

  let height =
    rect.height > 0
      ? rect.height
      : Number.isFinite(cssHeight) && cssHeight > 0
        ? cssHeight
        : img.naturalHeight || img.height || 0;

  if (!height) {
    const ratio = img.naturalWidth > 0 ? img.naturalHeight / img.naturalWidth : 1;
    height = width * ratio;
  }

  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

async function resolvePngBytes(img: HTMLImageElement): Promise<Uint8Array | null> {
  const src = img.currentSrc || img.src;
  if (!src) return null;

  if (src.startsWith("data:")) {
    return dataUrlToPngBytes(src);
  }

  const cached = pngCache.get(src);
  if (cached) {
    const hit = await cached;
    if (hit) return hit;
  }

  const task = resolveRemoteBytes(img, src);
  pngCache.set(src, task);

  const bytes = await task;
  // jangan cache kegagalan supaya percobaan berikutnya masih bisa berhasil
  if (!bytes) pngCache.delete(src);

  return bytes;
}

async function resolveRemoteBytes(
  img: HTMLImageElement,
  src: string
): Promise<Uint8Array | null> {
  // Jalur utama: blob via fetch. Butuh header CORS dari server gambar.
  const fromFetch = await fetchAsPng(src);
  if (fromFetch) return fromFetch;

  // Fallback: muat ulang sebagai gambar CORS agar canvas tidak tainted.
  try {
    const corsImage = await loadHtmlImage(src, "anonymous");
    const bytes = await drawToPng(
      corsImage,
      corsImage.naturalWidth,
      corsImage.naturalHeight
    );
    if (bytes) return bytes;
  } catch {
    // server tidak mengirim CORS -> lanjut fallback
  }

  // Fallback: html-to-image melakukan fetch sendiri.
  // `skipFonts` mencegah SecurityError saat membaca cssRules Google Fonts.
  try {
    const blob = await domToBlob(img, {
      cacheBust: true,
      skipFonts: true,
      backgroundColor: "#ffffff",
    });
    if (blob && blob.size > 0) {
      const bytes = await blobToPngBytes(blob);
      if (bytes) return bytes;
    }
  } catch {
    // lanjut fallback terakhir
  }

  // Fallback terakhir: gambar sudah dirender browser, ambil via canvas.
  try {
    if (img.complete && img.naturalWidth > 0) {
      return await drawToPng(img, img.naturalWidth, img.naturalHeight);
    }
  } catch {
    // canvas tainted (CORS) -> gagal total
  }

  return null;
}

/**
 * fetch gambar dengan retry untuk 429/503 (rate limit Google Drive).
 * `force-cache` memanfaatkan cache HTTP gambar yang sudah tampil di halaman.
 */
async function fetchAsPng(src: string): Promise<Uint8Array | null> {
  if (!/^https?:/i.test(src)) return null;

  for (let attempt = 0; attempt < MAX_FETCH_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(src, {
        mode: "cors",
        cache: "force-cache",
        referrerPolicy: "no-referrer",
      });

      if (response.ok) {
        const blob = await response.blob();
        if (blob.size > 0) {
          const bytes = await blobToPngBytes(blob);
          if (bytes) return bytes;
        }
        return null;
      }

      if (response.status !== 429 && response.status !== 503) return null;

      await delay(retryDelay(response, attempt));
    } catch {
      // CORS / offline -> biarkan fallback berikutnya menangani
      return null;
    }
  }

  return null;
}

function retryDelay(response: Response, attempt: number) {
  const retryAfter = Number(response.headers.get("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Math.min(retryAfter * 1000, 4000);
  }

  return (attempt + 1) * 600;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dataUrlToPngBytes(dataUrl: string): Promise<Uint8Array | null> {
  try {
    const image = await loadHtmlImage(dataUrl);
    return await drawToPng(image, image.naturalWidth, image.naturalHeight);
  } catch {
    return null;
  }
}

async function blobToPngBytes(blob: Blob): Promise<Uint8Array | null> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(blob);
      const bytes = await drawToPng(bitmap, bitmap.width, bitmap.height);
      bitmap.close?.();
      return bytes;
    } catch {
      // fallback ke object URL
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const image = await loadHtmlImage(url);
    return await drawToPng(image, image.naturalWidth, image.naturalHeight);
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadHtmlImage(
  src: string,
  crossOrigin?: "anonymous"
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (crossOrigin) image.crossOrigin = crossOrigin;
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Gagal memuat gambar"));
    image.src = src;
  });
}

async function drawToPng(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number
): Promise<Uint8Array | null> {
  if (!sourceWidth || !sourceHeight) return null;

  const scale = Math.min(1, MAX_CANVAS_SIDE / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(source, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((result) => resolve(result), "image/png");
  });

  if (!blob || blob.size < MIN_IMAGE_BYTES) return null;

  return new Uint8Array(await blob.arrayBuffer());
}

function resolveAlignment(
  style: CSSStyleDeclaration
): "left" | "center" | "right" {
  if (
    style.display === "block" &&
    style.marginLeft === "auto" &&
    style.marginRight === "auto"
  ) {
    return "center";
  }

  if (style.float === "right") return "right";
  if (style.float === "left") return "left";

  return "left";
}
