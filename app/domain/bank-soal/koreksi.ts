import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";

interface OpsiJawaban {
  id: number;
  isCorrect: boolean; // true jika ini jawaban yang benar, false jika pengecoh
}

/** ===== Koreksi Pilihan Ganda Tunggal ===== */

/**
 * Konversi abjad opsi ('A'..'Z') menjadi indeks 0-based.
 * Kebalikan dari `String.fromCharCode(opsi.index + 65)`.
 * @returns indeks 0-based, atau -1 jika bukan abjad tunggal yang valid.
 */
export function abjadToIndex(abjad: string): number {
    const normalized = abjad?.trim().toUpperCase() ?? '';
    if (!/^[A-Z]$/.test(normalized)) return -1;
    return normalized.charCodeAt(0) - 65;
}

/**
 * Konversi indeks opsi 0-based menjadi abjad ('A'..'Z').
 * Kebalikan dari `abjadToIndex`.
 */
export function indexToAbjad(index: number): string {
    return String.fromCharCode(index + 65);
}

/**
 * Skor Pilihan Ganda Tunggal berdasarkan kunci jawaban `json_alat_jawab.valid`.
 * `valid` berisi indeks opsi yang benar (bentuk soal `pg`, rentang 0-4, contoh: `[0]`).
 * @returns 100 jika `pilihanIndex` termasuk kunci, selain itu 0.
 */
export function hitungSkorPgTunggal(valid: number[] | undefined | null, pilihanIndex: number): 0 | 100 {
    if (!valid || valid.length === 0) return 0;
    return valid.includes(pilihanIndex) ? 100 : 0;
}

/** ===== Upsert Respon Siswa (untuk immer draft) ===== */

/** Perubahan sebagian data respon siswa saat koreksi. */
export interface PatchResponKoreksi {
    /** abjad jawaban pg (contoh: 'A'), tidak diubah untuk isian_singkat/essay */
    respon?: string;
    /** skor hasil koreksi (0-100), satu-satunya yang diubah untuk isian_singkat/essay */
    skor?: number;
}

/** Kunci pencarian entri respon: kombinasi bentuk soal + nomor urut soal. */
export interface KunciResponKoreksi {
    bentuk_soal: string;
    no_prefix: number;
}

/** Signature callback handler koreksi yang diteruskan ke komponen child. */
export type HandleUpdateResponKoreksi = (
    bentuk_soal: string,
    no_prefix: number,
    patch: PatchResponKoreksi
) => void;

/**
 * Mutasi draft (immer): update entri `RisponsePenilaianSiswa` yang cocok
 * dengan `bentuk_soal + no_prefix`, atau push entri baru jika belum ada
 * (siswa tidak menjawab soal tersebut).
 *
 * Aturan `index` entri baru: max(index yang ada) + 1, karena kolom skor
 * pada sheet dipetakan by `index` (lihat BuildParanResponTagihanSiswa).
 */
export function upsertRespon(
    draft: RisponsePenilaianSiswa[],
    kunci: KunciResponKoreksi,
    patch: PatchResponKoreksi
): void {
    const adaPatch = patch.respon !== undefined || patch.skor !== undefined;
    if (!adaPatch) return;

    const idx = draft.findIndex(s => s.bentuk_soal === kunci.bentuk_soal && s.no_prefix === kunci.no_prefix);

    if (idx > -1) {
        if (patch.respon !== undefined) draft[idx].respon = patch.respon;
        if (patch.skor !== undefined) draft[idx].skor = patch.skor;
        return;
    }

    const maxIndex = draft.reduce(
        (max, item) => (typeof item.index === 'number' && item.index > max ? item.index : max),
        -1
    );
    draft.push({
        ...draft[idx],
        index: maxIndex + 1,
        respon: patch.respon ?? null,
        no_prefix: kunci.no_prefix,
        bentuk_soal: kunci.bentuk_soal,
        skor: patch.skor,
        
    });
}

/**
 * Helper untuk menghitung skor Pilihan Ganda Kompleks
 * @param opsiDipilihSiswa - Array ID opsi yang diceklis oleh siswa
 * @param semuaOpsiSoal - Array semua objek opsi yang ada pada soal tersebut
 * @param skorMaksimal - Total skor jika benar semua (default 100)
 */
function hitungSkorPGK(
    opsiDipilihSiswa: number[],
    semuaOpsiSoal: OpsiJawaban[],
    skorMaksimal: number = 100
    ): number {
    // 1. Hitung total opsi yang benar dan salah berdasarkan kunci jawaban
    const totalBenar = semuaOpsiSoal.filter(o => o.isCorrect).length;
    const totalSalah = semuaOpsiSoal.filter(o => !o.isCorrect).length;

    let userBenar = 0;
    let userSalah = 0;

    // 2. Hitung apa saja yang diceklis oleh siswa
    opsiDipilihSiswa.forEach(id => {
        const opsi = semuaOpsiSoal.find(o => o.id === id);
        if (opsi) {
        if (opsi.isCorrect) {
            userBenar++;
        } else {
            userSalah++;
        }
        }
    });

    // 3. Hitung proporsi (mencegah pembagian dengan angka 0 jika soal tidak valid)
    const proporsiBenar = totalBenar > 0 ? userBenar / totalBenar : 0;
    const proporsiSalah = totalSalah > 0 ? userSalah / totalSalah : 0;

    // 4. Kalkulasi Skor Akhir dengan batasan minimal 0
    const skorAkhir = (proporsiBenar - proporsiSalah) * skorMaksimal;
    
    // Bulatkan hasil ke 2 angka di belakang koma
    return Math.max(0, Math.round(skorAkhir * 100) / 100);
}