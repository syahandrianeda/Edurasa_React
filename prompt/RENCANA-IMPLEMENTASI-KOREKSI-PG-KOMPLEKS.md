# Rencana Implementasi — Koreksi `pg_kompleks` di Halaman Koreksi Guru

Dokumen ini adalah hasil analisis `prompt/koreksi-fitur-pg-kompleks.md` terhadap kode yang ada
saat ini (branch `feature/pg-kompleks`).
**Belum ada kode yang diubah**; dokumen ini hanya rencana implementasi.

---

## 1. Ringkasan Permintaan

| No | Permintaan | Kondisi saat ini |
|----|-----------|------------------|
| 1 | Tambah `case 'pg_kompleks'` di `SwitchFieldKoreksiByBentukSoal` (`koreksi.tsx`) | Belum ada case → `default: null`, blok koreksi PG kompleks tidak tampil |
| 2 | Komponen koreksi mirip `pg` tetapi memakai **list bersarang** (ol parent = nomor soal, ol child = opsi), bukan tabel | Belum ada komponennya |
| 3 | Ada pilihan opsi + implementasi respon siswa dari `DataTemplateKoreksiSiswa` | Belum ada |
| 4 | Ada preview item soal `pg_kompleks` seperti `pg` | Preview bank soal sudah mendukung `pg_kompleks` (`OpsiSoalPreview` → `PgKompleksPreview`), tinggal dipakai di popover koreksi |
| 5 | Form input penskoran + kalkulasi skor via `handleUpdate` seperti `pg` | Belum ada |

Catatan penting: sisi siswa (`FormPgKompleksOnline`) **sudah ada** dan sudah memakai
`hitungSkorPGK`, `abjadListToIndexes`, `indexesToAbjadList`. Implementasi koreksi guru harus
memakai helper yang sama agar skor konsisten.

---

## 2. Temuan Kode Saat Ini

### 2.1 Alur koreksi guru

- `app/controllers/assesmen-penilaian/modals/koreksi-item-soal.tsx`
  - Menyimpan `updateRespon` (immer) dari `currentDataSelector.respon`.
  - `handleChangeUpdateRespon` memanggil `upsertRespon(draft, { bentuk_soal, no_prefix }, patch)`;
    `patch` berisi `respon?` dan/atau `skor?`.
  - `skorKd` dihitung ulang dari `updateRespon` via `SkorKdSebaranBuilder` dan dikirim saat simpan.
- `app/controllers/assesmen-penilaian/modals/fields/koreksi.tsx`
  - `KoreksiWrapper` merender satu blok per `bentuk_soal` dalam grid `md:grid-cols-3`.
  - `mergeResponLive` menempelkan `respon` live ke tiap `DataTemplateKoreksiSiswa` berdasarkan
    `bentuk_soal.name + no_prefix`; jadi child selalu membaca data terbaru dari state.
  - `SwitchFieldKoreksiByBentukSoal` hanya menangani `pg`, `essay`, `isian_singkat`.
- `KoreksiPgBody.tsx` (acuan pola `pg`)
  - Radio per opsi; klik radio memanggil
    `handleUpdate('pg', no_prefix, { respon: abjad, skor: hitungSkorPgTunggal(valid, opsi.index) })`.
  - Skor yang ditampilkan dihitung langsung dari `respon.respon` (bukan dari `respon.skor`).
  - **Catatan:** `handleUpdate` dipanggil di dalam body render (side effect saat render). Ini
    anti-pattern React; jangan ditiru apa adanya untuk komponen baru.
  - Preview memakai `PopoverPreviewSoalPgKoreksian` → `ItemSoalPreview`.

### 2.2 Struktur data yang tersedia di komponen koreksi

`DataTemplateKoreksiSiswa`:

```ts
{
  soal?: BankSoalAppType;      // berisi json_alat_jawab + pertanyaan/stimulus
  no_prefix: number;           // nomor soal per bentuk soal (mulai 1)
  respon?: RisponsePenilaianSiswa; // respon live; berisi respon + skor
}
```

