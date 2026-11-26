# Rencana Implementasi — Bentuk Soal `pg_kompleks` di Halaman Soal Siswa

Dokumen ini adalah hasil analisis `prompt/fitur-pg-kompleks.md` terhadap kode yang ada saat ini
(branch `feature/pg-kompleks`), lalu diterjemahkan menjadi alur implementasi bertahap.
**Belum ada kode yang diubah**; dokumen ini hanya rencana.

---

## 1. Ringkasan Permintaan

| No | Permintaan | Kondisi saat ini |
|----|-----------|------------------|
| 1 | Tambah `case 'pg_kompleks'` di `InputOpsiJawabanOnline` agar soal dirender seperti `pg` / `isian_singkat` / `essay` | **Belum ada** case-nya → `default: null`, soal PG kompleks tidak tampil sama sekali |
| 2 | Pastikan `handleChange` (dari `examinator-page.tsx`) menerima respon & skor PG kompleks dengan benar | Signature `(field, value:string, skor:number)` hanya mendukung jawaban tunggal (`pg`) atau teks (`isian_singkat`/`essay`) |
| 3 | Gunakan fungsi skor yang sudah ada, `hitungSkorPGK` | Ada di `app/domain/bank-soal/koreksi.ts`, tetapi **belum diexport** dan **tipenya tidak cocok** dengan data soal nyata |

---

## 2. Temuan Kode Saat Ini

### 2.1 Alur render & state jawaban
- `app/controllers/respon-tagihan-siswa/preview-soal-online-siswa.tsx`
  - Menyusun `dataRespon` per soal dari `collectionRespon.find(s => s.index === globalIndex)`,
    dengan fallback objek `{ index, no_prefix, bentuk_soal, atp, soal_id, respon:null, skor:0 }`.
  - Meneruskan `handleChange` (yaitu `functionSetRespon` milik `examinator-page.tsx`) ke
    `FormITemSoalOnline`.
- `app/controllers/respon-tagihan-siswa/form-item-soal-online.tsx`
  - Menampilkan stimulus + pertanyaan, lalu `<InputOpsiJawabanOnline data={data.data_soal} ... />`.
- `app/controllers/respon-tagihan-siswa/input-opsi-jawaban-online.tsx`
  - `switch(data.bentuk_soal)` hanya menangani `'pg'` → `FormPgOnline`,
    `'isian_singkat'` dan `'essay'` → `FormIsianSingkat`; `default` → `null`.
  - `Props` mendefinisikan `handleChange: (field, value:string, skor:number) => void`.
- `app/controllers/respon-tagihan-siswa/FormPgOnline.tsx` (pola acuan)
  - Radio `hidden` + `<label>`; `checked={dataRespon.respon === String.fromCharCode(i + 65)}`.
  - Skor dihitung saat klik: `(json_alat_jawab as PgTunggalType).valid.includes(i) ? 100 : 0`,
    lalu `handleChange(dataRespon, abjad, skor)`.
  - `useCallback` untuk `handleCheck` dengan dependensi `[data?.json_alat_jawab, handleChange]`.
- `app/pages/siswa/examinitor-page.tsx`
  - `functionSetRespon`: cari entri `draft` berdasarkan `field.index`; jika ada, ganti dengan
    `{...field, respon:value, skor}`; jika belum, `push`; lalu `sort` berdasarkan `index`.
  - Skor per soal dipakai apa adanya oleh `BuildParanResponTagihanSiswa` saat submit
    (`sebaran['skor_'+index]`, `sebaran['<bentuk_soal>_<no_prefix>'] = respon`).
  - Artinya: **skor final PG kompleks harus sudah dihitung di sisi siswa**, karena kolom
    `skor_<index>` langsung dikirim ke sheet saat submit.

### 2.2 Struktur data PG kompleks
- `app/types/bank-soal/bentuk-soal/pg-kompleks-type.ts`
  - `PgKompleksType extends JsonAlatJawab { valid:number[] }`.
- `app/types/bank-soal/bentuk-soal/json-alat-jawab-type.ts`
  - `OpsiPilihanJawaban: { content:string; index:number }[]` — **tidak ada** `id` atau `isCorrect`.
  - `valid?: number | number[] | number[][]`.
