# Rencana Implementasi — Export Word (.docx) dari `CetakPaketSoalServer`

Dokumen ini adalah hasil analisis `prompt.md` terhadap kode yang ada saat ini, lalu diterjemahkan
menjadi alur implementasi bertahap. **Belum ada kode yang diubah**; dokumen ini hanya rencana.

---

## 1. Ringkasan Permintaan (dari `prompt.md`)

| No | Permintaan | Status saat ini |
|----|-----------|-----------------|
| 1 | Fitur export `.docx` memakai `UseDocxEdura`, `exportDocx`, `MapRootParsedDocx`, `useExportTarget` | Pipeline ada, tetapi belum dipakai di modal ini |
| 2 | Trigger button di `CetakPaketSoalServer` | **Belum ada**; footer hanya punya tombol Print |
| 3 | Sumber tampilan = `div` ber-`ref` di `CetakPaketSoalServer` | Sudah ada `useExportTarget('print-area-modal')` |
| 4 | Gambar harus muncul, tidak “this picture can’t be displayed”, gambar dari Google Drive, solusi blob untuk CORS | Pipeline gambar rapuh (CORS, mime salah, webp) |
| 5 | Ukuran gambar sama dengan ukuran di komponen sumber | Ukuran di-hardcode (`*0.8`, 710/1020 px) |
| 6 | Indent & spacing `ol/ul` sesuai komponen sumber | **Belum ada dukungan list sama sekali** |

---

## 2. Temuan Kode Saat Ini (kondisi nyata di branch `feature/pg-kompleks`)

### 2.1 Pipeline export
- `app/export/word-edura/applications/use-docx-edura.tsx`
  - Alur: `ParsingPrintArea(element)` → `MapRootParsedDocx(parsed, orientation)` → `exportDocx(doc, fileName)`.
  - Tipe return salah: `executeWord: void`, padahal fungsinya `(element, orientation) => Promise<void>`.
  - Belum mengembalikan status `isExporting` (dibutuhkan untuk disable tombol).
- `app/export/docx/application/docx-exporter.ts` — `Packer.toBlob` + `saveAs` (sudah sesuai, tidak perlu diubah).
- `app/export/word-edura/mapper/map-root.ts`
  - Hanya menangani `heading | table-kop | table-ttd | table | image`; sisanya jatuh ke `new Paragraph('')`.
  - **Tidak ada** mapping paragraf biasa dan **tidak ada** `numbering` pada `new Document(...)`.
  - Ukuran halaman/margin 10 mm sudah ada (A4 portrait/landscape).

### 2.2 Parser root — `app/export/word-edura/parser/parsing-print-area.tsx`
Yang ditangani saat ini hanya:
- `TABLE` → `parseKop` / `parseTtd` / `parseCommonTable`
- `H1..H6`
- `[data-word="img"]` (di-render jadi PNG via `html-to-image`)
- `IMG` di luar `td` **hanya** bila `data-word="image-liburan"`
- `IMG` di dalam `td` **hanya** bila `data-word="image-soal"`

Yang **hilang** (dan ini mayoritas isi modal):
- `<p>` (pertanyaan/stimulus) tidak pernah jadi paragraf.
- `<ol>/<ul>/<li>` tidak pernah dibaca → seluruh struktur penomoran hilang.
- `<div class="editor-document">` hanya ditelusuri anaknya, tanpa menghasilkan blok teks.
- `<strong>/<em>/<span>` tidak dipertahankan (bold inline hilang).
- Gambar soal (`data-word="image-soal"`) di dalam `<li>` (bukan `td`) dilewati.
- Tabel di dalam `<li>` tetap terbaca, tetapi urutannya lepas dari item list.

### 2.3 Parser sel tabel — `app/export/word-edura/parser/comp-word/parse-table-full.tsx`
- Menangani text node, `<p>`, `<img>` saja.
- Tidak menangani `ol/ul/li`, tabel bersarang, dan blok `div`.
- Text node mewarisi style parent sehingga bold inline di dalam `<p>` hilang.
- `fontSize: parseFloat(style.fontSize) + 3.5` — magic number, perlu dikaji agar konsisten.

