import type { StrukturAtpType, StrukturCpType, StrukturMapeltype, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { DataSkorSiswaByInstrumenType } from "./DataSkorSiswaByInstrumenType";
import type { DataSoalNaskah } from "./DataSoalNaskah";
import type { TagihanAsessmenType } from "../tagihan-assesmen-type";

export type DetailPublikasiWithResponSiswaType = StrukturAtpType & StrukturTpType & StrukturCpType & StrukturMapeltype & {
// export type DetailPublikasiWithResponSiswaType = StrukturAtpType & {
    idbaris:number,
    namaPublikasi: string;
    counstInstrumen: number;
    /** `dataResponSiswa` adalah data seluruh siswa yang menjawab instrumen di `atp_id`. `atp_id` berada di parent type ini */
    dataResponSiswa: DataSkorSiswaByInstrumenType[];
    dataSumberPublikasiPaket: TagihanAsessmenType[];
    // atp_id: number;
    // atp_description: string;
    // tp_id: number;
    // tp_description: string;
    // cp_id: number;
    // cp_description: string;
    kodeMapel: string;
    mapelName: string;
    dataSoalNaskah: DataSoalNaskah[];
    mapelNaskah: string;
    koleksiMapel:string[],
    countResponByPublikasi:number
};
