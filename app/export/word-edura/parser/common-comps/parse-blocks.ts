import { AlignmentType } from "docx";
import * as htmlToImage from "html-to-image";
import { pxToTwip } from "~/export/docx/converter/px-to-twip";
import { resolveRgbaOrOklchToHex } from "~/lib/color-hack";
import { base64ToUint8Array } from "~/export/docx/parser/img-parser";
import loadImageAsPng from "~/export/docx/parser/image-blob";
import parseKop from "../comp-word/parse-kop";
import parseTtd from "../comp-word/parse-ttd";
import parseCommonTable from "../comp-word/parse-table-full";
import parseList from "../comp-word/parse-list";
import type {
  headingComp,
  ImageNodeEdura,
  InlineRunEdura,
  paragraphEdura,
} from "./type-comp";
import type { ListBlockEdura } from "./type-table";

/**
 * Konteks parsing blok.
 * `baseLeft` = tepi kiri area konten (root atau sel tabel) dalam piksel layar.
 * `counter`  = penghitung reference list, harus dipakai bersama root + semua sel.
 */
export type ParseBlocksContext = {
  baseLeft: number;
  counter: { n: number };
  insertTtdSpacing?: boolean;
};

export function createParseContext(element: HTMLElement): ParseBlocksContext {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const paddingLeft = parseFloat(style.paddingLeft) || 0;

  return {
    baseLeft: rect.left + paddingLeft,
    counter: { n: 0 },
    insertTtdSpacing: true,
  };
}

export function withBaseLeft(
  ctx: ParseBlocksContext,
  element: HTMLElement
): ParseBlocksContext {
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const paddingLeft = parseFloat(style.paddingLeft) || 0;

  return { ...ctx, baseLeft: rect.left + paddingLeft };
}

/**
 * Telusuri elemen dan hasilkan daftar blok (paragraf, heading, tabel, gambar, list).
 * Dipakai oleh parsing area cetak (root) dan parsing sel tabel supaya
 * aturan list/indent/spacing konsisten.
 */
export default async function parseBlocks(
  root: HTMLElement,
  ctx: ParseBlocksContext
): Promise<ListBlockEdura[]> {
  const blocks: ListBlockEdura[] = [];

  let runs: InlineRunEdura[] = [];
  let runStyleSource: HTMLElement | null = null;
  let paragraphSource: HTMLElement | null = null;

  function addRun(element: HTMLElement, text: string) {
    if (!text) return;

    if (!runStyleSource) runStyleSource = element;

    const style = window.getComputedStyle(element);
    const fontSize = parseFloat(style.fontSize);

    runs.push({
      text,
      isBold: isBoldStyle(style),
      isItalic: style.fontStyle === "italic",
      isUnderline: style.textDecorationLine?.includes("underline") ?? false,
      isUppercase: style.textTransform === "uppercase",
      fontSize: Number.isFinite(fontSize) ? fontSize + 3.5 : undefined,
      fontFamily: style.fontFamily,
      color: toDocxHex(style.color),
    });
  }

  function flush() {
    if (!runs.length) return;

    const normalizedRuns = runs
      .map((run) => ({
        ...run,
        text: run.break ? run.text : run.text.replace(/\s+/g, " "),
      }))
      .filter((run) => run.break || run.text !== "");

    runs = [];

    // buang spasi sisa indentasi JSX di awal/akhir paragraf
    while (
      normalizedRuns.length &&
      !normalizedRuns[0].break &&
      normalizedRuns[0].text.trim() === ""
    ) {
      normalizedRuns.shift();
    }
    while (
      normalizedRuns.length &&
      !normalizedRuns[normalizedRuns.length - 1].break &&
      normalizedRuns[normalizedRuns.length - 1].text.trim() === ""
    ) {
      normalizedRuns.pop();
    }

    if (!normalizedRuns.length) {
      runStyleSource = null;
      return;
    }

    const source = paragraphSource ?? runStyleSource ?? root;
    const style = window.getComputedStyle(source);

    const text = normalizedRuns
      .map((run) => run.text)
      .join("")
      .replace(/\s+/g, " ")
      .trim();

    const visibleRuns = normalizedRuns.filter((run) => !run.break);
    const allBold = visibleRuns.every((run) => run.isBold);
    const allItalic = visibleRuns.every((run) => run.isItalic);
    const allUnderline = visibleRuns.every((run) => run.isUnderline);

    const marginTop = parseFloat(style.marginTop) || 0;
    const marginBottom = parseFloat(style.marginBottom) || 0;

    blocks.push({
      type: "paragraph",
      text,
      runs: normalizedRuns,
      fontSize: (parseFloat(style.fontSize) || 12) + 3.5,
      align: style.textAlign,
      marginTop,
      marginBottom,
      fontFamily: style.fontFamily,
      isUppercase: style.textTransform === "uppercase",
      isBold: allBold,
      isItalic: allItalic,
      isUnderline: allUnderline,
      spacing: {
        before: pxToTwip(marginTop),
        after: pxToTwip(marginBottom),
        line: lineSpacing(style),
      },
    });

    runStyleSource = null;
  }

  async function walk(node: Node): Promise<void> {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      const text = node.textContent ?? "";

      if (parent && !isSkipped(parent) && text.trim()) {
        addRun(parent, text);
      }
      return;
    }

    if (node instanceof HTMLBRElement) {
      runs.push({ text: "", break: 1 });
      return;
    }

    if (!(node instanceof HTMLElement)) return;
    if (isSkipped(node)) return;

    const tag = node.tagName;

    // blok khusus yang di-screenshot utuh
    if (node.dataset.word === "img") {
      flush();
      const image = await captureScreenshot(node);
      if (image) blocks.push(image);
      return;
    }

    if (node instanceof HTMLImageElement) {
      flush();
      const image = await loadImageAsPng(node);
      if (image) blocks.push(image);
      return;
    }

    if (tag === "TABLE") {
      flush();
      await pushTable(blocks, node as HTMLTableElement, ctx);
      return;
    }

    if (tag === "OL" || tag === "UL") {
      flush();
      blocks.push(
        await parseList(
          node as HTMLOListElement | HTMLUListElement,
          ctx
        )
      );
      return;
    }

    if (/^H[1-6]$/.test(tag)) {
      flush();
      blocks.push(buildHeading(node));
      return;
    }

    if (tag === "P") {
      flush();
      const previousSource = paragraphSource;
      paragraphSource = node;

      for (const child of Array.from(node.childNodes)) {
        await walk(child);
      }

      flush();
      paragraphSource = previousSource;
      return;
    }

    if (isBlockElement(node)) {
      flush();
      const previousSource = paragraphSource;
      paragraphSource = null;

      for (const child of Array.from(node.childNodes)) {
        await walk(child);
      }

      flush();
      paragraphSource = previousSource;
      return;
    }

    // elemen inline (strong, em, span, a, ...) -> lanjutkan buffer run
    for (const child of Array.from(node.childNodes)) {
      await walk(child);
    }
  }

  await walk(root);
  flush();

  return blocks;
}

