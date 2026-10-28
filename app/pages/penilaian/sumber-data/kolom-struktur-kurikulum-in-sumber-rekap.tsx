import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { GroupSebaranNoSoalFromPropertyKurikulumWithScore } from "~/domain/penilaian/model/grouping-kurikulum-by-bentuksoal";

type Props = {
    sumberKolom?:GroupSebaranNoSoalFromPropertyKurikulumWithScore,
    kodeMapel:string
}
export default function KolomStrukturKurikulumInSumberRekap({sumberKolom, kodeMapel}:Props){
    const data = sumberKolom?.data?.find(s=>s.kodeMapel===kodeMapel)
    return(
        data ? (<TdEdura colSpan={3} className="p-0.5">
            
                <table className="w-full">
                    <tbody>
                        {
                            data.dataCp.map((cp,iCp)=>
                                cp.dataTp.map((tp, iTp)=>
                                    tp.dataAtp.map(((atp, iAtp)=>
                                        <TRowEdura key={cp.cp_id+'_'+tp.tp_id+'_'+atp.atp_id}>
                                            {
                                                iTp === 0 && iAtp === 0 && (
                                                    <TdEdura rowSpan={cp.slotRow}>
                                                        <div className="flex w-full font-bold justify-between border-b text-[8px]">
                                                            <p>Kode CP</p>
                                                            <p>{cp.cp_id}</p>
                                                        </div>
                                                        <div className="flex w-full justify-between border-b text-[8px]">
                                                            <p>Jumlah Soal</p>
                                                            <p>{cp.jumlahSoalDinilai}</p>
                                                        </div>
                                                    </TdEdura>
                                                )
                                            }
                                            {
                                                iAtp === 0 && (
                                                    <TdEdura rowSpan={tp.slotRow}>
                                                        
                                                        <div className="flex w-full font-bold justify-between border-b text-[8px]">
                                                            <p>Kode TP</p>
                                                            <p>{tp.tp_id}</p>
                                                        </div>
                                                        <div className="flex w-full justify-between border-b text-[8px]">
                                                            <p>Jumlah Soal</p>
                                                            <p>{tp.jumlahSoalDinilai}</p>
                                                        </div>
                                                    </TdEdura>
                                                )
                                            }
                                            <TdEdura>
                                                <div className="flex w-full font-bold justify-between border-b text-[8px]">
                                                    <p>Kode ATP</p>
                                                    <p>{atp.atp_id}</p>
                                                </div>
                                                <div className="flex w-full justify-between border-b text-[8px]">
                                                    <p>Jumlah Soal</p>
                                                    <p>{atp.jumlahSoalDinilai}</p>
                                                </div>
                                            </TdEdura>

                                        </TRowEdura>
                                    )
                                )
                            ))
                        }
                    </tbody>
                </table>
            
        </TdEdura>

        ) : (
            <TdEdura colSpan={3}>Tidak ditemukan</TdEdura>
        )
    )
}