`PgKompleksType` (`json_alat_jawab`):

```ts
{
  OpsiPilihanJawaban: { content: string; index: number }[];
  valid: number[];             // indeks posisi opsi yang benar, mis. [0, 2]
  formatOpsi: FormatElemen;
}
```

- Editor (`fieldset-pg-kompleks.tsx` + `editor-pg-kompleks.tsx`) menyimpan `valid` berdasarkan
  **posisi opsi** (`iOpsi`), dan `OpsiPilihanJawaban[i].index === i` pada alur normal.
- `jawaban` untuk `pg_kompleks` masih placeholder `valid.map(m => 'opsi ' + (m+1))`
  (`fieldset-pg-kompleks.tsx` baris ±68). **Jangan pakai `soal.jawaban` untuk menampilkan kunci**;
  gunakan `json_alat_jawab.valid`.

### 2.3 Helper skor & serialisasi (sudah siap pakai)

Di `app/domain/bank-soal/koreksi.ts` dan sudah diexport:

```ts
abjadListToIndexes("A,C")            // -> [0, 2]
indexesToAbjadList([2, 0])           // -> "A,C"
hitungSkorPGK(opsiDipilih, opsi, kunciValid, skorMaksimal?) // -> number
```

`hitungSkorPGK` sudah menangani: opsi `content === ""` diabaikan, opsi di luar tampilan
diabaikan, kunci kosong → 0, clamp minimal 0, pembulatan 2 desimal.
Tidak perlu perubahan domain.

### 2.4 Hilir penyimpanan (sudah kompatibel)

- `upsertRespon` meng-update entri `bentuk_soal + no_prefix`, atau push entri baru dengan
  `index = max + 1`.
- `DtoKoreksiToResponseSheet` menulis `pg_kompleks_<no_prefix> = respon` (string `"A,C"`) dan
  `skor_<index> = skor`.
- `SkorKdSebaranBuilder` mencari `no_prefix + bentuk_soal`, sehingga entri baru tetap terhitung.
- `DtoResponTagihanSiswa` sudah mengenali prefix `pg_kompleks` dari `ListBentukSoal`, jadi
  respon `"A,C"` terbaca kembali apa adanya.
- Kesimpulan: **tidak ada perubahan kontrak data**. Respon tetap satu string abjad terpisah koma.

### 2.5 Keterbatasan yang ditemukan (perlu keputusan)

1. **`PopoverPreviewSoalPgKoreksian` bersifat PG-tunggal**:
   - Menampilkan `Jawaban: {soal?.jawaban.join('')}` → untuk `pg_kompleks` isinya placeholder
     `"opsi 1opsi 3"`, bukan `"A,C"`.
   - Menampilkan `UbahKunciJawabanDiKoreksian` yang **hanya mendukung satu kunci**
     (`valid: [abjadToIndex]`, `jawaban: [kunciAbjad]`, opsi A–D). Jika dipakai untuk
     `pg_kompleks`, kunci multi-jawaban akan rusak.
2. `UbahKunciJawabanDiKoreksian` tidak bisa dipakai ulang untuk `pg_kompleks` tanpa perubahan
   besar (perlu multi-select).
3. `DtoResponTagihanSiswa.needValidasi` menganggap paket "tanpa validasi" hanya bila semua soal
   `pg`; paket dengan `pg_kompleks` akan tetap `needValidate: true` saat sumber respon siswa.
   Ini bukan target prompt (guru tetap bisa membuka koreksi), tetapi dicatat sebagai follow-up.
4. `template.data` sudah membawa `respon` untuk semua item pada alur "guru mengoreksi" maupun
   dari sheet, sehingga tidak perlu membuat entri baru dari nol pada mayoritas kasus.

---

## 3. Keputusan Desain