- Editor (`fieldset-pg-kompleks.tsx`, `editor-pg-kompleks.tsx`)
  - `valid` berisi **indeks posisi opsi yang benar**, mis. `[0, 2]`.
  - Opsi yang belum diisi tetap dibuat (`content: ""`) dan tetap diberi `index`.
  - `jawaban` yang disimpan masih placeholder `valid.map(m => 'opsi ' + (m+1))`
    (bukan abjad). Jadi **skor tidak boleh dihitung dari `jawaban`**, harus dari
    `json_alat_jawab.valid` + `OpsiPilihanJawaban`.
- `FormPgOnline` memakai indeks posisi `i` (bukan `m.index`) untuk abjad A/B/C dan untuk
  `valid.includes(i)`. Editor juga menyimpan `valid` berdasarkan posisi. Karena itu
  **identitas opsi untuk PG kompleks sebaiknya juga posisi (`i`)**, konsisten dengan PG tunggal.

### 2.3 Fungsi skor yang ada
`app/domain/bank-soal/koreksi.ts`, `hitungSkorPGK` (baris ±103–136):

```ts
interface OpsiJawaban { id:number; isCorrect:boolean }

function hitungSkorPGK(
  opsiDipilihSiswa:number[],
  semuaOpsiSoal:OpsiJawaban[],
  skorMaksimal = 100
): number
```

Masalah yang harus diselesaikan sebelum dipakai:
1. **Tidak diexport** → tidak bisa diimpor komponen.
2. **Tipe tidak cocok**: data nyata `OpsiPilihanJawabanType` punya `index` + `content`, bukan
   `id` + `isCorrect`. Kunci benar ada di `json_alat_jawab.valid: number[]`.
3. Opsi ber-`content` kosong ikut dihitung sebagai pengecoh, padahal `FormPgOnline`
   tidak merendernya. Jika tidak difilter, siswa bisa terkena penalti karena opsi yang
   tidak pernah ia lihat.
4. Nama fungsi tidak konsisten dengan `hitungSkorPgTunggal` (PGK vs PgTunggal), tetapi
   **nama dipertahankan** agar sesuai permintaan.

### 2.4 Format respon yang tersimpan
- Satu soal = satu nilai string di sheet: `pg_kompleks_<no_prefix>`.
- `DtoResponTagihanSiswa.creatResponAppFromSheet` membaca string itu apa adanya menjadi
  `respon`.
- Belum ada konvensi jawaban ganda di repo. Konvensi yang paling konsisten dengan kode yang ada
  adalah **daftar abjad dipisah koma tanpa spasi, terurut**, mis. `"A,C"`:
  - selaras dengan `valid.map(m => String.fromCharCode(m + 65)).join(',')` di `KoreksiPgBody.tsx`,
  - selaras dengan `jawaban.join(', ')` di kisi-kisi,
  - tetap satu string sehingga tidak mengubah kontrak `RisponsePenilaianSiswa.respon`
    maupun `BuildParanResponTagihanSiswa`.
- Konsekuensi: pembacaan kembali (reload halaman / kolom sheet yang sudah terisi) harus
  men-parse string ini, bukan membandingkan dengan satu huruf.

### 2.5 Dampak di luar komponen siswa (perlu dicatat, bukan target utama)
- `app/controllers/assesmen-penilaian/modals/fields/koreksi.tsx`
  - `SwitchFieldKoreksiByBentukSoal` hanya punya case `pg`, `essay`, `isian_singkat` →
    blok koreksi untuk `pg_kompleks` **tidak tampil** saat guru mengoreksi.
- `app/dtos/dto-resspon-tagihan.ts` (`needValidasi`)
  - `bentukSoal.every(s => s === 'pg')` → paket berisi `pg_kompleks` akan ditandai
    `needValidate: true` meskipun PG kompleks auto-koreksi.
- Keduanya **tidak diminta** pada prompt ini; dicantumkan agar tidak menganggap fitur
  “selesai penuh” setelah halaman siswa jalan.

---

## 3. Keputusan Desain

1. **Komponen baru `FormPgKompleksOnline.tsx`** di folder yang sama, mengikuti pola
   `FormPgOnline.tsx` (checkbox, bukan radio), lalu didaftarkan sebagai `case 'pg_kompleks'`
   di `InputOpsiJawabanOnline`.
2. **Respon tetap `string`**: serialisasi abjad terpilih (`"A,C"`), bukan JSON array.
   Alasan: kontrak `handleChange`, `RisponsePenilaianSiswa.respon`, dan penulisan sheet
   tidak perlu diubah; laporan yang sudah ada membaca string.