### 2.4 Mapper
- `map-table-common.ts` hanya merender `image | paragraph | text`; tidak ada indent/spacing/numbering,
  dan `TableCell.margins` hanya memakai padding.
- `map-image.ts`: lebar **di-hardcode** 710 px (portrait) / 1020 px (landscape), mengabaikan ukuran sumber.
- `map-image-in-cell.ts`: `element.width * 0.8` — angka arbitrer, bukan ukuran sumber.
- Keduanya **selalu** `type: 'png'` meskipun `mimeType` hasil parse bisa `image/jpeg`
  → salah satu penyebab Word menampilkan placeholder “picture can’t be displayed”.
- `pxToTwip = px * 12` (1 px ≈ 15 twip secara eksak; 12 dipakai sebagai pendekatan proyek) —
  dipakai konsisten untuk indent/spacing.
- Tidak ada file `numbering-*.ts` dan tidak ada kata `numbering` di `app/export/word-edura`
  (sudah dicek dengan pencarian teks).

### 2.5 Gambar Google Drive
- Sumber: `https://lh3.googleusercontent.com/d/<id>` dengan `referrerPolicy="no-referrer"`
  (contoh: `petunjuk-umum.tsx`, renderer TipTap `data-word="image-soal"`).
- `parseImage()` memakai `fetch(url)` tanpa `mode: 'cors'` dan tanpa `crossOrigin` pada `<img>`.
  Bila respons tidak mengizinkan CORS → `fetch` gagal / blob kosong → data gambar invalid.
- `convertImageToBase64` tidak menangani `response.ok === false`.
- `mimeType` ditebak dari string URL, bukan dari isi blob; webp hanya ditangani bila `src` berupa `data:`.

### 2.6 Trigger di modal
- `cetak-paket-soal-server.tsx` hanya memasang `<ButtonPrintModal type="portrait" />`.
- `ExportDropdown` memakai target `'print-area'`, sedangkan modal ini mendaftarkan `'print-area-modal'`
  → tidak boleh saling disamakan; tombol Word khusus modal lebih aman.
- `app/controllers/modal-cetak/control-export-word-modal.tsx` **belum ada**.

---

## 3. Keputusan Desain

1. **Satu parser blok bersama** untuk root dan sel tabel.
   Alasan: root (`ol > li > div.editor-document > p/ol/img`) dan sel tabel membutuhkan aturan yang sama.
   parser baru: `app/export/word-edura/parser/common-comps/parse-blocks.ts`.
2. **Model data pohon, bukan flat.**
   Tambah node `list` berisi `items`, setiap item berisi blok (paragraf, tabel, gambar, list nested).
   Nomor urut dihitung oleh Word (`numbering`), bukan ditulis manual sebagai teks.
3. **Satu `reference` numbering per instance list.**
   Word me-restart penomoran per `reference`; ini otomatis menyelesaikan kasus
   “setiap item kembali ke angka 1”. Dukungan `start` (mis. `<ol start={11}>`) memakai
   `start` pada level numbering.
4. **Semua gambar dikonversi ke PNG di sisi klien** (blob → canvas), disimpan sebagai `Uint8Array`,
   dan `ImageRun` memakai tipe yang benar-benar sesuai data. Ini menghilangkan placeholder Word.
5. **Ukuran gambar = ukuran render di layar** (`getBoundingClientRect`), hanya diperkecil bila
   melebihi lebar area (halaman/sel), dengan rasio aspek tetap.
6. **Indent & spacing dari computed style**, bukan konstanta:
   - `padding-left` list + posisi awal teks item → `indent.left` & `indent.hanging` (twip).
   - `margin-top/bottom` item/paragraf + `line-height` → `spacing.before/after/line`.
7. **Jangan menambah library baru.** `docx`, `file-saver`, `html-to-image` sudah ada.
8. **Tanpa unit test baru** (sesuai aturan kerja); verifikasi = `npm run typecheck` + uji manual di Word.

---

## 4. Perubahan Model Data (tipe)

File: `app/export/word-edura/parser/common-comps/type-comp.ts`