1. **Satu komponen baru**: `KoreksiPgKompleks.tsx` di
   `app/controllers/assesmen-penilaian/modals/fields/`.
   - Container merender `<ol className="list-decimal ...">` (nomor soal).
   - Tiap item dirender oleh subkomponen `KoreksiPgKompleksItem` (agar hook per item aman),
     berisi `<ol className="list-[upper-alpha] ...">` untuk opsi.
2. **Respon siswa tetap string abjad** (`"A,C"`) memakai `abjadListToIndexes` /
   `indexesToAbjadList`, konsisten dengan `FormPgKompleksOnline`.
3. **Skor dihitung dengan `hitungSkorPGK`** dari pilihan yang sedang aktif, lalu dikirim bersama
   respon lewat satu `handleUpdate`:
   ```ts
   handleUpdate('pg_kompleks', no_prefix, {
     respon: indexesToAbjadList(terpilih),
     skor: hitungSkorPGK(terpilih, opsi, valid),
   });
   ```
4. **Tidak memanggil `handleUpdate` saat render** (berbeda dari `KoreksiPgBody`). Skor awal
   disinkronkan sekali per item lewat `useEffect` + `useRef` guard, dan hanya bila
   `respon.skor !== skorHitung`. Alasannya:
   - menghindari warning "update saat render",
   - tetap memastikan skor PG kompleks masuk ke `updateRespon` (dan `skorKd`) tanpa guru harus
     mengklik apa pun,
   - guard `respon.skor === skorHitung` mencegah loop update.
5. **Input skor numerik manual** (0–100, clamp seperti `KoreksiEssay`/`KoreksiIsianSingkat`)
   disediakan. Nilai yang ditampilkan = `respon?.skor` (sumber kebenaran), sehingga override guru
   tidak langsung ditimpa oleh hasil hitung otomatis. Hitung otomatis hanya menulis ulang skor
   saat opsi di-toggle.
6. **Preview memakai komponen yang sudah ada**, dengan sedikit generalisasi:
   - `PopoverPreviewSoalPgKoreksian` diberi dua prop opsional:
     - `kunciTeks?: string` (default tetap `soal?.jawaban.join('')`),
     - `tampilkanUbahKunci?: boolean` (default `true`).
   - Untuk `pg_kompleks`: `kunciTeks={indexesToAbjadList(valid)}`,
     `tampilkanUbahKunci={false}`.
   - `ItemSoalPreview` sudah otomatis merender opsi `pg_kompleks` lewat `OpsiSoalPreview` →
     `PgKompleksPreview` (checkbox, tanpa status kunci), jadi tidak perlu komponen preview baru.
7. **Layout**: blok `pg_kompleks` memakai `md:col-span-2 col-span-1` (seperti `essay` /
   `isian_singkat`) karena opsi berupa list vertikal butuh lebar. Bila ingin benar-benar sama
   dengan `pg`, cukup ganti menjadi `col-span-1` — tidak memengaruhi logika.
8. **Tidak menambah library** dan **tidak mengubah tipe/DTO/domain**.

---

## 4. Rancangan Tampilan

```
Pilihan Ganda Kompleks
┌───────────────────────────────────────────────────────────────────────┐
│ 1.  Kunci: A,C      Respon: A,C      Skor [100]      [ Lihat Soal ]   │
│     a. [✓] Opsi A                                                     │
│     b. [ ] Opsi B                                                     │
│     c. [✓] Opsi C                                                     │
│     d. [ ] Opsi D                                                     │
│ 2.  Kunci: B        Respon: -        Skor [ 0 ]      [ Lihat Soal ]   │
│     a. [ ] ...                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

- `1.`, `2.` = `<ol>` parent (`list-decimal`), sejajar dengan `no_prefix` karena data sudah
  terurut per bentuk soal dan `no_prefix` selalu mulai 1.
- `a.`, `b.` = `<ol>` child (`list-[upper-alpha]`).
- Checkbox = respon siswa; toggle langsung memperbarui `respon` + `skor`.
- `Respon` ditampilkan sebagai teks abjad agar paritas dengan kolom Respon pada `pg`.
- Opsi dengan `content === ""` tidak dirender (sama seperti `FormPgKompleksOnline`).

---

## 5. Rancangan Kode (acuan implementasi)

### 5.1 `KoreksiPgKompleks.tsx` (baru)

```tsx
import { useEffect, useRef } from "react";
import { Input } from "~/components/ui/input";
import {
    abjadListToIndexes,
    hitungSkorPGK,
    indexesToAbjadList,
    type HandleUpdateResponKoreksi,
} from "~/domain/bank-soal/koreksi";
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type";
import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
import PopoverPreviewSoalPgKoreksian from "./popover-preview-soal-pg-koreksian";

