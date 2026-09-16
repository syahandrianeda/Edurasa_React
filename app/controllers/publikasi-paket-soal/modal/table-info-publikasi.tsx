import type { PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";

import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";

export default function TableInfoPublikasiPaket({currentData}:{currentData:PublikasiPaketAppValidWithPaketSoal}){
    return (
        <TableWithScrolling inModal={true} className="text-xs border-0">
            <thead>
                <TRowEdura className={currentData.is_validPaketSoal?'':'odd:bg-rose-200 even:bg-rose-200'}>
                    <TdEdura className="w-1/3 border-0">Valid dengan konten Paket Soal</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">{currentData.is_validPaketSoal?'Valid':'Tidak Valid'}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Nama Publikasi</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">{currentData.nama_publikasi}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Jenis Tagihan</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">{currentData.jenis_tagihan}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Waktu Pelaksanaan</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">
                        <p>
                            {currentData.start_time.toLocaleString('id-ID', {dateStyle:'full'})}
                        </p>
                        <p>Pukul: {currentData.start_time.toLocaleString('id-ID', {timeStyle:'short'})} WIB </p>
                    </TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0 text-nowrap">Batas Waktu Akses (untuk soal online)</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">
                        <p>
                            {currentData.end_time.toLocaleString('id-ID', {dateStyle:'full'})}
                        </p>
                        <p>Pukul: {currentData.end_time.toLocaleString('id-ID', {timeStyle:'short'})} WIB </p>
                    </TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Durasi</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">{currentData.durasi} menit</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Jenis Peserta</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">
                        <p>
                            {currentData.target_type === 'rombel'?'Seluruh Siswa Dalam Rombel:':'Siswa tertentu dengan Token:'}
                        </p>
                        
                    </TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Peserta</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">
                        
                            {
                                currentData.target_type === 'rombel' ? (
                                    currentData.target_rombel.map((m, iM)=><p key={iM}>{m}</p>)
                                ):(
                                    currentData.target_person.map((m, iM)=><p key={iM}>{m}</p>)

                                )
                            }
                        
                    </TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="w-1/3 border-0">Dipublikasikan oleh</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="w-2/3 border-0">
                        { currentData.oleh}
                    </TdEdura>
                </TRowEdura>
            </thead>
        </TableWithScrolling>
    )
}