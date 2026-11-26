import { describe, expect, it } from "vitest";
import {
    abjadListToIndexes,
    abjadToIndex,
    hitungSkorPGK,
    hitungSkorPgTunggal,
    indexToAbjad,
    indexesToAbjadList,
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

describe('abjadListToIndexes', () => {
    it('mengonversi daftar abjad menjadi indeks terurut', () => {
        expect(abjadListToIndexes('A,C')).toEqual([0, 2]);
        expect(abjadListToIndexes('a, c')).toEqual([0, 2]);
        expect(abjadListToIndexes('C,A')).toEqual([0, 2]);
    });

    it('menghilangkan duplikat dan bagian tidak valid', () => {
        expect(abjadListToIndexes('A,A,B')).toEqual([0, 1]);
        expect(abjadListToIndexes('A,1,,AB')).toEqual([0]);
    });

    it('mengembalikan array kosong untuk respon kosong', () => {
        expect(abjadListToIndexes('')).toEqual([]);
        expect(abjadListToIndexes(null)).toEqual([]);
        expect(abjadListToIndexes(undefined)).toEqual([]);
    });
});

describe('indexesToAbjadList', () => {
    it('mengonversi indeks menjadi abjad terurut tanpa spasi', () => {
        expect(indexesToAbjadList([2, 0])).toBe('A,C');
        expect(indexesToAbjadList([0, 1, 4])).toBe('A,B,E');
    });

    it('menghilangkan duplikat dan indeks negatif', () => {
        expect(indexesToAbjadList([0, 0, 2, -1])).toBe('A,C');
        expect(indexesToAbjadList([])).toBe('');
    });

    it('roundtrip dengan abjadListToIndexes', () => {
        expect(abjadListToIndexes(indexesToAbjadList([0, 2, 3]))).toEqual([0, 2, 3]);
    });
});

describe('hitungSkorPGK', () => {
    /** kunci benar A dan C */
    const opsi = [
        { index: 0, content: 'A' },
        { index: 1, content: 'B' },
        { index: 2, content: 'C' },
        { index: 3, content: 'D' },
    ];
    const kunci = [0, 2];

    it('skor 100 jika semua opsi benar dipilih', () => {
        expect(hitungSkorPGK([0, 2], opsi, kunci)).toBe(100);
    });

    it('skor parsial untuk sebagian opsi benar', () => {
        expect(hitungSkorPGK([0], opsi, kunci)).toBe(50);
        expect(hitungSkorPGK([2], opsi, kunci)).toBe(50);
    });

    it('skor 0 jika campuran benar dan salah seimbang', () => {
        expect(hitungSkorPGK([0, 1], opsi, kunci)).toBe(0);
    });

    it('tidak pernah negatif meskipun banyak opsi salah', () => {
        expect(hitungSkorPGK([1], opsi, kunci)).toBe(0);
        expect(hitungSkorPGK([1, 3], opsi, kunci)).toBe(0);
    });

    it('skor 0 jika tidak ada pilihan', () => {
        expect(hitungSkorPGK([], opsi, kunci)).toBe(0);
    });

    it('skor 0 jika kunci kosong atau tidak tersedia', () => {
        expect(hitungSkorPGK([0, 2], opsi, undefined)).toBe(0);
        expect(hitungSkorPGK([0, 2], opsi, null)).toBe(0);
        expect(hitungSkorPGK([0, 2], opsi, [])).toBe(0);
    });

    it('mengabaikan opsi yang tidak tampil (content kosong)', () => {
        const denganOpsiKosong = [
            { index: 0, content: 'A' },
            { index: 1, content: 'B' },
            { index: 2, content: '' },
            { index: 3, content: '' },
        ];
        expect(hitungSkorPGK([0], denganOpsiKosong, [0, 2])).toBe(100);
    });

    it('mengabaikan pilihan di luar opsi yang tampil', () => {
        expect(hitungSkorPGK([0, 99], opsi, kunci)).toBe(50);
    });

    it('menghormati skorMaksimal dan pembulatan 2 desimal', () => {
        expect(hitungSkorPGK([0], opsi, kunci, 50)).toBe(25);
        expect(hitungSkorPGK([0], opsi, [0, 2, 3])).toBe(33.33);
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
