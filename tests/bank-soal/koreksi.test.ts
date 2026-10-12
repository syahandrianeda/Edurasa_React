import { describe, expect, it } from "vitest";
import {
    abjadToIndex,
    hitungSkorPgTunggal,
    indexToAbjad,
    upsertRespon,
} from "~/domain/bank-soal/koreksi";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";

/** factory entri respon untuk keperluan test */
const buatRespon = (over: Partial<RisponsePenilaianSiswa>): RisponsePenilaianSiswa => ({
    index: 0,
    respon: null,
    no_prefix: 1,
    bentuk_soal: 'pg',
    soal: undefined as any,
    soal_id: undefined as any,
    atp: undefined as any,
    ...over,
});

describe('abjadToIndex', () => {
    it('mengonversi abjad kapital ke indeks 0-based', () => {
        expect(abjadToIndex('A')).toBe(0);
        expect(abjadToIndex('B')).toBe(1);
        expect(abjadToIndex('C')).toBe(2);
        expect(abjadToIndex('D')).toBe(3);
        expect(abjadToIndex('E')).toBe(4);
    });

    it('mengonversi abjad kecil (dinormalisasi)', () => {
        expect(abjadToIndex('a')).toBe(0);
        expect(abjadToIndex('d')).toBe(3);
    });

    it('mengabaikan spasi di sekitar abjad', () => {
        expect(abjadToIndex('  C  ')).toBe(2);
    });

    it('mengembalikan -1 untuk input tidak valid', () => {
        expect(abjadToIndex('')).toBe(-1);
        expect(abjadToIndex('AB')).toBe(-1);
        expect(abjadToIndex('1')).toBe(-1);
        expect(abjadToIndex('ab')).toBe(-1);
    });
});

describe('indexToAbjad', () => {
    it('mengonversi indeks 0-based ke abjad', () => {
        expect(indexToAbjad(0)).toBe('A');
        expect(indexToAbjad(1)).toBe('B');
        expect(indexToAbjad(4)).toBe('E');
    });

    it('roundtrip dengan abjadToIndex', () => {
        for (let i = 0; i <= 4; i++) {
            expect(abjadToIndex(indexToAbjad(i))).toBe(i);
        }
    });
});

describe('hitungSkorPgTunggal', () => {
    it('skor 100 jika pilihan ada di kunci (valid)', () => {
        expect(hitungSkorPgTunggal([0], 0)).toBe(100);
        expect(hitungSkorPgTunggal([2], 2)).toBe(100);
        expect(hitungSkorPgTunggal([1, 2], 2)).toBe(100);
    });

    it('skor 0 jika pilihan tidak ada di kunci', () => {
        expect(hitungSkorPgTunggal([0], 1)).toBe(0);
        expect(hitungSkorPgTunggal([1], 3)).toBe(0);
    });

    it('skor 0 jika pilihan di luar rentang (termasuk -1 dari abjad tidak valid)', () => {
        expect(hitungSkorPgTunggal([0], -1)).toBe(0);
        expect(hitungSkorPgTunggal([0], 99)).toBe(0);
    });

    it('skor 0 jika kunci kosong atau tidak tersedia', () => {
        expect(hitungSkorPgTunggal(undefined, 0)).toBe(0);
        expect(hitungSkorPgTunggal(null, 0)).toBe(0);
        expect(hitungSkorPgTunggal([], 0)).toBe(0);
    });
});

