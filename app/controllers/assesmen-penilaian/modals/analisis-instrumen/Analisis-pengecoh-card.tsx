import { Badge } from "~/components/ui/badge";
import type { AnalisisPengecohSoalResult } from "~/domain/analisis-instrumen/AnalisisPengecohOpsiResult";


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
            <Badge className="text-[8px] bg-sky-300 text-black">
                Kunci
            </Badge>
        );
    }

    if (jumlahPemilih === 0) {
        return (
            <Badge variant="outline" className="text-[8px] bg-slate-300">
                Tidak berfungsi
            </Badge>
        );
    }

    if (indeks < 0) {
        return (
            <Badge variant="destructive" className="text-[8px] bg-rose-500">
                Bermasalah
            </Badge>
        );
    }

    if (berfungsi) {
        return (
            <Badge variant="secondary" className="text-[8px] bg-green-300 text-black">
                Berfungsi
            </Badge>
        );
    }

    return (
        <Badge variant="outline" className="text-[8px] bg-slate-300">
            Tidak berfungsi
        </Badge>
    );
}
export default function AnalisisPengecohCard({data}:{data: AnalisisPengecohSoalResult}){
    return (
         <div className="space-y-2 max-w-full text-[8px]">

                    {data.opsi.map(opsi => (

                        <div
                            key={opsi.index}
                            className="rounded-md border p-2 bg-white dark:text-black"
                        >

                            <div className="flex items-center justify-between gap-2">

                                <div className="min-w-0">

                                    <div className="flex items-center gap-2">

                                        <span className="font-medium">
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
                                    <div className="mt-1 truncate text-[10px] text-muted-foreground text-wrap editor-document"
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
    )
}