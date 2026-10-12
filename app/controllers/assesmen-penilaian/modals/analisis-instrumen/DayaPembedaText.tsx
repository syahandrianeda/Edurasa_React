import type { AnalisisInstrumenSoalFinal } from "~/domain/analisis-instrumen/AnalisisInstrumenResultType";

export function DayaPembedaText({
    value,
}: {
    value: AnalisisInstrumenSoalFinal["dayaPembeda"];
}) {

    const map: Record<string, string> = {
        sangat_rendah: "Sangat rendah",
        rendah: "Rendah",
        cukup: "Cukup",
        baik: "Baik",
        tidak_dapat_ditentukan: "Tidak ditentukan",
    };

    return map[value] ?? value;
}
