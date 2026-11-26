import type { ParsedElementEdura } from "./common-comps/type-parsed";
import parseBlocks, { createParseContext } from "./common-comps/parse-blocks";

/**
 * Parse seluruh area cetak menjadi blok dokumen.
 * Detail per elemen (paragraf, heading, list, tabel, gambar) ditangani
 * oleh parser blok bersama agar konsisten dengan isi sel tabel.
 */
export default async function ParsingPrintArea(
  element: HTMLElement
): Promise<ParsedElementEdura[]> {
  const ctx = createParseContext(element);

  return parseBlocks(element, ctx);
}