3. **Helper murni ditempatkan di `app/domain/bank-soal/koreksi.ts`**, bukan di komponen:
   - `abjadListToIndexes(respon)` → `number[]` (normalisasi huruf kecil, spasi, urut, unik),
   - `indexesToAbjadList(indexes)` → `string` (`"A,C"`),
   - `hitungSkorPGK(opsiDipilih, semuaOpsi, kunciValid, skorMaksimal?)` → `number`
     (di-export, tipe disesuaikan data nyata, rumus dipertahankan).
4. **Skor dihitung dari state pilihan hasil toggle**, bukan hasil parsing ulang string,
   agar tidak ada rounding/urutan yang memengaruhi hasil.
5. **Komponen bersifat controlled** (membaca `dataRespon.respon` langsung tiap render),
   seperti `FormPgOnline`; tanpa local state agar tidak perlu sinkronisasi `useEffect`.
6. **Opsi kosong (`content === ""`) tidak dirender dan tidak dihitung** dalam skor,
   konsisten dengan perilaku `pg`.
7. **Jangan menambah library baru.** Semua kebutuhan sudah tersedia di repo.

---

## 4. Kontrak Fungsi Baru (`app/domain/bank-soal/koreksi.ts`)

```ts
import type { OpsiPilihanJawabanType } from "~/types/bank-soal/bentuk-soal/json-alat-jawab-type";

/** "A,C" / "a, c" / "" / null -> [0, 2] (urut, unik) */
export function abjadListToIndexes(respon: string | null | undefined): number[];

/** [2, 0] -> "A,C" (urut, unik) */
export function indexesToAbjadList(indexes: number[]): string;

/**
 * Skor PG Kompleks (rumus lama dipertahankan):
 * proporsiBenar = userBenar / totalBenar
 * proporsiSalah = userSalah / totalSalah
 * skor = max(0, round((proporsiBenar - proporsiSalah) * skorMaksimal, 2))
 *
 * - totalBenar/totalSalah dihitung dari opsi yang tampil (content !== "") 
 *   dan irisan dengan kunci `valid`.
 * - pilihan siswa di luar opsi yang tampil diabaikan.
 * - kunci kosong -> 0.
 */
export function hitungSkorPGK(
  opsiDipilih: number[],
  semuaOpsi: Pick<OpsiPilihanJawabanType, "index" | "content">[],
  kunciValid: number[] | undefined | null,
  skorMaksimal?: number
): number;
```

Contoh hasil yang diharapkan (kunci `[0, 2]`, 4 opsi terisi):

| Pilihan siswa | Perhitungan | Skor |
|---|---|---|
| A, C | (2/2 − 0/2) × 100 | 100 |
| A | (1/2 − 0/2) × 100 | 50 |
| A, B | (1/2 − 1/2) × 100 | 0 |
| B | (0/2 − 1/2) × 100 → clamp | 0 |
| (kosong) | (0 − 0) × 100 | 0 |

---

## 5. Alur Implementasi Bertahap

### Fase 1 — Helper skor & serialisasi (`app/domain/bank-soal/koreksi.ts`)

1. Tambahkan `abjadListToIndexes` dan `indexesToAbjadList`.
   - Reuse `abjadToIndex` / `indexToAbjad` yang sudah ada.
   - `abjadToIndex` mengembalikan `-1` untuk input tidak valid → filter nilai `-1`.
   - Sort ascending + `Set` untuk unik.
2. Ubah `hitungSkorPGK`:
   - `export` fungsi.
   - Ganti parameter `semuaOpsiSoal: OpsiJawaban[]` menjadi
     `Pick<OpsiPilihanJawabanType, "index" | "content">[]` dan tambahkan `kunciValid`.
   - Turunkan `isCorrect` secara internal: `kunciValid.includes(opsi.index)`.
   - Filter opsi `content === ""` sebelum menghitung total benar/salah.
   - Pertahankan rumus, `Math.max(0, ...)`, dan pembulatan 2 desimal.
   - Guard: `!kunciValid || kunciValid.length === 0` → `return 0`.
   - Hapus interface `OpsiJawaban` lama bila tidak ada pemakai lain
     (saat ini hanya dipakai fungsi ini).
3. Tidak mengubah `hitungSkorPgTunggal`, `upsertRespon`, maupun `HandleUpdateResponKoreksi`.

**Kriteria selesai:** fungsi bisa diimpor; `npm run typecheck` lulus.

---

### Fase 2 — Komponen `FormPgKompleksOnline`

**File baru:** `app/controllers/respon-tagihan-siswa/FormPgKompleksOnline.tsx`

Struktur mengikuti `FormPgOnline.tsx`:

