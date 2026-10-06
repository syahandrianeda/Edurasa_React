import { TRowEdura, ThEdura } from "~/components/tabels/tabel-components";
import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";

export function KoreksiPgHeader({ data }: { data: DataTemplateKoreksiSiswa[]; }) {
    const countPg3 = data.every(m => m?.soal?.json_alat_jawab?.OpsiPilihanJawaban[3]?.content === '');
    return (
        <thead>
            <TRowEdura>
                <ThEdura className="text-wrap max-w-10">No. </ThEdura>
                <ThEdura colSpan={countPg3 ? 3 : 4}>Opsi Jawaban</ThEdura>
                <ThEdura className="text-wrap">Respon</ThEdura>
                <ThEdura className="text-wrap max-w-14">Kunci Jawaban</ThEdura>
                <ThEdura className="text-wrap">Skor</ThEdura>
                <ThEdura className="text-wrap max-w-12">Preview Soal</ThEdura>
            </TRowEdura>
        </thead>
    );
}