```ts
export type ListFormat =
  | 'decimal' | 'upper-alpha' | 'lower-alpha'
  | 'upper-roman' | 'lower-roman' | 'bullet';

export type ListInfo = {
  format: ListFormat;
  level: number;              // 0-based
  start: number;              // 1 untuk ul
  reference: string;          // unik per instance list, mis. 'list-3'
  indentLeft: number;         // twip
  hanging: number;            // twip
};

// paragraf: tambahan opsional agar kompatibel dengan kode lama
export type paragraphEdura = {
  /* ...field lama tetap... */
  runs?: InlineRunEdura[];                 // bold/italic/underline inline
  numbering?: { reference: string; level: number };
  indent?: { left: number; hanging?: number };
  spacing?: { before?: number; after?: number; line?: number };
};

export type listNodeEdura = {
  type: 'list';
  info: ListInfo;
  items: ListItemEdura[];      // setiap item = daftar blok
};

export type ListItemEdura = {
  blocks: BlockEdura[];        // paragraph | table | image | list (nested)
};
```

File: `type-parsed.ts` & `type-table.ts` — tambahkan `listNodeEdura` ke union
`ParsedElementEdura` dan `cellsTableCommon` (atau union blok bersama `BlockEdura`).

---

## 5. Alur Implementasi Bertahap

### Fase 1 — Parser blok bersama (fondasi)
**File baru:** `app/export/word-edura/parser/common-comps/parse-blocks.ts`

Fungsi utama: `parseBlocks(root: HTMLElement, ctx: { listCounter: { n: number } }) : Promise<BlockEdura[]>`

Aturan per node:
1. `TABLE` → `parseKop` / `parseTtd` / `parseCommonTable` (berdasarkan `data-word`), `return` (jangan telusuri anak).
2. `H1..H6` → `headingComp` (seperti sekarang).
3. `OL` / `UL`:
   - format dari `getComputedStyle(node).listStyleType` (`decimal`, `upper-alpha`, `upper-roman`, …);
     fallback parsing class `list-[upper-alpha]`, `list-[upper-roman]`, `list-decimal`.
   - `start` dari atribut `start` (default 1).
   - `reference` unik dari counter global (`list-<n>`).
   - indent diukur: `paddingLeft` + posisi teks item (lihat Fase 4).
   - item = `Array.from(node.children)` yang `LI` → rekursif `parseBlocks(li)`.
4. `P` → `paragraphEdura` + `runs` inline (Fase 3), `numbering` diisi pemanggil bila berada di dalam `LI`.
5. `IMG` → `parseImageBlob(img)` (Fase 2) **tanpa** syarat `data-word`.
6. `DIV` / `SPAN` / elemen lain → telusuri anak; bila elemen hanya berisi teks langsung, jadikan paragraf.
7. Text node di level blok (mis. teks langsung di `li`) → paragraf.
8. Lewati `print:hidden` dan `[data-word="ignore-parse"]`.

`parsing-print-area.tsx` disederhanakan: `walk` lama diganti `parseBlocks(element, ctx)`
(khusus `data-word="img"` tetap memakai jalur `html-to-image` existing karena itu memang screenshot blok).

`parse-table-full.tsx`: `parseCellContent` memakai `parseBlocks(cell, ctx)`; hapus `walkNode` lama.
Pastikan `parseCommonTable` menerima `ctx` agar `reference` list unik lintas root + sel.

**Kriteria selesai:** isi `div` ref (teks soal, opsi, list, tabel, gambar) masuk ke array parsed;
`npm run typecheck` lulus.

---

### Fase 2 — Pipeline gambar: blob, PNG, anti-CORS
**File baru:** `app/export/docx/parser/image-blob.ts`

`loadImageAsPng(img: HTMLImageElement): Promise<ImageNodeEdura | null>` dengan strategi berlapis:

1. **`src` berupa `data:`** → ambil base64; bila webp → canvas → PNG.
2. **`fetch(src, { mode: 'cors', cache: 'no-store' })`** → `response.ok` dicek → `blob` →
   `createImageBitmap`/`Image` → canvas → `toBlob('image/png')` → `Uint8Array`.
   Ini yang menjawab permintaan “buatkan data blob-nya saja”.
