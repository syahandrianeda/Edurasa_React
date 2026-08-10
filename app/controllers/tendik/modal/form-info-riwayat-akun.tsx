import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type";

export default function FormInfoRiwayatAkun({dataAkun}:{dataAkun:IdAkunDanPangkat}){
    return (
        <div className="min-h-8/12 mx-5 border min-w-8/12 p-4 bg-sky-100 shadow-sm shadow-sky-400 rounded-2xl">
            <h3 className="text-center font-bold">Informasi PTK</h3>
            <TableWithScrolling className="w-8/12 mx-auto">
                <tbody>
                    <TRowEdura>
                        <TdEdura className="border-e-0 w-5">Nama</TdEdura>
                        <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                        <TdEdura className="border-s-0">{dataAkun.nama_guru}</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-e-0">NIP</TdEdura>
                        <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                        <TdEdura className="border-s-0">{dataAkun.nip}</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-e-0">Jabatan</TdEdura>
                        <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                        <TdEdura className="border-s-0">{dataAkun.jabatan}</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-e-0">Status PTK</TdEdura>
                        <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                        <TdEdura className="border-s-0 uppercase">{dataAkun.asn || 'Honorer'}</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-e-0">TMT SEKOLAH</TdEdura>
                        <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                        <TdEdura className="border-s-0">{dataAkun.start_at_school?.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                    </TRowEdura>
                </tbody>
            </TableWithScrolling>
            <h3 className="text-center mt-5 font-bold">Informasi Kepangkatan (TMT Pangkat ASN)</h3>
            <TableWithScrolling className="w-8/12 mx-auto">
                <thead>
                    <TRowEdura>
                        <ThEdura>No</ThEdura>
                        <ThEdura>TMT</ThEdura>
                        <ThEdura>Pangkat</ThEdura>
                        <ThEdura>Golongan</ThEdura>
                        <ThEdura>Ruang</ThEdura>
                        <ThEdura>Berlaku sampai</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        dataAkun.riwayat_golongan_pangkat.map((pangkat, i)=>
                            <TRowEdura key={i}>
                                <TdEdura>{i+1}.</TdEdura>
                                <TdEdura>{pangkat.start_at?.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                                <TdEdura className="text-center">{pangkat.pangkat}</TdEdura>
                                <TdEdura className="text-center">{pangkat.golongan}</TdEdura>
                                <TdEdura className="text-center">{pangkat.ruang}</TdEdura>
                                <TdEdura className="text-center">{pangkat.end_at ? pangkat?.end_at?.toLocaleDateString('id-ID', {dateStyle:'long'}): 'Sekarang'}</TdEdura>
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
            <p className="text-xs">Keterangan</p>
            <ul className="list-disc list-outside pl-6 text-xs">
                <li className="list-item">TMT (Terhitung mulai tanggal);</li>
                <li className="list-item">Data TMT ataupun berkaitan dengan tanggal perlu divalidasi ulang;</li>
                <li className="list-item">Inputan tanggal menentukan informasi terkait dengan data yang membutuhkan keterangan waktu. Misalnya user dengan riwayat ASN pada tanggal 1 Januari 2024, maka surat keluar (SPPD) pada tanggal sebelum 1 Januari tidak akan memunculkan NIP sebagai identitas kepangkatan kepegawaian</li>
            </ul>
        </div>
    )
}