import type { OpsiSoal, Soal } from "../type";

export type MCQOption = {
  key: string;   // a, b, c, d (internal saja)
  text: string;
};

export type MCQQuestion = {
  no: number;
  question: string;
  options: MCQOption[];
};

export function parseMCQ(input: string): Soal[] {
  // 1. Normalisasi
  const text = input
    .replace(/\r/g, '') // ini baris
    .replace(/\t/g, ' ') // ini tab
    .replace(/[ ]{2,}/g, ' ') // ini apa? kayaknya ini spasi ya?
    .trim();

  // 2. Split berdasarkan nomor soal
  const blocks = text.split(/(?=\n?\d+\.)/g).filter(Boolean);

  const result: Soal[]=[];//MCQQuestion[] = [];

  for (const block of blocks) {
    const noMatch = block.match(/^(\d+)\./);
    if (!noMatch) continue;

    const no = parseInt(noMatch[1], 10);

    // 3. Pisahkan bagian soal vs opsi
    const parts = block
      .replace(/^(\d+)\.\s*/, '')
      .split(/\n(?=[a-d]\.)|(?=[a-d]\.)/i);

    const questionPart = parts[0].trim();

    const optionsRaw = parts.slice(1);

    const options:OpsiSoal[]=[];// MCQOption[] = [];

    for (const opt of optionsRaw) {
      const match = opt.match(/^([a-d])\.\s*(.*)$/i);

      if (match) {
        options.push({
          kode: match[1].toLowerCase(),
          isi: match[2].trim(),
        });
      } else {
        // fallback kalau formatnya “acak”
        options.push({
          kode: String.fromCharCode(97 + options.length),
          isi: opt.trim().replace(/^[a-d]\.\s*/i, ''),
        });
      }
    }

    result.push({
        indikator_soal: '',
            soal: questionPart,// string;
            opsi: options,//OpsiSoal[];
            jawaban: '',
            lainnya:'',
            lk:'',
            tp:''
    //   no,
    //   question: questionPart,
    //   options,
    });
  }

  return result;
}