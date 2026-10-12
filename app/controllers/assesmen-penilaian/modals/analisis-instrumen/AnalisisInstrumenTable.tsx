import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { AnalisisInstrumenSoalFinal, } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { useCallback } from "react";
import { DayaPembedaText } from "./DayaPembedaText";
import { StatusSoalBadge } from "./status-soal-badge";

interface Props {
    data: AnalisisInstrumenSoalFinal[];
    total: number;
    onSelect: ( item: AnalisisInstrumenSoalFinal ) => void;
}





export function AnalisisInstrumenTable({
    data,
    total,
    onSelect,
}: Props) {
    const defindeBentukSoal = useCallback((bentukSoal:string)=>{
        const found = ListBentukSoal.find(s=>s.name === bentukSoal);
        if(found){
            return found.description
        }
        return 'Bentuk Soal Tidak dikenal'
    },[])
    return (
        <Card>

            <CardHeader className="pb-3">

                <CardTitle className="text-sm">
                    Analisis Setiap Soal
                </CardTitle>

                <CardDescription>
                    Menampilkan {data.length} dari {total} soal. <span className="print:hidden">Klik baris untuk melihat detail.</span>
                </CardDescription>

            </CardHeader>

            <CardContent className="p-0">

                {data.length === 0 ? (

                    <div className="px-4 py-10 text-center">

                        <p className="text-sm font-medium">
                            Tidak ada soal yang sesuai filter.
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Silakan ubah filter pencarian.
                        </p>

                    </div>

                ) : (

                    

                        <TableWithScrolling inModal={true}>

                            <thead>

                                <TRowEdura>

                                    <ThEdura className="w-12">
                                        No
                                    </ThEdura>

                                    <ThEdura>
                                        Bentuk Soal
                                    </ThEdura>

                                    <ThEdura className="text-center">
                                        Terjawab
                                    </ThEdura>

                                    <ThEdura className="text-center">
                                        Kesukaran
                                    </ThEdura>

                                    <ThEdura className="text-center">
                                        Korelasi
                                    </ThEdura>

                                    <ThEdura>
                                        Daya Pembeda
                                    </ThEdura>

                                    <ThEdura>
                                        Status
                                    </ThEdura>

                                </TRowEdura>

                            </thead>

                            <tbody>

                                {data.map(item => (

                                    <TRowEdura
                                        key={item.soal_id}
                                        onClick={() =>
                                            onSelect(item)
                                        }
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

                                        <TdEdura className="text-center">
                                            {item.tingkatKesukaran.toFixed(2)}
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

                                    </TRowEdura>

                                ))}

                            </tbody>

                        </TableWithScrolling>

                    

                )}

            </CardContent>

        </Card>
    );
}