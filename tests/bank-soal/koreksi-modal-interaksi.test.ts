import { beforeAll, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import ModalProvider from "~/components/modals/modal-provider";
import { FormEdura } from "~/components/form-custom/form-edura";
import KoreksiItemSoal from "~/controllers/assesmen-penilaian/modals/koreksi-item-soal";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";

/**
 * Uji interaksi alur koreksi: PRA KOREKSI SOAL -> Koreksi -> radio PG & input skor essay/isian.
 * Komponen asli KoreksiItemSoal dirender di dalam ModalProvider + FormEdura yang sebenarnya.
 */

/** jsdom tidak memiliki ResizeObserver (dipakai useSyncedTableScroll -> react-resize-detector) */
beforeAll(() => {
    if (!("ResizeObserver" in globalThis)) {
        class ResizeObserverStub {
            observe() {}
            unobserve() {}
            disconnect() {}
        }
        (globalThis as { ResizeObserver?: unknown }).ResizeObserver = ResizeObserverStub;
    }
});

const buatBentukSoal = (name: string, description: string, way_correction: ListBentukSoalType['way_correction']): ListBentukSoalType =>
    ({ name, description, way_correction });

const buatSoal = (bentuk: string, idbaris: number): BankSoalAppType => ({
    idbaris,
    bentuk_soal: bentuk,
    stimulus: 'stimulus ' + bentuk,
    pertanyaan: 'pertanyaan ' + bentuk,
    pembahasan_penskoran: 'pembahasan',
    jawaban: bentuk === 'pg' ? ['B'] : [],
    /** kunci pg = opsi indeks 1 (abjad 'B') */
    json_alat_jawab: bentuk === 'pg' ? {
        OpsiPilihanJawaban: [0, 1, 2, 3].map(i => ({ index: i, content: 'opsi ' + String.fromCharCode(i + 65) })),
        formatOpsi: 'vertical',
        valid: [1],
    } : undefined,
    auto_koreksi: 'auto',
    status: 'aktif',
    oleh: '',
    refrensi: '',
} as unknown as BankSoalAppType);

const buatFixture = (): detailNilaiSiswaAppType => {
    const responAwal: RisponsePenilaianSiswa[] = [
        { index: 0, bentuk_soal: 'pg', no_prefix: 1, respon: 'A', skor: 0 },            // pg 1: menjawab A (salah, kunci B)
        // pg no_prefix 2: TIDAK ada entri (siswa tidak menjawab)
        { index: 1, bentuk_soal: 'essay', no_prefix: 1, respon: 'Jawaban essay siswa' }, // skor belum dinilai
        { index: 2, bentuk_soal: 'isian_singkat', no_prefix: 1, respon: '42' },
    ];

    const templateKoreksiSiswa: TemplateKoreksiSiswaType[] = [
        {
            bentuk_soal: buatBentukSoal('pg', 'Pilihan Ganda', 'auto'),
            data: [
                { soal: buatSoal('pg', 101), no_prefix: 1, respon: responAwal[0] },
                { soal: buatSoal('pg', 102), no_prefix: 2, respon: undefined },
            ],
        },
        {
            bentuk_soal: buatBentukSoal('essay', 'Essay', 'manual'),
            data: [{ soal: buatSoal('essay', 201), no_prefix: 1, respon: responAwal[1] }],
        },
        {
            bentuk_soal: buatBentukSoal('isian_singkat', 'Isian Singkat', 'semi-auto'),
            data: [{ soal: buatSoal('isian_singkat', 301), no_prefix: 1, respon: responAwal[2] }],
        },
    ];

    return {
        idbaris: 7,
        respon: responAwal,
        templateKoreksiSiswa,
        needValidate: true,
    } as unknown as detailNilaiSiswaAppType;
};

function renderKoreksi() {
    return render(
        createElement(
            ModalProvider,
            null,
            createElement(
                FormEdura,
                {
                    data: buatFixture(),
                    children: createElement(KoreksiItemSoal),
                }
            )
        )
    );
}

const inputRadio = (id: string) => document.getElementById(id) as HTMLInputElement;
const inputSkor = (id: string) => document.getElementById(id) as HTMLInputElement;
const barisPg = (index: number) => document.querySelectorAll('tbody tr')[index] as HTMLTableRowElement;
/** struktur kolom PG: 0=No, 1-4=opsi A-D, 5=Respon, 6=Kunci, 7=Skor */

describe('Interaksi modal Koreksi Item Soal', () => {

    it('jawaban awal PG tampil: radio A tercentang, respon A, skor 0 karena kunci B', () => {
        renderKoreksi();

        expect(inputRadio('pg_1_A').checked).toBe(true);
        expect(inputRadio('pg_1_B').checked).toBe(false);
        expect(barisPg(0).children[5].textContent).toBe('A');   // kolom Respon
        expect(barisPg(0).children[6].textContent).toBe('B');   // kolom Kunci (dari json_alat_jawab.valid)
        expect(barisPg(0).children[7].textContent).toBe('0');   // kolom Skor
    });

    it('klik radio B -> respon B & skor 100, klik C -> skor 0 (sesuai kunci)', () => {
        renderKoreksi();

        fireEvent.click(inputRadio('pg_1_B'));
        expect(inputRadio('pg_1_B').checked).toBe(true);
        expect(inputRadio('pg_1_A').checked).toBe(false);
        expect(barisPg(0).children[5].textContent).toBe('B');
        expect(barisPg(0).children[7].textContent).toBe('100');

        fireEvent.click(inputRadio('pg_1_C'));
        expect(inputRadio('pg_1_C').checked).toBe(true);
        expect(barisPg(0).children[5].textContent).toBe('C');
        expect(barisPg(0).children[7].textContent).toBe('0');
    });

    it('soal PG yang tidak dijawab (respon undefined) -> entri baru ter-upsert saat radio diklik', () => {
        renderKoreksi();

        expect(inputRadio('pg_2_A').checked).toBe(false);

        fireEvent.click(inputRadio('pg_2_A'));

        expect(inputRadio('pg_2_A').checked).toBe(true);
        expect(barisPg(1).children[5].textContent).toBe('A');
        expect(barisPg(1).children[7].textContent).toBe('0'); // kunci B, pilihan A -> 0
    });

    it('essay: input skor 85, clamp 150 -> 100, clamp -10 -> 0, kosong = tidak berubah', () => {
        renderKoreksi();

        const input = inputSkor('essay_1');
        expect(input.value).toBe(''); // skor belum dinilai

        fireEvent.change(input, { target: { value: '85' } });
        expect(input.value).toBe('85');

        fireEvent.change(input, { target: { value: '150' } });
        expect(input.value).toBe('100');

        fireEvent.change(input, { target: { value: '' } });
        expect(input.value).toBe('100'); // input kosong = no-op

        fireEvent.change(input, { target: { value: '-10' } });
        expect(input.value).toBe('0');
    });

    it('isian_singkat: input skor 50 tersimpan pada state', () => {
        renderKoreksi();

        const input = inputSkor('isian_singkat_1');
        expect(input.value).toBe('');

        fireEvent.change(input, { target: { value: '50' } });
        expect(input.value).toBe('50');
    });

    it('respon sumber essay tidak berubah ketika skor dikoreksi', () => {
        renderKoreksi();

        fireEvent.change(inputSkor('essay_1'), { target: { value: '85' } });

        expect(screen.getByText('Jawaban essay siswa')).toBeTruthy();
    });

    it('semua soal pg dalam satu grup memakai radio group per nomor (pilih satu per baris)', () => {
        renderKoreksi();

        fireEvent.click(inputRadio('pg_1_A'));
        fireEvent.click(inputRadio('pg_2_B'));

        expect(inputRadio('pg_1_A').checked).toBe(true);
        expect(inputRadio('pg_2_B').checked).toBe(true);
        // kunci pg_2 juga B -> skor 100
        expect(barisPg(1).children[7].textContent).toBe('100');
    });
});
