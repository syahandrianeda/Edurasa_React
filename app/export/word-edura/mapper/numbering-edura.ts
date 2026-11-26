import { AlignmentType, LevelFormat, LevelSuffix } from "docx";
import type { INumberingOptions } from "docx";
import type {
  cellsTableCommon,
  ListBlockEdura,
  ListFormat,
  listNodeEdura,
} from "../parser/common-comps/type-table";

type NumberingConfig = INumberingOptions["config"][number];

/**
 * Kumpulkan seluruh list (root, nested, dan di dalam sel tabel) menjadi
 * konfigurasi numbering Word. Satu list = satu reference supaya penomoran
 * otomatis dimulai dari awal lagi di list berikutnya.
 */
export default function BuildNumberingConfig(
  blocks: ListBlockEdura[]
): INumberingOptions["config"] {
  const configs = new Map<string, NumberingConfig>();

  const visitBlock = (block: ListBlockEdura | cellsTableCommon) => {
    if (block.type === "list") {
      if (!configs.has(block.info.reference)) {
        configs.set(block.info.reference, buildListConfig(block));
      }

      block.items.forEach((item) => item.blocks.forEach(visitBlock));
      return;
    }

    if (block.type === "table") {
      block.rows.forEach((row) =>
        row.cells.forEach((cell) => cell.children.forEach(visitBlock))
      );
    }
  };

  blocks.forEach(visitBlock);

  return [...configs.values()];
}

function buildListConfig(list: listNodeEdura): NumberingConfig {
  const { info } = list;
  const indent =
    info.hanging > 0
      ? { left: info.indentLeft, hanging: info.hanging }
      : { left: info.indentLeft };

  return {
    reference: info.reference,
    levels: [
      {
        level: 0,
        format: mapFormat(info.format),
        text: info.format === "bullet" ? "\u2022" : "%1.",
        start: info.start,
        alignment: AlignmentType.START,
        suffix: LevelSuffix.TAB,
        style: {
          ...(info.markerBold ? { run: { bold: true } } : {}),
          paragraph: { indent },
        },
      },
    ],
  };
}

function mapFormat(format: ListFormat) {
  switch (format) {
    case "upper-alpha":
      return LevelFormat.UPPER_LETTER;
    case "lower-alpha":
      return LevelFormat.LOWER_LETTER;
    case "upper-roman":
      return LevelFormat.UPPER_ROMAN;
    case "lower-roman":
      return LevelFormat.LOWER_ROMAN;
    case "bullet":
      return LevelFormat.BULLET;
    case "decimal":
    default:
      return LevelFormat.DECIMAL;
  }
}
