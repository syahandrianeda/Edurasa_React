
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import KunciJawabanPreview from "~/controllers/koleksi-bank-soal/views/kunci-jawaban-preview";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { type PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";

type Props = {
    currentData:BankSoalAppType,
    defineNameBentukSoal:ListBentukSoalType,
    selectedAtpId:string,
    promes:AtpAsOrm[]
    handleSelectKurikulum:(v:string)=>void
}
export default function ContentTabKurikulumPaketSoal ({
    currentData, 
    defineNameBentukSoal, 
    selectedAtpId,
    promes,
    handleSelectKurikulum
}:Props){
    const {value} = useFilterContext<PaketSoalDesign>();
    
    return (
            <div className='flex flex-col md:flex-row md:px-2 gap-1 mt-2 text-sm pb-2 overflow-y-auto scrol-h-custom'>
                    <div className="md:w-72 hidden bg-sky-50 dark:bg-slate-400 shadow-lg shadow-sky-500 border-sky-300 px-1 pt-2 rounded-s-2xl gap-2 md:flex md:flex-col">
                        <TableWithScrolling inModal={true} className='border-0  text-[10px]'>
                            <tbody>
                                <TRowEdura>
                                    <TdEdura className='border-0 w-12'>Kelas</TdEdura>
                                    <TdEdura className='border-0 w-5'>:</TdEdura>
                                    <TdEdura className='border-0'>{currentData.jenjang_khusus}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0 w-12'>Mata Pelajaran</TdEdura>
                                    <TdEdura className='border-0 w-5'>:</TdEdura>
                                    <TdEdura className='border-0 text-wrap'>{currentData.mapel_name}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0'>Indikator Soal</TdEdura>
                                    <TdEdura className='border-0'>:</TdEdura>
                                    <TdEdura className='border-0 text-wrap text-[8px]'>{currentData.indikator_soal}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0'>Bentuk Soal</TdEdura>
                                    <TdEdura className='border-0'>:</TdEdura>
                                    <TdEdura className='border-0'>{defineNameBentukSoal?.description}</TdEdura>
                                </TRowEdura>
                                {
                                    (['pg', 'pg_kompleks', 'menjodohkan'].includes(currentData.bentuk_soal) && currentData.json_alat_jawab) &&  (
                                        <>
                                            <TRowEdura>
                                                <TdEdura className='border-0 align-middle'>Jumlah Opsi</TdEdura>
                                                <TdEdura className='border-0 align-middle'>:</TdEdura>
                                                <TdEdura className='border-0'>{currentData.json_alat_jawab.OpsiPilihanJawaban.length}</TdEdura>
                                            </TRowEdura>
                                            <TRowEdura>
                                                <TdEdura className='border-0 align-top'>Kunci Jawaban</TdEdura>
                                                <TdEdura className='border-0 align-top'>:</TdEdura>
                                                <TdEdura className='border-0 align-top'><KunciJawabanPreview data={currentData.jawaban as string[]}/></TdEdura>
                                            </TRowEdura>
                                        </>
                                    )
                                }
                            </tbody>
                        </TableWithScrolling>
                        <TableWithScrolling className='text-[10px]'>
                                <tbody>
                                <TRowEdura>
                                    <TdEdura className='border-0 w-12'>Fase</TdEdura>
                                    <TdEdura className='border-0 w-5'>:</TdEdura>
                                    <TdEdura className='border-0'>{currentData.snapshot_kurikulum?.fase}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0 w-12'>Kelas</TdEdura>
                                    <TdEdura className='border-0 w-5'>:</TdEdura>
                                    <TdEdura className='border-0'>{currentData.snapshot_kurikulum?.kelas?.join(' dan ')}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0'>Elemen</TdEdura>
                                    <TdEdura className='border-0'>:</TdEdura>
                                    <TdEdura className='border-0 text-[8px] text-wrap w-36'>{currentData.snapshot_kurikulum?.elemen}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0'>TP</TdEdura>
                                    <TdEdura className='border-0'>:</TdEdura>
                                    <TdEdura className='border-0 w-36 text-[8px] text-wrap'>{currentData.snapshot_kurikulum?.tp_as_cp_description}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0'>ATP</TdEdura>
                                    <TdEdura className='border-0'>:</TdEdura>
                                    <TdEdura className='border-0 w-36 text-[8px] text-wrap'>{currentData.snapshot_kurikulum?.atp_as_tp_description}</TdEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <TdEdura className='border-0'>Lingkup Materi</TdEdura>
                                    <TdEdura className='border-0'>:</TdEdura>
                                    <TdEdura className='border-0 text-wrap'>{currentData.snapshot_kurikulum?.lingkup_materi}</TdEdura>
                                </TRowEdura>
                            </tbody>
                        </TableWithScrolling>
                    </div>
                    <div className="md:flex-2 bg-sky-50 dark:bg-slate-400 shadow-lg shadow-sky-500 px-4 md:px-2 rounded-e-2xl pt-2 h-94 overflow-y-auto scrol-h-custom">
                    
                    <div className='relative mt-4'>
                        <div className='ps-1 pe-4 absolute text-[10px] -top-1 -translate-y-1/2 w-fit left-1 rounded-tr-2xl bg-sky-200 dark:bg-gray-300 dark:text-black'>Pilih Atp</div>
                            <Select
                                value={selectedAtpId ??''}
                                onValueChange={handleSelectKurikulum}
                                // onValueChange={handleSelectSiswa}
                            >
                                <SelectTrigger className='w-full bg-sky-200 text-[10px] dark:bg-gray-300 dark:text-black'>
                                    <SelectValue placeholder={"Edit Properti Kurikulum"} className="text-black"/>
                                </SelectTrigger>
                                
                                <SelectContent>
                                    {
                                        (promes && promes.length) && (
                                            promes.map((m, i)=>
                                                <SelectItem  value={m.atp_as_tp_id.toString()!} key={m.atp_as_tp_id}>(kelas {m.kelas.join(' dan ')}) {m.atp_as_tp_description}</SelectItem>
                                            )
                                        )
                                    }
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="overflow-y-auto scrol-h-custom mt-4 ">
                            
                        {
                            promes.length 
                            ? (
                                <>
                                    Mengubah tujuan pembelajaran (ATP) dapat mengakibatkan perubahan pada indikator soal, berikut efeknya:
                                    <TableWithScrolling inModal={true} className="border-0 text-[10px]">
                                        <tbody>
                                            <TRowEdura>
                                                <TdEdura className="md:w-24 border-0">Tujuan Pembelajaran (ATP)</TdEdura>
                                                <TdEdura className="border-0 w-5">:</TdEdura>
                                                <TdEdura className="border-0">{currentData.snapshot_kurikulum?.atp_as_tp_description}</TdEdura>
                                            </TRowEdura>
                                            <TRowEdura>
                                                <TdEdura className="border-0">Indikator Soal</TdEdura>
                                                <TdEdura className="border-0">:</TdEdura>
                                                <TdEdura className="border-0">{currentData?.indikator_soal}</TdEdura>
                                            </TRowEdura>
                                            <TRowEdura>
                                                <TdEdura className="border-0">Level Kognitif</TdEdura>
                                                <TdEdura className="border-0">:</TdEdura>
                                                <TdEdura className="border-0">{currentData?.taksonomi?.LK}</TdEdura>
                                            </TRowEdura>
                                            <TRowEdura>
                                                <TdEdura className="border-0">Kata Kerja Operasional (KKO)</TdEdura>
                                                <TdEdura className="border-0">:</TdEdura>
                                                <TdEdura className="border-0">{currentData?.taksonomi?.kko}</TdEdura>
                                            </TRowEdura>
                                            <TRowEdura>
                                                <TdEdura className="border-0">Tingkat Taksonomi</TdEdura>
                                                <TdEdura className="border-0">:</TdEdura>
                                                <TdEdura className="border-0">{currentData?.taksonomi?.type}</TdEdura>
                                            </TRowEdura>
                                            <TRowEdura>
                                                <TdEdura className="border-0">Keterangan Taksonomi</TdEdura>
                                                <TdEdura className="border-0">:</TdEdura>
                                                <TdEdura className="border-0">{currentData?.taksonomi?.nama_taksonomi}</TdEdura>
                                            </TRowEdura>
                                        </tbody>
                                    </TableWithScrolling>
                                        
                                </>
                            ) : (
                                <div className="bg-rose-300 text-center min-h-64 flex justify-center items-center">Tidak ditemukan Kurikulum untuk Mata Pelajaran {currentData.mapel_name}</div>
                            )
                        }
                        </div>
                </div>
            </div>
        
    )
}