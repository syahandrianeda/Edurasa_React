import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/sheet";

import { Badge } from "~/components/ui/badge";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import type {
    AnalisisInstrumenSoalFinal,
} from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";
import { AnalisisPengecohDetail } from "./AnalisisPengoceh";
import { DiagnosisValue } from "./DiagnosisValue";
import { StatistikItem } from "./StatistikItem";
import { StatusSoalBadge } from "./status-soal-badge";

// import { AnalisisPengecohDetail } from "./AnalisisPengecohDetail";

interface Props {
    item: AnalisisInstrumenSoalFinal | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}


// function StatusBadge({
//     status,
// }: {
//     status: AnalisisInstrumenSoalFinal["status"];
// }) {

//     if (status === "baik") {
//         return <Badge>Baik</Badge>;
//     }

//     if (status === "cukup") {
//         return <Badge variant="secondary">Cukup</Badge>;
//     }

//     if (status === "perlu_ditinjau") {
//         return (
//             <Badge variant="outline">
//                 Perlu ditinjau
//             </Badge>
//         );
//     }

//     if (status === "bermasalah") {
//         return (
//             <Badge variant="destructive">
//                 Bermasalah
//             </Badge>
//         );
//     }

//     return (
//         <Badge variant="secondary">
//             Tidak dianalisis
//         </Badge>
//     );
// }


export function AnalisisInstrumenDetailSheet({
    item,
    open,
    onOpenChange,
}: Props) {

    if (!item) {
        return null;
    }


    return (
        <Sheet open={open} onOpenChange={onOpenChange} >
            <SheetContent side="right" className=" w-full overflow-y-auto sm:max-w-xl " >
                <SheetHeader>

                    <SheetTitle>
                        Analisis Soal No. {item.no_prefix}
                    </SheetTitle>

                    <SheetDescription>
                        {item.bentuk_soal}
                    </SheetDescription>

                </SheetHeader>


                <div className="space-y-4 px-4 pb-6">


                    {/* ==================================================
                        STATUS
                    ================================================== */}

                    <div className="flex items-center justify-between rounded-md border p-3">

                        <div>

                            <p className="text-xs text-muted-foreground">
                                Status soal
                            </p>

                            <p className="text-sm font-medium">
                                Hasil diagnosis instrumen
                            </p>

                        </div>

                        <StatusSoalBadge
                            status={item.status}
                        />

                    </div>


                    {/* ==================================================
                        STATISTIK
                    ================================================== */}

                    <Card>

                        <CardHeader className="pb-3">

                            <CardTitle className="text-sm">
                                Statistik
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <div className="grid grid-cols-2 gap-2">

                                <StatistikItem
                                    label="Peserta"
                                    value={String(
                                        item.jumlahPeserta
                                    )}
                                />

                                <StatistikItem
                                    label="Terjawab"
                                    value={`${item.jumlahTerjawab} (${item.persentaseTerjawab.toFixed(1)}%)`}
                                />

                                <StatistikItem
                                    label="Tidak terjawab"
                                    value={String(
                                        item.jumlahTidakTerjawab
                                    )}
                                />

                                <StatistikItem
                                    label="Mean skor"
                                    value={
                                        item.meanSkor.toFixed(2)
                                    }
                                />

                                <StatistikItem
                                    label="Proporsi skor"
                                    value={
                                        item.proporsiSkor.toFixed(2)
                                    }
                                />

                                <StatistikItem
                                    label="Tingkat kesukaran"
                                    value={
                                        item.tingkatKesukaran.toFixed(2)
                                    }
                                />

                                <StatistikItem
                                    label="Korelasi item-total"
                                    value={
                                        item.korelasiItemTotal === null
                                            ? "-"
                                            : item.korelasiItemTotal.toFixed(2)
                                    }
                                />

                                <StatistikItem
                                    label="Daya pembeda"
                                    value={
                                        DiagnosisValue({
                                            value: item.dayaPembeda,
                                        })
                                    }
                                />

                            </div>

                        </CardContent>

                    </Card>


                    {/* ==================================================
                        DIAGNOSIS
                    ================================================== */}

                    <Card>

                        <CardHeader className="pb-3">

                            <CardTitle className="text-sm">
                                Diagnosis
                            </CardTitle>

                        </CardHeader>

                        <CardContent className="space-y-3">

                            <div className="flex items-center justify-between border-b pb-2">

                                <span className="text-xs text-muted-foreground">
                                    Tingkat kesukaran
                                </span>

                                <span className="text-xs font-medium">
                                    {DiagnosisValue({
                                        value:
                                            item.tingkatKesukaranDiagnosis,
                                    })}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b pb-2">

                                <span className="text-xs text-muted-foreground">
                                    Daya pembeda
                                </span>

                                <span className="text-xs font-medium">
                                    {DiagnosisValue({
                                        value:
                                            item.dayaPembeda,
                                    })}
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-xs text-muted-foreground">
                                    Status
                                </span>

                                <StatusSoalBadge
                                    status={item.status}
                                />

                            </div>

                        </CardContent>

                    </Card>


                    {/* ==================================================
                        ALASAN
                    ================================================== */}

                    <Card>

                        <CardHeader className="pb-3">

                            <CardTitle className="text-sm">
                                Alasan / Interpretasi
                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            {item.alasan.length === 0 ? (

                                <p className="text-xs text-muted-foreground">
                                    Tidak ada catatan diagnosis.
                                </p>

                            ) : (

                                <ul className="space-y-2">

                                    {item.alasan.map(
                                        (alasan, index) => (

                                            <li
                                                key={index}
                                                className="
                                                    text-xs
                                                    leading-relaxed
                                                    text-muted-foreground
                                                "
                                            >
                                                • {alasan}
                                            </li>

                                        )
                                    )}

                                </ul>

                            )}

                        </CardContent>

                    </Card>


                    {/* ==================================================
                        UI-4
                        PENGECOH
                    ================================================== */}

                    {item.pengecoh && (

                        <AnalisisPengecohDetail
                            data={item.pengecoh}
                        />

                    )}

                </div>

            </SheetContent>

        </Sheet>
    );
}