3. **Fallback `html-to-image.toBlob(img)`** (sudah dependency) bila fetch ditolak CORS.
4. **Fallback canvas langsung** bila `img.complete && img.naturalWidth > 0`
   (pakai `try/catch` karena canvas bisa tainted).
5. **Fallback terakhir: route proxy server** (opsional, dipakai hanya jika 1–4 gagal):
   `app/routes/proxy-image.ts` → `loader` yang mem-`fetch` URL, memvalidasi host
   (`lh3.googleusercontent.com`, `drive.google.com`, `*.googleusercontent.com`),
   lalu mengembalikan `Response` dengan `Content-Type` asli + `Cache-Control`.
   Didaftarkan di `app/routes.ts` sebagai `route('api/proxy-image', 'routes/proxy-image.ts')`.
   Batasi ukuran respons (mis. 10 MB) dan hanya `image/*`.

Aturan tambahan:
- Hasil selalu `mimeType: 'image/png'`.
- Bila `bytes.length < 100` → `return null` (jangan menghasilkan gambar rusak di Word).
- Ukuran diambil `getBoundingClientRect()`; fallback `offsetWidth/Height`, lalu `naturalWidth/Height`,
  lalu `parseFloat(getComputedStyle(img).width/height)`.
- `parseImage()` lama dipertahankan sebagai wrapper tipis agar pemanggil lain tidak pecah.

**Kriteria selesai:** gambar Google Drive pada `PetunjukUmumPaketSoal` dan gambar soal
menghasilkan `Uint8Array` PNG non-kosong (dicek via `console.log` sementara saat pengujian manual).

---

### Fase 3 — Format inline & pengukuran spacing
**File:** `parse-blocks.ts`

- Kumpulkan `runs` dari anak inline (`strong/b`, `em/i`, `u`, `span` dengan style, `br`).
  Setiap run: `{ text, bold, italics, underline, size, font, allCaps, color? }`.
- `paragraphEdura.isBold` tetap diisi (agregat) supaya mapper lama tetap jalan.
- `spacing.before/after` dari `margin-top/bottom` elemen (dikonversi `pxToTwip`).
- `spacing.line` dari `lineHeight` (`parseFloat`), `lineRule: 'auto'`.
- Untuk `li`: `spacing.after` dari `margin-bottom` item (contoh kasus: `mb-3`).

**Kriteria selesai:** label tebal (“PETUNJUK UMUM”, “PETUNJUK KHUSUS”) tetap tebal di Word,
jarak antar item soal mengikuti `mb-3`.

---

### Fase 4 — Indent & hanging list terukur
**File:** `parse-blocks.ts`

Untuk setiap `OL/UL`:
1. `olRect = node.getBoundingClientRect()`.
2. Untuk `LI` pertama: `liRect`, lalu ukur posisi awal teks dengan
   `document.createRange()` pada text node pertama → `textRect.left`.
3. `indentLeftPx = textRect.left - olRect.left` (fallback: `parseFloat(paddingLeft)`).
4. `hangingPx = textRect.left - liRect.left` (fallback: `16`, clamp minimal 0).
5. Konversi: `pxToTwip(indentLeftPx)`, `pxToTwip(hangingPx)`; clamp `hanging <= indentLeft`.
6. Level = kedalaman list saat rekursi (0 untuk list teratas di konteksnya).

Untuk list `list-inside` (contoh `identitas-paket-soal.tsx`): `hanging` mendekati 0
karena teks dimulai setelah marker pada baris yang sama — pengukuran Range menanganinya otomatis.

**Kriteria selesai:** indent bertingkat `upper-alpha → upper-roman → decimal` terlihat menjorok
sesuai modal, dan teks item rata pada satu garis vertikal.

---

### Fase 5 — Numbering Word
**File baru:** `app/export/word-edura/mapper/numbering-edura.ts`

`BuildNumberingConfig(parsed: BlockEdura[])` menelusuri seluruh pohon (termasuk `items[].blocks`
dan `children` sel tabel) lalu mengumpulkan setiap `list`:

