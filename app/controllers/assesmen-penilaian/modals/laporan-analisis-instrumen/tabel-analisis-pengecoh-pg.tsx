import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useCallback } from "react";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { StatusSoalBadge } from "../analisis-instrumen/status-soal-badge";
import type { AnalisisInstrumenSoalFinal } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";
import AnalisisPengecohCard from "../analisis-instrumen/Analisis-pengecoh-card";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function TableAnalisisPengecohPilihanGandaTunggal({dataSumber}:{dataSumber:AnalisisInstrumenSoalFinal[]}){
    const data = dataSumber.filter(s=>s.bentuk_soal === 'pg');
    const defindeBentukSoal = useCallback((bentukSoal:string)=>{
                const found = ListBentukSoal.find(s=>s.name === bentukSoal);
                if(found){
                    return found.description
                }
                return 'Bentuk Soal Tidak dikenal'
            },[])
        return (
            <>
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <span aria-hidden="true">ⓘ</span>
                        Tabel Analisis Pengecoh Pilihan Ganda (Distractor Analytic)
                    </CardTitle>
                    <p className="text-sm text-muted-foreground print:hidden">
                        Anda dapat menampilkan Analisis pengecoh sebagai laporan tambahan maupun cukup menyembunyikannya
                    </p>
                </CardHeader>

                <CardContent className="space-y-3">
                    
                        <details
                            className="group rounded-lg border"
                        >
                            <summary className="flex cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                                    
                                </span>

                                <span className="flex-1 text-sm font-medium">
                                    Analisis Pengecoh Pilihan Ganda
                                </span>

                                <span
                                    aria-hidden="true"
                                    className="text-muted-foreground transition-transform group-open:rotate-180"
                                >
                                    ▾
                                </span>
                            </summary>

                            <div className="space-y-3 border-t px-4 py-4 text-sm leading-6 text-muted-foreground">
                                <TableWithScrolling inModal={true} className="text-[8px] break-after-page">
                                    <thead>
                                        <TRowEdura>
                                            <ThEdura>No Soal</ThEdura>
                                            <ThEdura>Bentuk Soal</ThEdura>
                                            <ThEdura>% Terjawab</ThEdura>
                                            <ThEdura>Kesukaran (%)</ThEdura>
                                            <ThEdura className="text-wrap">Analisis Pengecoh</ThEdura>
                                            <ThEdura>Instrumen Pengecoh</ThEdura>
                                        </TRowEdura>
                                    </thead>
                                    <tbody>
                                        {data.map(item => (
                                        
                                                <TRowEdura
                                                    key={item.soal_id}
                                                    
                                                    className="cursor-pointer"
                                                >
                        
                                                    <TdEdura className="font-medium">
                                                        {item.no_prefix}
                                                    </TdEdura>
                        
                                                    <TdEdura>
                                                        {defindeBentukSoal(item.bentuk_soal)}
                                                    </TdEdura>
                        
                                                    <TdEdura className="text-center">
                                                        {item.persentaseTerjawab.toFixed(1)}%
                                                    </TdEdura>
                        
                                                    <TdEdura>
                                                        <StatusSoalBadge
                                                            status={item.status}
                                                        />
                                                    </TdEdura>
                                                    <TdEdura>
                                                        {
                                                            item.pengecoh && <AnalisisPengecohCard data={item.pengecoh}/>

                                                        }
                                                    </TdEdura>
                                                    <TdEdura><ul className="list-disc ps-5 list-outside">
                                                        {
                                                            item.alasan.map((alasan, iAlasan)=>
                                                                <li key={alasan +'_'+iAlasan} className="text-[8px] text-wrap">{alasan}</li>
                                                            )
                                                        }
                                                    </ul>
                                                    </TdEdura>
                        
                                                </TRowEdura>
                        
                                            ))}
                                    </tbody>
                                </TableWithScrolling>
                                
                            </div>
                        </details>
                    
                </CardContent>
            </Card>
            </>
            )
}