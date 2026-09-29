import { cn } from "~/lib/utils";
import type { SkorKdResponSiswaType } from "~/types/penilaian/nilai-siswa-app-type";

export default function TableSkorKd({skor_kd, className}:{skor_kd?:SkorKdResponSiswaType[], className?:string}){
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
                {
                    skor_kd?.map((mapel, iMapel)=>
                        mapel.data.map((dataAtp, iDataAtp)=>
                            <tr key={mapel.kode_mapel + '_' + iMapel + '_' + iDataAtp}>
                                {
                                    iDataAtp === 0 &&  (
                                        <td rowSpan={mapel.data.length} className='px-4'>{mapel.kode_mapel}</td>
                                    )
                                }
                                <td className='p-1'>{dataAtp.atp_id}</td>
                                <td className='p-1 text-center'>{dataAtp.skor}</td>

                            </tr>
                        )
                        
                    )

                }
                
                
            </tbody>
        </table>
    )
}