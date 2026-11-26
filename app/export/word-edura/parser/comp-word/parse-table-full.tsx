import type { cellsTableCommon, TableParseCommon } from "../common-comps/type-table";
import { hexColorValue } from "docx";
import { resolveRgbaOrOklchToHex } from "~/lib/color-hack";
import parseBlocks, {
  withBaseLeft,
  type ParseBlocksContext,
} from "../common-comps/parse-blocks";

export default async function parseCommonTable(
  table: HTMLTableElement,
  ctx: ParseBlocksContext
): Promise<TableParseCommon> {
  const row = Array.from(table.rows);
  return {
    type: "table",
    width: table.offsetWidth,
    rows: await Promise.all(
      row.map(async (row) => {
        const cells = Array.from(row.cells);
        return {
          cells: await Promise.all(
            cells
              .filter((s) => !s.classList.contains("print:hidden"))
              .map(async (cell) => {
                const width = cell.offsetWidth;
                const konten = await parseCellContent(cell, ctx);
                const style = window.getComputedStyle(cell);

                return {
                  width,
                  parentType: cell.tagName.toLowerCase() as "td" | "th",
                  shading: {
                    bg: hexColorValue(
                      resolveRgbaOrOklchToHex(style.backgroundColor)?.hex ??
                        "#FFFFFF"
                    ),
                    persentage:
                      resolveRgbaOrOklchToHex(style.backgroundColor)?.a ??
                      undefined,
                    color: hexColorValue(
                      resolveRgbaOrOklchToHex(style.color)?.hex ?? "#000000"
                    ),
                    detailBg: resolveRgbaOrOklchToHex(style.backgroundColor),
                    detailColor: resolveRgbaOrOklchToHex(style.color),
                  },
                  padding: {
                    top: parseFloat(style.paddingTop),
                    right: parseFloat(style.paddingRight),
                    bottom: parseFloat(style.paddingBottom),
                    left: parseFloat(style.paddingLeft),
                  },
                  verticalAlign: style.verticalAlign as
                    | "top"
                    | "center"
                    | "bottom"
                    | "middle",
                  borders: {
                    top: {
                      color: style.borderTopColor,
                      size: parseFloat(style.borderTopWidth),
                      style: style.borderTopStyle,
                    },
                    right: {
                      color: style.borderRightColor,
                      size: parseFloat(style.borderRightWidth),
                      style: style.borderRightStyle,
                    },
                    bottom: {
                      color: style.borderBottomColor,
                      size: parseFloat(style.borderBottomWidth),
                      style: style.borderBottomStyle,
                    },
                    left: {
                      color: style.borderLeftColor,
                      size: parseFloat(style.borderLeftWidth),
                      style: style.borderLeftStyle,
                    },
                  },
                  colSpan: cell.colSpan,
                  rowSpan: cell.rowSpan,
                  margins: {
                    top: parseFloat(style.marginTop),
                    right: parseFloat(style.marginRight),
                    bottom: parseFloat(style.marginBottom),
                    left: parseFloat(style.marginLeft),
                  },
                  children: konten,
                };
              })
          ),
        };
      })
    ),
  };
}

async function parseCellContent(
  cell: HTMLTableCellElement,
  ctx: ParseBlocksContext
): Promise<cellsTableCommon[]> {
  return parseBlocks(cell, withBaseLeft(ctx, cell));
}