const BENTUK_SOAL = "pg_kompleks";

export function KoreksiPgKompleks({
    template,
    handleUpdate,
}: {
    template: TemplateKoreksiSiswaType;
    handleUpdate: HandleUpdateResponKoreksi;
}) {
    return (
        <ol className="list-decimal list-outside ps-4 space-y-3">
            {template.data.map((item, index) => (
                <KoreksiPgKompleksItem
                    key={item.no_prefix}
                    item={item}
                    index={index}
                    handleUpdate={handleUpdate}
                />
            ))}
        </ol>
    );
}

function KoreksiPgKompleksItem({
    item,
    index,
    handleUpdate,
}: {
    item: DataTemplateKoreksiSiswa;
    index: number;
    handleUpdate: HandleUpdateResponKoreksi;
}) {
    const { soal, no_prefix, respon } = item;
    const alatJawab = soal?.json_alat_jawab as PgKompleksType | undefined;
    const opsi = alatJawab?.OpsiPilihanJawaban ?? [];
    const valid = alatJawab?.valid ?? [];

    const dipilih = abjadListToIndexes(respon?.respon);
    const skor = hitungSkorPGK(dipilih, opsi, valid);

    /** sinkronkan skor awal sekali per item, tanpa menimpa override manual guru */
    const sudahSinkron = useRef(false);
    useEffect(() => {
        if (sudahSinkron.current) return;
        sudahSinkron.current = true;
        if (respon?.skor === skor) return;
        handleUpdate(BENTUK_SOAL, no_prefix, { skor });
    }, [respon?.skor, skor, no_prefix, handleUpdate]);

    const handleToggle = (i: number) => {
        const berikut = dipilih.includes(i)
            ? dipilih.filter(x => x !== i)
            : [...dipilih, i];
        /** pertahankan indeks lain agar respon lama tidak hilang */
        const terpilih = [...new Set(berikut)].filter(x => x >= 0).sort((a, b) => a - b);

        handleUpdate(BENTUK_SOAL, no_prefix, {
            respon: indexesToAbjadList(terpilih),
            skor: hitungSkorPGK(terpilih, opsi, valid),
        });
    };

    return (
        <li className="border-b border-dashed pb-2">
            <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-semibold">Soal No. {no_prefix}</span>
                <span>Kunci: {indexesToAbjadList(valid) || "-"}</span>
                <span>Respon: {respon?.respon || "-"}</span>
                <label className="font-bold text-green-800" htmlFor={`${BENTUK_SOAL}_${no_prefix}`}>
                    Skor
                </label>
                <Input
                    id={`${BENTUK_SOAL}_${no_prefix}`}
                    className="min-w-15 bg-white dark:text-black"
                    type="number"
                    min={0}
                    max={100}
                    value={respon?.skor ?? ""}
                    onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === "") return;
                        const nilai = Number(raw);
                        if (Number.isNaN(nilai)) return;
                        handleUpdate(BENTUK_SOAL, no_prefix, {
                            skor: Math.min(100, Math.max(0, nilai)),
                        });
                    }}
                />
                <PopoverPreviewSoalPgKoreksian
                    soal={soal}
                    no_prefix={no_prefix}
                    index={index}
                    kunciTeks={indexesToAbjadList(valid)}
                    tampilkanUbahKunci={false}
                />
            </div>

            <ol className="list-[upper-alpha] list-outside ps-4">
                {opsi.map((o, i) =>
                    o.content !== "" ? (
                        <li
                            key={o.index + "_" + i}
                            className="flex gap-2 items-start align-top has-checked:bg-green-300"
                        >
                            <input
                                id={`${BENTUK_SOAL}_${no_prefix}_${i}`}
                                type="checkbox"
                                className="mt-1 size-4 shrink-0 accent-sky-700"
                                checked={dipilih.includes(i)}
                                onChange={() => handleToggle(i)}
                            />
                            <label
                                htmlFor={`${BENTUK_SOAL}_${no_prefix}_${i}`}
                                className="flex-1 cursor-pointer"
                            >
                                <div
                                    className="text-wrap editor-document"
                                    dangerouslySetInnerHTML={{ __html: o.content }}
                                />
                            </label>
                        </li>
                    ) : null
                )}
            </ol>
        </li>
    );
}
```

Catatan implementasi:
- Indeks checkbox memakai posisi `i` (bukan `o.index`), sama seperti `FormPgKompleksOnline`
  dan editor, sehingga abjad ↔ `valid` konsisten.
- `hitungSkorPGK` dipanggil dengan `opsi` utuh; fungsi tersebut yang memfilter opsi kosong.
- `valid` bertipe `number[]`; cast `json_alat_jawab` ke `PgKompleksType` mengikuti pola
  `FormPgKompleksOnline`.
- `index` untuk preview diambil dari posisi di `template.data`, sama seperti `KoreksiPgBody`.
- Kunci tampil dari `valid`, bukan `soal.jawaban` (placeholder).

### 5.2 `koreksi.tsx` (ubah)

```tsx
import { KoreksiPgKompleks } from "./KoreksiPgKompleks";

