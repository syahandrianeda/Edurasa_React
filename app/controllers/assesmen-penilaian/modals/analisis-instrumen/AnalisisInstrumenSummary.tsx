import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import { Progress } from "~/components/ui/progress";
// import type { AnalisisInstrumenSummary as AnalisisInstrumenSummaryType, } from "~/domain/analisis-instrumen/AnalisisInstrumenSummaryType";

import type {
    AnalisisInstrumenSummary as AnalisisInstrumenSummaryType,
} from "~/domain/analisis-instrumen/AnalisisInstrumenSummaryType";

interface Props {
    summary: AnalisisInstrumenSummaryType;
}


function SummaryCard({
    title,
    value,
    description,
}: {
    title: string;
    value: string;
    description?: string;
}) {

    return (
        <Card>

            <CardHeader className="pb-2">

                <CardDescription className="text-xs">
                    {title}
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="text-xl font-bold">
                    {value}
                </div>

                {description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}

            </CardContent>

        </Card>
    );
}


function DistribusiBar({
    label,
    value,
    total,
}: {
    label: string;
    value: number;
    total: number;
}) {

    const percentage =
        total === 0
            ? 0
            : (value / total) * 100;

    return (
        <div className="space-y-1">

            <div className="flex justify-between text-xs">

                <span>
                    {label}
                </span>

                <span className="text-muted-foreground">
                    {value}
                </span>

            </div>

            <Progress value={percentage} />

        </div>
    );
}


function KategoriReliabilitas(kategori: string) {

    const map: Record<string, string> = {
        sangat_baik: "Sangat baik",
        baik: "Baik",
        cukup: "Cukup",
        rendah: "Rendah",
        sangat_rendah: "Sangat rendah",
        tidak_dapat_ditentukan:
            "Tidak dapat ditentukan",
    };

    return map[kategori] ?? kategori;
}


export function AnalisisInstrumenSummary({
    summary,
}: Props) {

    const alpha =
        summary.reliabilitas.cronbachAlpha;


    return (
        <div className="space-y-4">

            {/* ==================================================
                SUMMARY CARD
            ================================================== */}

            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">

                <SummaryCard
                    title="Peserta dianalisis"
                    value={String(
                        summary.jumlahPeserta
                    )}
                />

                <SummaryCard
                    title="Jumlah soal"
                    value={String(
                        summary.jumlahSoal
                    )}
                />

                <SummaryCard
                    title="Reliabilitas"
                    value={
                        alpha === null
                            ? "-"
                            : alpha.toFixed(2)
                    }
                    description={
                        KategoriReliabilitas(
                            summary.reliabilitas.kategori
                        )
                    }
                />

                <SummaryCard
                    title="Dipertahankan"
                    value={String(
                        summary.rekomendasi.jumlahDipertahankan
                    )}
                    description={`${summary.rekomendasi.persentaseDipertahankan.toFixed(1)}% soal`}
                />

            </div>


            {/* ==================================================
                DISTRIBUSI
            ================================================== */}

            <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">

                <Card>

                    <CardHeader className="pb-3">

                        <CardTitle className="text-sm">
                            Tingkat Kesukaran
                        </CardTitle>

                        <CardDescription>
                            Distribusi tingkat kesukaran soal.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-3">

                        <DistribusiBar
                            label="Sulit"
                            value={
                                summary.tingkatKesukaran.sulit
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Sedang"
                            value={
                                summary.tingkatKesukaran.sedang
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Mudah"
                            value={
                                summary.tingkatKesukaran.mudah
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader className="pb-3">

                        <CardTitle className="text-sm">
                            Daya Pembeda
                        </CardTitle>

                        <CardDescription>
                            Distribusi daya pembeda soal.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-3">

                        <DistribusiBar
                            label="Sangat rendah"
                            value={
                                summary.dayaPembeda.sangatRendah
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Rendah"
                            value={
                                summary.dayaPembeda.rendah
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Cukup"
                            value={
                                summary.dayaPembeda.cukup
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Baik"
                            value={
                                summary.dayaPembeda.baik
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader className="pb-3">

                        <CardTitle className="text-sm">
                            Status Soal
                        </CardTitle>

                        <CardDescription>
                            Rekomendasi berdasarkan hasil analisis.
                        </CardDescription>

                    </CardHeader>

                    <CardContent className="space-y-3">

                        <DistribusiBar
                            label="Baik"
                            value={
                                summary.statusSoal.baik
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Cukup"
                            value={
                                summary.statusSoal.cukup
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Perlu ditinjau"
                            value={
                                summary.statusSoal.perluDitinjau
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                        <DistribusiBar
                            label="Bermasalah"
                            value={
                                summary.statusSoal.bermasalah
                            }
                            total={
                                summary.jumlahSoal
                            }
                        />

                    </CardContent>

                </Card>

            </div>


            {/* ==================================================
                REKOMENDASI
            ================================================== */}

            {summary.rekomendasi.pesan.length > 0 && (

                <Card>

                    <CardHeader className="pb-3">

                        <CardTitle className="text-sm">
                            Rekomendasi
                        </CardTitle>

                    </CardHeader>

                    <CardContent className="space-y-1">

                        {summary.rekomendasi.pesan.map(
                            (pesan, index) => (

                                <p
                                    key={index}
                                    className="text-xs text-muted-foreground"
                                >
                                    • {pesan}
                                </p>

                            )
                        )}

                    </CardContent>

                </Card>

            )}

        </div>
    );
}