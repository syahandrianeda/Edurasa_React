import { AlignmentType, Paragraph, Table } from "docx";
import type { listNodeEdura } from "../parser/common-comps/type-table";
import { pxToTwip } from "~/export/docx/converter/px-to-twip";
import MapParagraphEdura from "./map-paragraph";
import MapImageCell from "./map-image-in-cell";
import MapTableCommon from "./map-table-common";
import MapKopSurat from "./map-kop";
import MapTtd from "./map-kttd";
import MapHeadingDocx from "./map-heading";
import SeparateTables from "./separate-tables";

/**
 * Render satu instance list menjadi rangkaian blok Word.
 * - Hanya blok pertama tiap item yang membawa `numbering` (agar marker tidak dobel).
 * - Blok lanjutan memakai indent teks item supaya tetap sejajar.
 * - Tabel/gambar di dalam item tetap dirender berurutan.
 */
export default function MapListEdura(
  list: listNodeEdura
): (Paragraph | Table)[] {
  const konten: (Paragraph | Table)[] = [];
  const numbering = { reference: list.info.reference, level: 0 };

  for (const item of list.items) {
    let markerApplied = false;

    if (item.blocks[0]?.type !== "paragraph") {
      konten.push(
        new Paragraph({
          numbering,
          spacing: {
            before: pxToTwip(item.spacingBefore),
            after: pxToTwip(item.spacingAfter),
          },
        })
      );
      markerApplied = true;
    }

    item.blocks.forEach((block, index) => {
      const isFirst = index === 0;
      const isLast = index === item.blocks.length - 1;

      if (block.type === "paragraph") {
        const spacing = {
          before: isFirst
            ? Math.max(block.spacing?.before ?? 0, pxToTwip(item.spacingBefore))
            : block.spacing?.before ?? 0,
          after: isLast
            ? Math.max(block.spacing?.after ?? 0, pxToTwip(item.spacingAfter))
            : block.spacing?.after ?? 0,
          line: block.spacing?.line,
        };

        konten.push(
          MapParagraphEdura(block, {
            numbering: isFirst ? numbering : undefined,
            indent: isFirst ? undefined : { left: list.info.indentLeft },
            spacing,
          })
        );

        if (isFirst) markerApplied = true;
        return;
      }

      if (block.type === "list") {
        konten.push(...MapListEdura(block));
        return;
      }

      if (block.type === "image") {
        konten.push(
          new Paragraph({
            alignment: AlignmentType.START,
            children: [MapImageCell(block)],
          })
        );
        return;
      }

      if (block.type === "table") {
        konten.push(MapTableCommon(block));
        return;
      }

      if (block.type === "table-kop") {
        konten.push(MapKopSurat(block));
        return;
      }

      if (block.type === "table-ttd") {
        konten.push(MapTtd(block));
        return;
      }

      if (block.type === "heading") {
        konten.push(MapHeadingDocx(block));
        return;
      }
    });

    if (!markerApplied) {
      konten.push(new Paragraph({ numbering }));
    }
  }

  return SeparateTables(konten);
}