// di dalam switch:
case 'pg_kompleks':
    return (
        <div className="md:col-span-2 col-span-1 text-[10px]">
            <p className="text-base">{data.bentuk_soal.description}</p>
            <KoreksiPgKompleks template={data} handleUpdate={handleUpdate} />
        </div>
    );
```

Tidak ada perubahan pada `KoreksiWrapper`, `mergeResponLive`, `KoreksiItemSoal`, maupun
`HandleUpdateResponKoreksi`.

### 5.3 `popover-preview-soal-pg-koreksian.tsx` (ubah kecil)

```tsx
type Props = {
    no_prefix: number;
    index: number;
    soal?: BankSoalAppType;
    /** teks kunci yang ditampilkan; default perilaku pg: soal.jawaban.join('') */
    kunciTeks?: string;
    /** sembunyikan editor kunci untuk bentuk soal yang belum mendukung multi-kunci */
    tampilkanUbahKunci?: boolean;
};

// ...
<p className="border-t-2">
    Jawaban: {kunciTeks ?? soal?.jawaban.join('')}
</p>
// ...
{soal && tampilkanUbahKunci !== false && (
    <UbahKunciJawabanDiKoreksian dataSoal={soal} setOpen={(b) => setOpen(b)} />
)}
```

Default prop dipertahankan agar pemakaian `pg` tidak berubah.

---

## 6. Alur Data Setelah Perubahan

```
KoreksiItemSoal (updateRespon + skorKd)
        │  handleUpdate(bentuk_soal, no_prefix, { respon?, skor? })
        ▼
upsertRespon  ──►  state updateRespon (immer)
        │
        ▼
KoreksiWrapper.mergeResponLive  ──►  respon live per no_prefix
        │
        ▼
KoreksiPgKompleksItem
   ├─ checkbox toggle  ──► indexesToAbjadList + hitungSkorPGK ──► handleUpdate
   ├─ input skor       ──► clamp 0..100 ──► handleUpdate(skor)
   └─ effect sinkron   ──► hanya sekali, bila skor tersimpan ≠ skor hitung
        │
        ▼
SkorKdSebaranBuilder (skorKd)  ──►  DtoKoreksiToResponseSheet
   ├─ kolom pg_kompleks_<no> = "A,C"
   └─ kolom skor_<index>     = skor