describe('upsertRespon', () => {
    it('mengupdate entri yang cocok berdasarkan bentuk_soal + no_prefix (kasus pg: respon + skor)', () => {
        const draft: RisponsePenilaianSiswa[] = [
            buatRespon({ index: 0, no_prefix: 1, bentuk_soal: 'pg', respon: 'B', skor: 0 }),
            buatRespon({ index: 1, no_prefix: 2, bentuk_soal: 'pg', respon: 'C', skor: 0 }),
        ];

        upsertRespon(draft, { bentuk_soal: 'pg', no_prefix: 2 }, { respon: 'A', skor: 100 });

        expect(draft).toHaveLength(2);
        expect(draft[1]).toMatchObject({ index: 1, no_prefix: 2, bentuk_soal: 'pg', respon: 'A', skor: 100 });
        // entri lain tidak ikut berubah
        expect(draft[0]).toMatchObject({ respon: 'B', skor: 0 });
    });

    it('hanya mengubah skor untuk isian_singkat/essay, respon sumber tidak disentuh', () => {
        const draft: RisponsePenilaianSiswa[] = [
            buatRespon({ index: 0, bentuk_soal: 'essay', no_prefix: 1, respon: 'Jawaban siswa', skor: undefined }),
        ];

        upsertRespon(draft, { bentuk_soal: 'essay', no_prefix: 1 }, { skor: 85 });

        expect(draft).toHaveLength(1);
        expect(draft[0].respon).toBe('Jawaban siswa');
        expect(draft[0].skor).toBe(85);
    });

    it('hanya mengubah respon tanpa menyentuh skor jika patch hanya respon', () => {
        const draft: RisponsePenilaianSiswa[] = [
            buatRespon({ index: 0, bentuk_soal: 'pg', no_prefix: 1, respon: 'A', skor: 100 }),
        ];

        upsertRespon(draft, { bentuk_soal: 'pg', no_prefix: 1 }, { respon: 'D' });

        expect(draft[0].respon).toBe('D');
        expect(draft[0].skor).toBe(100);
    });

    it('push entri baru jika belum ada (siswa tidak menjawab), index = max+1', () => {
        const draft: RisponsePenilaianSiswa[] = [
            buatRespon({ index: 0, bentuk_soal: 'pg', no_prefix: 1, respon: 'A', skor: 100 }),
            buatRespon({ index: 3, bentuk_soal: 'isian_singkat', no_prefix: 1, respon: 'isi' }),
        ];

        upsertRespon(draft, { bentuk_soal: 'pg', no_prefix: 2 }, { respon: 'C', skor: 0 });

        expect(draft).toHaveLength(3);
        expect(draft[2]).toMatchObject({
            index: 4, // max index (3) + 1
            bentuk_soal: 'pg',
            no_prefix: 2,
            respon: 'C',
            skor: 0,
        });
    });

    it('push entri baru dengan index 0 jika draft masih kosong', () => {
        const draft: RisponsePenilaianSiswa[] = [];

        upsertRespon(draft, { bentuk_soal: 'pg', no_prefix: 1 }, { respon: 'B', skor: 100 });

        expect(draft).toHaveLength(1);
        expect(draft[0]).toMatchObject({ index: 0, bentuk_soal: 'pg', no_prefix: 1, respon: 'B', skor: 100 });
    });

    it('entri baru tanpa patch respon memiliki respon null', () => {
        const draft: RisponsePenilaianSiswa[] = [];

        upsertRespon(draft, { bentuk_soal: 'isian_singkat', no_prefix: 1 }, { skor: 70 });

        expect(draft[0].respon).toBeNull();
        expect(draft[0].skor).toBe(70);
    });

    it('tidak melakukan apa pun jika patch kosong', () => {
        const draft: RisponsePenilaianSiswa[] = [
            buatRespon({ index: 0, bentuk_soal: 'pg', no_prefix: 1, respon: 'A', skor: 100 }),
        ];
        const snapshot = JSON.parse(JSON.stringify(draft));

        upsertRespon(draft, { bentuk_soal: 'pg', no_prefix: 1 }, {});

        expect(draft).toEqual(snapshot);
    });

    it('tidak menambah entri baru jika patch kosong padahal entri tidak ada', () => {
        const draft: RisponsePenilaianSiswa[] = [];

        upsertRespon(draft, { bentuk_soal: 'pg', no_prefix: 1 }, {});

        expect(draft).toHaveLength(0);
    });
});
