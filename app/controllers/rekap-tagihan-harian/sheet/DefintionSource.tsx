import type { FormatKategoriAssesmenTable } from "../toolbar/FormatKategoriAssesmenTable";
import { namaSumber } from "./namaSumber";

export default function DefinitionSumber({source}:{source:FormatKategoriAssesmenTable}){
    switch(source){
        case 'decision':
            return <span>Sumber data {namaSumber(source)} adalah sumber data yang akan dijadikan dasar perhitungan nilai raport. Data ini diambil dari Server Rekap Per Assesmen (Peniaian Harian, Tengah Semester, Akhir Semester)</span>;
        case 'responSiswa':
            return <span>Sumber data {namaSumber(source)} adalah sumber data yang telah dikerjakan oleh siswa. Data ini termasuk yang Anda koreksi (akan ada keterangan warna sel ketika soal ini telah dikoreksi). Data ini <strong>tidak termasuk</strong> yang Anda import</span>
        case 'dataServer':
            return <span>Sumber data {namaSumber(source)} adalah sumber data yang telah disimpan di Server Rekap Per Assesmen. Termasuk data yang telah Anda Koreksi atau Anda Import</span>
        default:
            return null;
    }
}