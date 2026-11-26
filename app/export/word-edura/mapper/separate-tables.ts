import { LineRuleType, Paragraph, Table } from "docx";

/**
 * Word otomatis menggabungkan dua tabel yang bersebelahan tanpa paragraf
 * di antaranya. Sisipkan paragraf kosong setinggi 1pt agar tabel tetap
 * terpisah tanpa menambah jarak yang terlihat.
 */
export default function SeparateTables<T extends Paragraph | Table>(
  children: T[]
): (T | Paragraph)[] {
  const result: (T | Paragraph)[] = [];

  for (const child of children) {
    if (child instanceof Table && result[result.length - 1] instanceof Table) {
      result.push(tableSeparator());
    }
    result.push(child);
  }

  return result;
}

function tableSeparator() {
  return new Paragraph({
    spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
  });
}
