import { Badge } from "~/components/ui/badge";
import type { AnalisisInstrumenSoalFinal } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";

export function StatusSoalBadge({ status, }: { status: AnalisisInstrumenSoalFinal["status"]; }) {

    switch (status) {

        case "baik":
            return (
                <Badge className="bg-green-300" variant={"outline"}>
                    Baik
                </Badge>
            );

        case "cukup":
            return (
                <Badge variant="outline" className="bg-sky-300">
                    Cukup
                </Badge>
            );

        case "perlu_ditinjau":
            return (
                <Badge variant="outline" className="bg-amber-300">
                    Perlu ditinjau
                </Badge>
            );

        case "bermasalah":
            return (
                <Badge variant="destructive">
                    Bermasalah
                </Badge>
            );

        default:
            return (
                <Badge variant="secondary">
                    Tidak dianalisis
                </Badge>
            );
    }
}