import type { SiswaType } from "~/types/siswa";
type SortSiswaCriteria =
    | "nama_rombel"
    | "pd_nama";

export function sortSiswa(
    data: SiswaType[],
    criteria: SortSiswaCriteria[] = []
): SiswaType[] {
    return [...data].sort((a, b) => {

        for (const criterion of criteria) {

            if (criterion === "nama_rombel") {
                const result = (a.nama_rombel ?? "").localeCompare(
                    b.nama_rombel ?? "",
                    "id",
                    {
                        numeric: true,
                        sensitivity: "base",
                    }
                );

                if (result !== 0) {
                    return result;
                }
            }

            if (criterion === "pd_nama") {
                const result = (a.pd_nama?? "").localeCompare(
                    b.pd_nama?? "",
                    "id",
                    {
                        sensitivity: "base",
                    }
                );

                if (result !== 0) {
                    return result;
                }
            }
        }

        return 0;
    });
}