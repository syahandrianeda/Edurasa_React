import { pxToTwip } from "~/export/docx/converter/px-to-twip";
import type { ListFormat, listItemEdura, listNodeEdura } from "../common-comps/type-table";
import parseBlocks, { type ParseBlocksContext } from "../common-comps/parse-blocks";

/**
 * Parse satu elemen <ol>/<ul> menjadi node list.
 * Setiap instance list mendapat `reference` unik supaya penomoran Word
 * dimulai ulang di list berikutnya (bukan melanjutkan list sebelumnya).
 */
export default async function parseList(
  list: HTMLOListElement | HTMLUListElement,
  ctx: ParseBlocksContext
): Promise<listNodeEdura> {
  const style = window.getComputedStyle(list);
  const items = Array.from(list.children).filter(
    (child): child is HTMLLIElement =>
      child instanceof HTMLLIElement &&
      !child.classList.contains("print:hidden")
  );

  const info = {
    format: resolveFormat(list, style),
    start: resolveStart(list),
    reference: `list-${++ctx.counter.n}`,
    markerBold: /marker:font-bold/.test(list.className),
    ...measureIndent(list, items, style, ctx.baseLeft),
  };

  const parsedItems: listItemEdura[] = [];

  for (const item of items) {
    const itemStyle = window.getComputedStyle(item);

    parsedItems.push({
      spacingBefore: Math.max(0, parseFloat(itemStyle.marginTop) || 0),
      spacingAfter: Math.max(0, parseFloat(itemStyle.marginBottom) || 0),
      blocks: await parseBlocks(item, ctx),
    });
  }

  return {
    type: "list",
    info,
    items: parsedItems,
  };
}

function resolveStart(list: HTMLOListElement | HTMLUListElement) {
  if (!(list instanceof HTMLOListElement)) return 1;

  const start = parseInt(list.getAttribute("start") ?? "", 10);
  return Number.isFinite(start) && start > 0 ? start : 1;
}

function resolveFormat(
  list: HTMLOListElement | HTMLUListElement,
  style: CSSStyleDeclaration
): ListFormat {
  if (list instanceof HTMLUListElement) return "bullet";

  const fromClass = matchClassFormat(list.className);
  if (fromClass) return fromClass;

  switch (style.listStyleType) {
    case "upper-alpha":
    case "upper-latin":
      return "upper-alpha";
    case "lower-alpha":
    case "lower-latin":
      return "lower-alpha";
    case "upper-roman":
      return "upper-roman";
    case "lower-roman":
      return "lower-roman";
    case "disc":
    case "circle":
    case "square":
      return "bullet";
    default:
      return "decimal";
  }
}

function matchClassFormat(className: string): ListFormat | null {
  const value = className.match(/list-\[(.*?)\]/)?.[1];
  if (!value) return null;

  switch (value) {
    case "upper-alpha":
    case "upper-latin":
      return "upper-alpha";
    case "lower-alpha":
    case "lower-latin":
      return "lower-alpha";
    case "upper-roman":
      return "upper-roman";
    case "lower-roman":
      return "lower-roman";
    default:
      return null;
  }
}

/**
 * Ukur indent list dari posisi nyata di layar.
 * - indentLeft = jarak awal teks item dari tepi kiri area konten (root/sel).
 * - hanging    = jarak marker ke awal teks (marker outdent).
 */
function measureIndent(
  list: HTMLOListElement | HTMLUListElement,
  items: HTMLLIElement[],
  style: CSSStyleDeclaration,
  baseLeft: number
) {
  const listRect = list.getBoundingClientRect();
  const firstItem = items[0];
  const itemRect = firstItem?.getBoundingClientRect();
  const itemStyle = firstItem ? window.getComputedStyle(firstItem) : null;

  const listPadding = parseFloat(style.paddingLeft) || 0;
  const itemPadding = itemStyle ? parseFloat(itemStyle.paddingLeft) || 0 : 0;
  const isInside = style.listStylePosition === "inside";

  let textLeft = itemRect
    ? itemRect.left + itemPadding
    : listRect.left + listPadding;

  let indentPx = textLeft - baseLeft;
  if (!Number.isFinite(indentPx) || indentPx < 0) {
    indentPx = listPadding + itemPadding;
  }

  const hangingPx = isInside
    ? Math.min(indentPx, 8)
    : Math.min(indentPx, Math.max(listPadding, itemPadding, 12));

  return {
    indentLeft: Math.max(0, pxToTwip(indentPx)),
    hanging: Math.max(0, pxToTwip(hangingPx)),
  };
}