```tsx
export function FormPgKompleksOnline({ data, no_prefix, dataRespon, handleChange }: Props) {
    const alatJawab = data.json_alat_jawab as PgKompleksType | undefined;
    const opsi = alatJawab?.OpsiPilihanJawaban ?? [];

    const dipilih = abjadListToIndexes(dataRespon.respon); // number[]

    const handleToggle = useCallback((i: number) => {
        const berikut = dipilih.includes(i)
            ? dipilih.filter(x => x !== i)
            : [...dipilih, i];

        const terpilih = [...berikut].sort((a, b) => a - b);
        const skor = hitungSkorPGK(terpilih, opsi, alatJawab?.valid as number[] | undefined);
        handleChange(dataRespon, indexesToAbjadList(terpilih), skor);
    }, [dataRespon, dipilih, opsi, alatJawab?.valid, handleChange]);

    return (
        <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
            {opsi.map((m, i) => m.content !== "" && (
                <li
                    key={m.index + "_" + i}
                    className="align-top ps-2 has-checked:bg-green-300"
                >
                    <input
                        id={data.bentuk_soal + "_" + no_prefix + "_" + i}
                        className="hidden"
                        checked={dipilih.includes(i)}
                        type="checkbox"
                        name={data.bentuk_soal + "_" + no_prefix}
                        onChange={() => handleToggle(i)}
                    />
                    <label htmlFor={data.bentuk_soal + "_" + no_prefix + "_" + i}>
                        <div
                            className="text-wrap editor-document"
                            dangerouslySetInnerHTML={{ __html: m.content }}
                        />
                    </label>
                </li>
            ))}
        </ol>
    );
}
```

Catatan implementasi:
- `checked` memakai `dipilih.includes(i)`, bukan perbandingan string tunggal.
- `dipilih` boleh berisi indeks opsi tak terlihat (mis. dari sheet lama); tidak dirender,
  tetapi tetap dikirim kembali lewat `indexesToAbjadList` agar jawaban tidak hilang saat
  siswa mencentang opsi lain. Alternatif yang dipilih: **pertahankan** indeks tersebut.
- `handleChange` menerima objek `dataRespon` (bukan salinan baru), sama seperti `pg`.
- Tidak perlu merender ulang skor; `dataRespon.skor` dipakai hanya sebagai nilai awal di
  `PreviewSoalOnline` dan akan ditimpa setiap toggle.
- Jangan memakai `has-checked:after:...` seperti `pg`; checkbox sudah terlihat sebagai kotak
  centang kecil di dalam `label`, cukup penanda latar saat terpilih
  (detail styling boleh disamakan dengan `PgKompleksPreview` di
  `app/controllers/koleksi-bank-soal/views/pg-kompleks-view.tsx`).

**Kriteria selesai:** soal `pg_kompleks` tampil dengan checkbox; klik mencentang/meniadakan
dan state bertahan saat komponen dirender ulang.

---

### Fase 3 — Daftarkan case di `InputOpsiJawabanOnline`

**File diubah:** `app/controllers/respon-tagihan-siswa/input-opsi-jawaban-online.tsx`

```tsx
import { FormPgKompleksOnline } from "./FormPgKompleksOnline";

// di dalam switch:
case 'pg_kompleks':
    return <FormPgKompleksOnline data={data} no_prefix={no_prefix}
                                 dataRespon={dataRespon} handleChange={handleChange}/>;
```

- Tidak ada perubahan pada `Props`, `FormITemSoalOnline`, `PreviewSoalOnline`,
  atau `examinator-page.tsx` — alur `handleChange` yang ada sudah cukup.
- `essay` tetap memakai `FormIsianSingkat` (perilaku sekarang).

**Kriteria selesai:** tidak ada `default: null` yang tereksekusi untuk `pg_kompleks`.

---

### Fase 4 — Verifikasi

**Otomatis**
1. `npm run typecheck` (`react-router typegen && tsc`).
2. Unit test untuk helper baru di `tests/bank-soal/koreksi.test.ts`
   (file test domain koreksi sudah ada; tambah `describe` untuk fungsi baru):
   - `abjadListToIndexes`: `"A,C"` → `[0,2]`; `"a, c"` → `[0,2]`; `""` / `null` → `[]`;
     input tidak valid diabaikan; hasil urut & unik.
   - `indexesToAbjadList`: `[2,0]` → `"A,C"`; `[]` → `""`.
   - `hitungSkorPGK`: tabel contoh pada bagian 4, kunci kosong → 0, opsi kosong tidak
     dihitung, nilai tidak pernah negatif, hasil maksimal 100.
