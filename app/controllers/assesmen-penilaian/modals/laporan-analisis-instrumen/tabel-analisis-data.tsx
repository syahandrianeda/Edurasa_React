import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useCallback } from "react";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { StatusSoalBadge } from "../analisis-instrumen/status-soal-badge";
import { DayaPembedaText } from "../analisis-instrumen/DayaPembedaText";
import type { AnalisisInstrumenSoalFinal } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";

export default function TableAnalisisData ({data}:{data:AnalisisInstrumenSoalFinal[]}){
    const defindeBentukSoal = useCallback((bentukSoal:string)=>{
            const found = ListBentukSoal.find(s=>s.name === bentukSoal);
            if(found){
                return found.description
            }
            return 'Bentuk Soal Tidak dikenal'
        },[])
    return (
        <>
        <p>Tabel Analisis Tiap Soal</p>
        <TableWithScrolling inModal={true} className="text-[8px]">
            <thead>
                <TRowEdura>
                    <ThEdura>No Soal</ThEdura>
                    <ThEdura>Bentuk Soal</ThEdura>
                    <ThEdura>% Terjawab</ThEdura>
                    <ThEdura>Kesukaran (%)</ThEdura>
                    <ThEdura>Korelasi</ThEdura>
                    <ThEdura>Daya Pembeda</ThEdura>
                    <ThEdura className="text-wrap">Status Instrumen Soal</ThEdura>
                    <ThEdura>Keterangan</ThEdura>
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

                            <TdEdura className="text-center capitalize">
                                <p> {item.tingkatKesukaranDiagnosis} ({(item.tingkatKesukaran * 100).toFixed(2)}%) </p>
                            </TdEdura>

                            <TdEdura className="text-center">
                                {item.korelasiItemTotal === null
                                    ? "-"
                                    : item.korelasiItemTotal.toFixed(2)
                                }
                            </TdEdura>

                            <TdEdura>
                                {DayaPembedaText({
                                    value: item.dayaPembeda,
                                })}
                            </TdEdura>

                            <TdEdura>
                                <StatusSoalBadge
                                    status={item.status}
                                />
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
        </>
    )
}