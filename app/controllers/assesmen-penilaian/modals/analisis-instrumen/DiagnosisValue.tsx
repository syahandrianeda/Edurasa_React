export function DiagnosisValue({
    value,
}: {
    value: string;
}) {

    const map: Record<string, string> = {
        sulit: "Sulit",
        sedang: "Sedang",
        mudah: "Mudah",

        sangat_rendah: "Sangat rendah",
        rendah: "Rendah",
        cukup: "Cukup",
        baik: "Baik",

        tidak_dapat_ditentukan: "Tidak dapat ditentukan",
    };

    return map[value] ?? value;
}