async function pushTable(
  blocks: ListBlockEdura[],
  table: HTMLTableElement,
  ctx: ParseBlocksContext
) {
  const word = table.dataset.word;

  if (word === "ignore-parse") return;

  if (word === "kop") {
    blocks.push(await parseKop(table));
    return;
  }

  if (word === "ttd") {
    if (ctx.insertTtdSpacing) {
      blocks.push(emptyParagraph(), emptyParagraph());
    }
    blocks.push(await parseTtd(table));
    return;
  }

  blocks.push(await parseCommonTable(table, ctx));
}

function buildHeading(node: HTMLElement): headingComp {
  const style = window.getComputedStyle(node);
  const fontSize = parseFloat(style.fontSize);

  return {
    type: "heading",
    level: Number(node.tagName[1]),
    text: node.textContent ?? "",
    fontSize: Number.isFinite(fontSize) ? fontSize : 12,
    lineHeight: parseFloat(style.lineHeight) || 0,
    align: mapAlignment(style.textAlign),
    marginTop: parseFloat(style.marginTop) || 0,
    marginBottom: parseFloat(style.marginBottom) || 0,
    fontFamily: style.fontFamily,
    isUppercase: style.textTransform === "uppercase",
    isItalic: style.fontStyle === "italic",
    isBold: isBoldStyle(style),
  };
}

async function captureScreenshot(node: HTMLElement): Promise<ImageNodeEdura | null> {
  try {
    const dataUrl = await htmlToImage.toPng(node, {
      cacheBust: true,
      skipFonts: true,
      width: node.offsetWidth + 20,
      height: node.offsetHeight + 20,
      backgroundColor: "#ffffff",
    });

    const base64 = dataUrl.split(",")[1];
    if (!base64) return null;

    return {
      type: "image",
      data: base64ToUint8Array(base64),
      mimeType: "image/png",
      width: node.offsetWidth,
      height: node.offsetHeight,
      alignment: AlignmentType.CENTER,
    };
  } catch {
    return null;
  }
}

function emptyParagraph(): paragraphEdura {
  return {
    type: "paragraph",
    text: "",
    fontSize: 12,
    align: AlignmentType.LEFT,
    marginTop: 0,
    marginBottom: 0,
    fontFamily: "Arial",
    isUppercase: false,
    isBold: false,
    isItalic: false,
    spacing: { before: 0, after: 0 },
  };
}

/** docx hanya menerima warna hex 6 digit beserta tanda `#`. */
function toDocxHex(color: string): string | undefined {
  const value = color?.trim();
  if (!value) return undefined;

  if (/^#[0-9a-f]{6}$/i.test(value)) return value;

  const hex = resolveRgbaOrOklchToHex(value)?.hex;
  return hex ? `#${hex.replace(/^#/, "").toUpperCase()}` : undefined;
}

function isBoldStyle(style: CSSStyleDeclaration) {
  return (
    style.fontSynthesis === "weight" ||
    style.fontWeight === "bold" ||
    parseInt(style.fontWeight, 10) >= 700
  );
}

function mapAlignment(textAlign: string) {
  switch (textAlign) {
    case "center":
      return AlignmentType.CENTER;
    case "right":
    case "end":
      return AlignmentType.RIGHT;
    case "justify":
      return AlignmentType.JUSTIFIED;
    case "start":
    case "left":
    default:
      return AlignmentType.LEFT;
  }
}

function lineSpacing(style: CSSStyleDeclaration): number | undefined {
  const lineHeight = parseFloat(style.lineHeight);
  const fontSize = parseFloat(style.fontSize);

  if (
    !Number.isFinite(lineHeight) ||
    !Number.isFinite(fontSize) ||
    fontSize <= 0
  ) {
    return undefined;
  }

  const ratio = lineHeight / fontSize;
  if (ratio < 0.8 || ratio > 3) return undefined;

  return Math.round(ratio * 240);
}

function isBlockElement(node: HTMLElement) {
  const display = window.getComputedStyle(node).display;
  return (
    display !== "inline" &&
    display !== "inline-block" &&
    display !== "inline-flex" &&
    display !== "inline-grid" &&
    display !== "contents"
  );
}

function isSkipped(node: HTMLElement) {
  return (
    node.classList.contains("print:hidden") ||
    node.dataset.word === "ignore-parse"
  );
}
