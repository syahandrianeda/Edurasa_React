import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

import { Badge } from "~/components/ui/badge";
import type { AnalisisPengecohSoalResult } from "~/domain/analisis-instrumen/AnalisisPengecohOpsiResult";

// import type {
//     AnalisisPengecohSoalResult,
// } from "~/services/analisis-instrumen/AnalisisPengecohOpsiResult";

interface Props {
    data: AnalisisPengecohSoalResult;
}


function PengecohStatus({
    isKunci,
    jumlahPemilih,
    berfungsi,
    indeks,
}: {
    isKunci: boolean;
    jumlahPemilih: number;
    berfungsi: boolean;
    indeks: number;
}) {

    if (isKunci) {
        return (
            <Badge>
                Kunci
            </Badge>
        );
    }

    if (jumlahPemilih === 0) {
        return (
            <Badge variant="outline">
                Tidak berfungsi
            </Badge>
        );
    }

    if (indeks < 0) {
        return (
            <Badge variant="destructive">
                Bermasalah
            </Badge>
        );
    }

    if (berfungsi) {
        return (
            <Badge variant="secondary">
                Berfungsi
            </Badge>
        );
    }

    return (
        <Badge variant="outline">
            Tidak berfungsi
        </Badge>
    );
}


export function AnalisisPengecohDetail({
    data,
}: Props) {

    return (
        <Card>

            <CardHeader className="pb-3">

                <CardTitle className="text-sm">
                    Analisis Pengecoh
                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-3">

                <div className="text-xs text-muted-foreground">
                    {data.jumlahTerjawab} dari{" "}
                    {data.jumlahPeserta} peserta menjawab soal.
                </div>


                <div className="space-y-2">

                    {data.opsi.map(opsi => (

                        <div
                            key={opsi.index}
                            className="rounded-md border p-2"
                        >

                            <div className="flex items-center justify-between gap-2">

                                <div className="min-w-0">

                                    <div className="flex items-center gap-2">

                                        <span className="text-xs font-medium">
                                            Opsi {String.fromCharCode(
                                                65 + opsi.index
                                            )}
                                        </span>

                                        <PengecohStatus
                                            isKunci={
                                                opsi.isKunci
                                            }
                                            jumlahPemilih={
                                                opsi.jumlahPemilih
                                            }
                                            berfungsi={
                                                opsi.berfungsi
                                            }
                                            indeks={
                                                opsi.indeksPengecoh
                                            }
                                        />

                                    </div>

                                    {/* <p className="mt-1 truncate text-[10px] text-muted-foreground">
                                        {opsi.content}
                                    </p> */}
                                    <div className="mt-1 truncate text-[10px] text-muted-foreground editor-document"
                                        dangerouslySetInnerHTML={{__html:opsi.content}}
                                        />

                                </div>

                                <div className="shrink-0 text-right">

                                    <p className="text-xs font-medium">
                                        {opsi.persentasePemilih.toFixed(1)}% ({opsi.jumlahPemilih})
                                    </p>

                                    <p className="text-[10px] text-muted-foreground">
                                        {opsi.jumlahPemilih} peserta
                                    </p>

                                </div>

                            </div>


                            <div className="mt-2 grid grid-cols-3 gap-2 border-t pt-2">

                                <div>
                                    <p className="text-[9px] text-muted-foreground">
                                        Kel. tinggi
                                    </p>

                                    <p className="text-xs">
                                        {opsi.persentaseKelompokTinggi.toFixed(1)}%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[9px] text-muted-foreground">
                                        Kel. rendah
                                    </p>

                                    <p className="text-xs">
                                        {opsi.persentaseKelompokRendah.toFixed(1)}%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[9px] text-muted-foreground">
                                        Indeks
                                    </p>

                                    <p className="text-xs">
                                        {opsi.indeksPengecoh.toFixed(2)}
                                    </p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>
    );
}