```

---

## 7. Langkah Implementasi Bertahap

### Fase 1 — Komponen `KoreksiPgKompleks`

1. Buat `app/controllers/assesmen-penilaian/modals/fields/KoreksiPgKompleks.tsx`.
2. Implementasikan container + item sesuai rancangan bagian 5.1.
3. Pastikan hanya opsi `content !== ""` yang dirender.
4. Pastikan toggle mengirim `respon` + `skor` dalam satu patch.

**Kriteria selesai:** komponen bisa diimpor, tidak ada error tipe, list nomor soal + opsi
ber-checkbox tampil.

### Fase 2 — Daftarkan case di `koreksi.tsx`

1. Import `KoreksiPgKompleks`.
2. Tambah `case 'pg_kompleks'` sebelum `default`.
3. Gunakan wrapper layout `md:col-span-2 col-span-1` + judul `bentuk_soal.description`.

**Kriteria selesai:** membuka koreksi pada paket berisi `pg_kompleks` menampilkan blok koreksi
(sebelumnya kosong).

### Fase 3 — Preview soal `pg_kompleks`

1. Tambah prop opsional `kunciTeks` dan `tampilkanUbahKunci` pada
   `popover-preview-soal-pg-koreksian.tsx` dengan default perilaku lama.
2. Kirim `kunciTeks={indexesToAbjadList(valid)}` dan `tampilkanUbahKunci={false}` dari
   `KoreksiPgKompleksItem`.

**Kriteria selesai:** tombol "Lihat Soal" membuka preview berisi stimulus, pertanyaan, opsi
`pg_kompleks`, kunci `A,C`, dan pembahasan; tidak ada editor kunci tunggal.

### Fase 4 — Verifikasi

Lihat bagian 9.

---

## 8. Daftar File

**Baru**
- `app/controllers/assesmen-penilaian/modals/fields/KoreksiPgKompleks.tsx`

**Diubah**
- `app/controllers/assesmen-penilaian/modals/fields/koreksi.tsx`
  (import + `case 'pg_kompleks'`)
- `app/controllers/assesmen-penilaian/modals/fields/popover-preview-soal-pg-koreksian.tsx`
  (dua prop opsional; default tidak berubah)

**Tidak diubah (sengaja)**
- `app/domain/bank-soal/koreksi.ts` — helper sudah lengkap dan teruji.
- `KoreksiItemSoal.tsx`, `KoreksiWrapper`, `mergeResponLive`, `HandleUpdateResponKoreksi`.
- `DtoKoreksiToResponseSheet`, `DtoResponTagihanSiswa`, `SkorKdSebaranBuilder`,
  `RisponsePenilaianSiswa` — kontrak respon string tetap.
- `FormPgKompleksOnline`, `input-opsi-jawaban-online.tsx` (sisi siswa sudah selesai).

---

## 9. Verifikasi

**Otomatis**
1. `npm run typecheck`.
2. `npm run test:run -- tests/bank-soal/koreksi.test.ts` — memastikan helper yang dipakai
   (`abjadListToIndexes`, `indexesToAbjadList`, `hitungSkorPGK`, `upsertRespon`) tetap lulus.
   Tidak ada perubahan domain, jadi tidak perlu test baru untuk helper.
3. Tidak ada test komponen di repo saat ini (semua test di `tests/` bersifat domain), sehingga
   pengujian UI dilakukan manual.

**Manual (wajib, karena ini UI)**

Siapkan paket soal dengan 2+ soal `pg_kompleks`, kunci mis. `[0, 2]`, lalu:
1. Buka koreksi seorang siswa → blok "Pilihan Ganda Kompleks" tampil dengan daftar bernomor.
2. Opsi yang dijawab siswa (`respon` dari sheet, mis. `"A"`) tampil tercentang.
3. Centang opsi benar tambahan (`C`) → teks respon menjadi `"A,C"`, skor berubah menjadi 100.
4. Hapus centang `A` → respon `"C"`, skor 50.
5. Centang opsi salah (`B`) → skor turun, tidak pernah negatif.
6. Ubah input skor manual menjadi 80 → nilai bertahan (tidak langsung ditimpa hasil hitung).
7. Buka "Lihat Soal" → preview menampilkan opsi `pg_kompleks`, kunci `A,C`, tanpa editor kunci.
8. Klik Simpan → cek sheet: kolom `pg_kompleks_<no>` berisi `"A,C"` dan `skor_<index>` sesuai.
9. Muat ulang/tutup-buka modal → centang, respon, dan skor terpulihkan.
10. Pastikan siswa tanpa jawaban: respon `-`, skor 0, dan paket tetap bisa disimpan.

---

## 10. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| `handleUpdate` di `useEffect` memicu loop | Render berulang | Guard `useRef` sekali-per-item + cek `respon.skor === skorHitung` |
| Override skor manual tertimpa efek sinkron | Skor guru hilang | Efek hanya berjalan sekali saat mount; setelah itu input skor menjadi sumber kebenaran |
| `valid` menyimpan posisi, sedangkan `hitungSkorPGK` membandingkan `opsi.index` | Skor salah bila `index` tidak sama dengan posisi | Samakan dengan `FormPgKompleksOnline` (posisi `i`); alur editor saat ini selalu `index === posisi` |
| `json_alat_jawab` / `valid` tidak ada pada soal lama | Crash / skor 0 | Cast `PgKompleksType \| undefined`, fallback `opsi=[]`, `valid=[]` |
| Kunci multi-jawaban terhapus oleh `UbahKunciJawabanDiKoreksian` | Data kunci rusak | Sembunyikan editor kunci (`tampilkanUbahKunci={false}`) |
| `soal.jawaban` berisi placeholder `"opsi 1, opsi 3"` | Kunci tampil salah | Selalu tampilkan kunci dari `valid` via `indexesToAbjadList` |
| Opsi kosong ikut tampil/dihitung | Skor lebih kecil dari seharusnya | Filter `content !== ""` saat render; `hitungSkorPGK` sudah memfilter |
| Respon `"A,C"` tidak terbaca modul lain | Laporan menampilkan mentah | Format sama dengan sisi siswa & `KoreksiPgBody`; parsing terpusat di helper |
| Entri baru `upsertRespon` mengubah urutan `index` | Kolom `skor_<index>` bergeser | Hanya terjadi bila entri belum ada; `upsertRespon` memakai `max+1` dan `Dto` menulis berdasarkan `index` entri tersebut |

---

## 11. Di Luar Scope (Follow-up Terpisah)

1. **Ubah kunci jawaban `pg_kompleks` dari popover koreksi** — perlu editor multi-select
   (checkbox per opsi) yang menulis `valid` sebagai `number[]` dan `jawaban` sebagai abjad.
   Saat ini sengaja disembunyikan.
2. **`needValidasi`** di `app/dtos/dto-resspon-tagihan.ts` — masukkan `pg_kompleks`
   (dan `benar_salah`) sebagai bentuk soal auto-koreksi agar paket tidak selalu ditandai
   `needValidate: true`.
3. **Placeholder `jawaban` editor** (`fieldset-pg-kompleks.tsx`) — ganti
   `valid.map(m => 'opsi ' + (m+1))` menjadi `indexesToAbjadList(valid)` agar kisi-kisi dan
   popover lain konsisten tanpa perlu override `kunciTeks`.
4. **Layout `formatOpsi`** (`horizontal`/`square`/`table`) untuk `pg` dan `pg_kompleks` —
   keduanya masih selalu vertikal.
5. **Perbaikan `TemplateKoreksiSiswaBuilder`** — `find` respon tidak memakai `no_prefix`, dan
   properti `skor` yang dikembalikan tidak ada pada `DataTemplateKoreksiSiswa`. Saat ini
   tertutupi oleh `mergeResponLive`, tetapi rapuh bila builder dipakai di tempat lain.
   Di luar scope karena tidak diminta.