```ts
{
  reference: info.reference,
  levels: [{
    level: 0,
    format: mapFormat(info.format),      // LevelFormat.UPPER_ALPHA / UPPER_ROMAN / DECIMAL / BULLET
    text: info.format === 'bullet' ? '•' : `%${info.level + 1}.`,
    start: info.start,
    alignment: AlignmentType.START,
    style: {
      paragraph: { indent: { left: info.indentLeft, hanging: info.hanging } },
      run: { bold: true },               // marker:font-bold pada ol pembuka
    },
  }],
}
```

- `map-root.ts`: `new Document({ numbering: { config: BuildNumberingConfig(parsed) }, sections: [...] })`.
- `map-paragraph.ts` (baru, atau fungsi di mapper list): bangun `Paragraph` dengan
  `numbering: { reference, level }`, `indent`, `spacing`.
- Item list yang berisi blok lanjutan (tabel/gambar/paragraf kedua): hanya blok pertama memakai
  `numbering`; blok berikutnya memakai `indent.left` tanpa `hanging` agar sejajar teks item.

**Kriteria selesai:** urutan naik (1,2,3 / A,B,C / I,II,III), restart di setiap list baru
(mis. tiap soal mulai dari A), dan `start` pada `<ol start={n}>` dihormati.

---

### Fase 6 — Mapper tabel & gambar
**File diubah:**

1. `app/export/word-edura/mapper/map-table-common.ts`
   - Terima `BlockEdura` (bukan hanya `cellsTableCommon`): render `list` (rekursif via mapper item),
     `paragraph` dengan `runs/numbering/indent/spacing`, `image`, `table` (tabel bersarang).
   - Gunakan `m.runs` bila ada; jika tidak, perilaku lama (`TextRun` tunggal).
   - Batas kedalaman rekursi tabel (mis. 3) untuk mencegah loop.
2. `app/export/word-edura/mapper/map-image.ts` & `map-image-in-cell.ts`
   - Hapus `710/1020` dan `*0.8`.
   - `width/height` dari node hasil parse (px), lalu:
     - root: `maxW = 718` (portrait) / `1047` (landscape) px;
       `scale = Math.min(1, maxW / width)`; `w = round(width*scale)`, `h = round(height*scale)`.
     - dalam sel: `maxW = cellWidth - paddingLeft - paddingRight - 8`;
       bila `maxW <= 0` pakai `cellWidth * 0.9`.
   - `type` `ImageRun` mengikuti `mimeType` (`png`/`jpg`) — semua hasil parse PNG, jadi `'png'`.
3. `app/export/word-edura/mapper/map-root.ts`
   - Tangani `type: 'paragraph'` dan `type: 'list'` (sebelumnya fallback `Paragraph('')`).
   - Teruskan `orientation` ke mapper gambar root.

**Kriteria selesai:** gambar muncul dengan ukuran mendekati tampilan modal (tidak meluber),
dan tabel di dalam list/li tidak hilang.

---

### Fase 7 — Trigger tombol Word di modal
**File baru:** `app/controllers/modal-cetak/control-export-word-modal.tsx`

```tsx
export default function ButtonExportWordModal({ className, type = 'portrait' }) {
  const { getTarget } = useExportTarget();
  const { executeWord, isExporting } = UseDocxEdura({ fileName: ... });
  // getTarget('print-area-modal') → executeWord(target, type)
}
```

- Pola visual mengikuti `control-export-print.tsx` (tombol rounded, ikon `lucide-react`, mis. `FileText`/`Download`).
- Label berubah “Menyiapkan…” + `disabled` saat `isExporting`.
- `UseDocxEdura` diperbaiki: tipe `executeWord` menjadi fungsi, tambah state `isExporting`
  dan sanitasi nama file (`/ \\ : * ? " < > |` → `-`).

**File diubah:** `app/controllers/paket-soal/modal/cetak-paket-soal-server.tsx`
- Tambahkan `<ButtonExportWordModal className="px-4 py-0" type="portrait" />` di `ModalFooterEdura`
  di samping tombol Print.
- Nama file dari data setting, mis. `Paket-Soal-${setting?.identitas?.nama ?? 'Dokumen'}.docx`.
- Tidak mengubah `useExportTarget('print-area-modal')` yang sudah ada.

**Kriteria selesai:** tombol tampil, mengunduh `.docx`, dan overlay loading muncul/hilang dengan benar.

---

## 6. Urutan Pengerjaan & Dependensi

