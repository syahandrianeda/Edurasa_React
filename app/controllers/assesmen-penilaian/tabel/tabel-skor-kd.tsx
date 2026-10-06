import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { GroupSebaranNoSoalFromPropertyKurikulumWithScore } from "~/domain/penilaian/model/grouping-kurikulum-by-bentuksoal";
import { cn } from "~/lib/utils";
import type { SkorKdResponSiswaType } from "~/types/penilaian/nilai-siswa-app-type";

export default function TableSkorKd({skor_kd, data, className}:{skor_kd?:SkorKdResponSiswaType[], className?:string, data: GroupSebaranNoSoalFromPropertyKurikulumWithScore}){
    if(!skor_kd) return (
        <p>Belum merespon</p>
    )
    return (
        <table className={cn('w-full [&_td]:border [&_th]:border [&_td]:align-top', className)}>
            <thead>
                <tr>
                    <th className='text-center p-1'>Kode mapel</th>
                    <th className='text-center p-1'>Kode ID ATP</th>
                    <th className='text-center p-1'>Skor Sementara</th>
                </tr>
            </thead>
            <tbody>
                {/* {
                    skor_kd?.map((mapel, iMapel)=>
                        mapel.data.map((dataAtp, iDataAtp)=>
                            <tr key={mapel.kode_mapel + '_' + iMapel + '_' + iDataAtp}>
                                {
                                    iDataAtp === 0 &&  (
                                        <td rowSpan={mapel.data.length} className='px-4'>
                                            {mapel.kode_mapel}
                                            <p></p>
                                        </td>
                                    )
                                }
                                <td className='p-1'>{dataAtp.atp_id}</td>
                                <td className='p-1 text-center'>{dataAtp.skor}</td>

                            </tr>
                        )
                        
                    )

                } */}
                {
                    data.data.map((mapel, iMapel)=>
                        mapel.dataCp.map((cp, iCp)=>
                            cp.dataTp.map((tp, iTp)=>
                                tp.dataAtp.map((atp, iAtp)=>
                                    <TRowEdura key={iAtp+'_'+iTp+'_'+iCp+'_'+mapel.kodeMapel}>
                                        {
                                             iCp === 0 && iTp === 0 && iAtp === 0 && (
                                                <TdEdura className="text-wrap max-w-24" rowSpan={mapel.slotRow}>
                                                    <div className="h-full w-full flex flex-col gap-3 justify-between">
                                                        <p> {mapel.mapelName} </p>
                                                        <div className="w-full text-[8px]">
                                                            <div className="w-full flex justify-between border-b font-extrabold">
                                                                <p>Skor Mapel</p>
                                                                <p>{mapel.skor}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TdEdura>
                                             )
                                        }
                                        <TdEdura>{atp.atp_id}</TdEdura>
                                        <TdEdura>{atp.skor}</TdEdura>
                                    </TRowEdura>
                                )
                            )
                        )
                    )
                }
                
            </tbody>
        </table>
    )
}