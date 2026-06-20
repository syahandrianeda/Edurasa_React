import { useMemo } from "react";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import TableTitleProsem from "~/controllers/prosem/table-title-prosem";
import type OrmPromes from "~/domain/kurikulum/orm-promes";

export default function ProsemPage({promes, semester}:{promes:OrmPromes, semester:number}){
    
    const init = useMemo(()=>{
        return promes.buildPromes(semester);
    },[promes, semester]) 
    const table = init?.promesResult?.table_prosem;
    const pesan =init.messageAlertPromes;
    
    if(!table) return 'Not Found';
    return (
        <div className="p-1">
            {
                init.isWarning?(
                    <div className="min-h-full">
                        <h3 className="text-2xl text-center font-extrabold uppercase mb-3">Belum Teredia</h3>
                        Keterangan:
                        <ol className="list-decimal list-inside">
                            {
                                init.messageWarning.map((data,index)=>(
                                    <li key={index} className="list-item">{data}</li>
                                ))
                            }
                        </ol>
                    </div>
                ):(
                    table ? (
                        <>
                            <h3 className="text-2xl text-center font-extrabold uppercase mb-7">Program Semester</h3>
                            <div className="w-full mb-5">
                                <TableTitleProsem prota={init}/>
                            </div>
                            <p>&nbsp;</p>
                            <TableWithScrolling>
                                <thead>
                                    <TRowEdura>
                                        <ThEdura rowSpan={3} className="w-1">No</ThEdura>
                                        {
                                            
                                        }
                                        <THEduraFreeze stateFreeze={true} rowSpan={3}>Tujuan Pembelajaran</THEduraFreeze>
                                        <ThEdura rowSpan={3} className="text-wrap">Alokasi Waktu (JP)</ThEdura>
                                        <ThEdura colSpan={table.headers.top.find(s=>s.label === 'Distribusi Jam Pelajaran (JP)')?.colSpan}>Distribusi Jam Pelajaran (JP)</ThEdura>

                                    </TRowEdura>
                                    <TRowEdura>
                                        {
                                            table.headers.middle.map((s, i)=> 
                                                <ThEdura key={i} rowSpan={s.rowSpan} colSpan={s.colSpan} className="text-center text-[8px] lowercase first-letter:uppercase text-wrap">{s.label}</ThEdura>
                                            )
                                        }
                                    </TRowEdura>
                                    <TRowEdura>
                                        {table.headers.sub.map((s, i)=> (
                                            <ThEdura key={i} className="text-center text-[8px] lowercase first-letter:uppercase text-wrap">{s.label}</ThEdura>
                                        ))}
                                    </TRowEdura>
                                </thead>
                                <tbody>
                                    {table.rows.map((r,ri)=> (
                                        <TRowEdura key={ri}>
                                            <TdEdura className="align-middle text-center">{ri+1}.</TdEdura>
                                            <TdEduraFreeze stateFreeze={true} className={`${(ri % 2 ? 'bg-white' : 'bg-zinc-100')} align-middle text-wrap min-w-sm text-[10px]`}>{r.item.atp_as_tp_description}</TdEduraFreeze>
                                            <TdEdura className={`${r.item.alokasi !== r.item_jp_distributed?"bg-amber-400":""} align-middle text-center`}>{r.item_jp_distributed} JP</TdEdura>
                                            {r.cells.map((cell,ci)=> (
                                                <TdEdura key={ci} className="align-middle text-center text-[8px]">
                                                    {cell.length===0? null : cell.map((p,pi)=> (
                                                        <p key={pi}>{p.tgl}/{p.monthIndex+1} ({p.tag_sebaran})</p>
                                                    ))}
                                                </TdEdura>
                                            ))}
                                        </TRowEdura>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <TRowEdura>
                                        <ThEdura colSpan={2} className='capitalize'>Total JP</ThEdura>
                                        <ThEdura>{init.promesResult.total_atp_distributed} JP</ThEdura>
                                        <ThEdura colSpan={table.headers.sub.length}>

                                        </ThEdura>
                                    </TRowEdura>
                                </tfoot>
                            </TableWithScrolling>
                        </>
                        ) : (
                            <div>No promes table data available</div>
                        )

                )
            }
            {!init.isWarning && <div className="text-xs print:hidden mt-3">
                Keterangan:
                <ol className="list-decimal list-inside">
                    <li className="list-item">Sebaran tanggal untuk semester {init.promesResult.semester} dimulai dari tanggal {init.promesResult?.meta?.startDate ? new Date(init.promesResult.meta.startDate).toLocaleDateString('id-ID',{dateStyle:'long'}) : '—'} sampai tanggal {init.promesResult?.meta?.endDate ? new Date(init.promesResult.meta.endDate).toLocaleDateString('id-ID',{dateStyle:'long'}) : '—'}</li>
                    <li className="list-item">Selama tanggal tersebut, diambil data Hari Efektif Belajar dimana KBM secara efektif dapat dilaksanakan dengan normal</li>
                    {
                        pesan.map((data,index)=>
                            <li className="list-item text-rose-300 font-bold" key={index}>{data}</li>
                        )
                    }
                </ol>
            </div>}
        </div>
    )
}