3. `npm run test:run -- tests/bank-soal/koreksi.test.ts`.

**Manual (dibutuhkan karena ini komponen UI)**
1. Paket soal berisi `pg_kompleks` → soal tampil dengan daftar opsi ber-checkbox.
2. Centang 1 opsi benar → skor parsial (mis. 50); centang semua benar → 100.
3. Centang opsi salah → skor turun dan tidak negatif.
4. Hapus semua centang → respon kosong, skor 0.
5. Submit → periksa nilai sheet: kolom `pg_kompleks_<no>` berisi `"A,C"` dan
   `skor_<index>` berisi angka yang sama dengan tampilan.
6. Muat ulang halaman dengan respon yang sudah ada → centang terpulihkan.

---

## 6. Daftar File

**Baru**
- `app/controllers/respon-tagihan-siswa/FormPgKompleksOnline.tsx`

**Diubah**
- `app/controllers/respon-tagihan-siswa/input-opsi-jawaban-online.tsx` (tambah case + import)
- `app/domain/bank-soal/koreksi.ts` (export & sesuaikan `hitungSkorPGK`, tambah helper
  serialisasi/parsing abjad)
- `tests/bank-soal/koreksi.test.ts` (test helper baru)

**Tidak diubah (sengaja)**
- `preview-soal-online-siswa.tsx`, `form-item-soal-online.tsx`, `examinator-page.tsx`
- `RisponsePenilaianSiswa`, `BuildParanResponTagihanSiswa`, `DtoResponTagihanSiswa`
  — kontrak respon tetap string.

---

## 7. Urutan Pengerjaan & Dependensi

```
Fase 1 (koreksi.ts: helper + hitungSkorPGK)
        │
        ├──► Fase 2 (FormPgKompleksOnline)
        │            │
        │            └──► Fase 3 (case di InputOpsiJawabanOnline) ──► Fase 4 (verifikasi)
        └──► unit test helper (bagian Fase 4)
```

---

## 8. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| `json_alat_jawab` / `valid` tidak ada pada soal lama | Skor selalu 0 / crash saat `.includes` | Cast `PgKompleksType \| undefined`, guard `valid ?? []`; `hitungSkorPGK` mengembalikan 0 untuk kunci kosong |
| `valid` menyimpan indeks posisi, opsi memakai `m.index` yang bisa tidak berurutan | Salah memetakan abjad ↔ kunci | Gunakan indeks posisi `i` di komponen, konsisten dengan `FormPgOnline` dan editor |
| Opsi kosong (`content === ""`) ikut dihitung | Skor parsial terlalu kecil | Filter `content !== ""` baik saat render maupun saat hitung skor |
| Jawaban `"A,C"` tidak terbaca modul lain | Guru/laporan menampilkan respon mentah | Sudah menjadi format tampilan kunci di `KoreksiPgBody`; parsing terpusat di `abjadListToIndexes` |
| Perubahan `hitungSkorPGK` memecah pemakai lama | Build gagal | Saat ini fungsi privat tanpa pemakai; verifikasi dengan pencarian `hitungSkorPGK` sebelum mengubah |
| Guru tidak bisa mengoreksi ulang `pg_kompleks` | Koreksi guru mengabaikan soal ini | Di luar scope; catat sebagai follow-up (tambah case di `koreksi.tsx` + `needValidasi`) |

---

## 9. Di Luar Scope (Follow-up Terpisah)

1. **Koreksi guru**: tambah `case 'pg_kompleks'` di
   `app/controllers/assesmen-penilaian/modals/fields/koreksi.tsx` beserta tabel koreksi
   (checkbox per opsi, skor otomatis dari `hitungSkorPGK`).
2. **`needValidasi`**: `app/dtos/dto-resspon-tagihan.ts` menganggap paket “auto” hanya bila
   semua soal `pg`; perlu memasukkan `pg_kompleks` (dan `benar_salah`) sebagai auto-koreksi.
3. **`jawaban` placeholder** di editor (`valid.map(m => 'opsi ' + (m+1))`): kisi-kisi
   menampilkan “opsi 1, opsi 3”, seharusnya abjad (`"A,C"`). Bila dirapikan, gunakan
   `indexesToAbjadList` agar satu sumber kebenaran.
4. **Format opsi** (`formatOpsi: 'horizontal' | 'square' | 'table'`) belum didukung baik oleh
   `pg` maupun `pg_kompleks`; keduanya selalu vertikal.