```
Fase 1 (parse-blocks)  ──► Fase 3 (inline) ──► Fase 5 (numbering) ──► Fase 6 (mapper tabel/gambar)
        │                        │                                          ▲
        ├──► Fase 4 (indent) ────┘                                          │
        └──► Fase 2 (image blob) ───────────────────────────────────────────┘
                                                     Fase 7 (tombol) ── bergantung pada Fase 1–6
```

Setiap fase diakhiri `npm run typecheck` (`react-router typegen && tsc`).

---

## 7. Daftar File

**Baru**
- `app/export/word-edura/parser/common-comps/parse-blocks.ts`
- `app/export/word-edura/mapper/map-paragraph.ts` (mapper paragraf/list item)
- `app/export/word-edura/mapper/numbering-edura.ts`
- `app/export/docx/parser/image-blob.ts`
- `app/controllers/modal-cetak/control-export-word-modal.tsx`
- (opsional, hanya bila fallback CORS dibutuhkan) `app/routes/proxy-image.ts` + entri di `app/routes.ts`

**Diubah**
- `app/export/word-edura/parser/parsing-print-area.tsx`
- `app/export/word-edura/parser/comp-word/parse-table-full.tsx`
- `app/export/word-edura/parser/common-comps/type-comp.ts`
- `app/export/word-edura/parser/common-comps/type-parsed.ts`
- `app/export/word-edura/parser/common-comps/type-table.ts`
- `app/export/word-edura/mapper/map-root.ts`
- `app/export/word-edura/mapper/map-table-common.ts`
- `app/export/word-edura/mapper/map-image.ts`
- `app/export/word-edura/mapper/map-image-in-cell.ts`
- `app/export/word-edura/applications/use-docx-edura.tsx`
- `app/export/docx/parser/img-parser.tsx` (jadikan wrapper `loadImageAsPng` + validasi `response.ok`)
- `app/controllers/paket-soal/modal/cetak-paket-soal-server.tsx`

---

## 8. Verifikasi

**Otomatis**
- `npm run typecheck` setelah setiap fase.
- Tidak menambah unit test (sesuai aturan proyek).

**Manual (wajib, karena hasil akhir adalah dokumen Word)**
Ekspor dari modal Cetak Paket Soal, lalu periksa di Word:
1. Teks pertanyaan/stimulus muncul (bukan hanya judul & tabel).
2. Opsi jawaban `upper-alpha` berurutan A, B, C, D, E dan **restart A** di setiap soal.
3. Struktur `upper-alpha → upper-roman → decimal` menjorok bertingkat; teks item rata kiri konsisten.
4. `<ol start={11}>` mulai dari nomor yang diminta, bukan 1.
5. “PETUNJUK UMUM” menampilkan list decimal 1–6 beserta tabel contoh jawaban di dalam item 5.
6. Gambar Google Drive (contoh jawaban) tampil utuh; tidak ada “this picture can’t be displayed”.
7. Ukuran gambar ± sama dengan tampilan modal dan tidak melewati margin halaman.
8. Jarak antar item soal (`mb-3`) dan jarak antar blok terjaga.
9. Dokumen landscape juga benar (lebar gambar mengikuti 1047 px, bukan 710 px).

---

## 9. Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Google Drive menolak CORS di semua jalur klien | Route proxy server dengan allowlist host + batas ukuran; aktif hanya sebagai fallback terakhir |
| `html-to-image` lambat pada DOM besar | Hanya dipakai per-gambar, bukan seluruh area |
| Numbering Word tidak restart | Satu `reference` unik per instance list; `start` eksplisit per level |
| Tabel/gambar di dalam `li` kehilangan posisi | Model pohon item (`blocks`) + numbering hanya di blok pertama item |
| Rekursi tak berujung (tabel di dalam sel tabel) | Batas kedalaman (3) dan `WeakSet` node yang sudah diproses |
| Perbedaan hasil `pxToTwip` (12 vs 15) | Pakai helper yang sudah ada agar konsisten dengan mapper lain |
| Regresi export lain (absensi, kaldik, dll.) | Perubahan `parseImage` dijadikan wrapper; `data-word` lama tetap didukung |
