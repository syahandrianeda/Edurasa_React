import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { SiswaType } from "~/types/siswa";
import type { KelompokAtasBawah } from "./KelompokAtasBawah";

export type DataSumberResult = {
    siswa: SiswaType;
    data: DataSoalSebaran[];
    kelompokSiswa: KelompokAtasBawah;
    totalScore:number
    isCorrecting: boolean
    strukturSummarySoal:StrukturDataSoalSummary[]
};
export type StrukturDataSoalSummary = {
    listBentukSoal: ListBentukSoalType;
    responCount: number
}
type DataSoalSebaran = {
    listBentukSoal: ListBentukSoalType;
    respon: RisponsePenilaianSiswa[];

};
type BentukCollectionRisponse = {
    bentukSoal: ListBentukSoalType;
    collectionRisponse: RisponsePenilaianSiswa[];
};
export type SumberData = {
    siswa: SiswaType;
    data: BentukCollectionRisponse[];
    totalScore: number;
    kelompok: KelompokAtasBawah;
    isCorrecting:boolean,
    // strukturSummarySoal:StrukturDataSoalSummary
};
export type JenisKelompokResponden = {
    tinggi: Map<number, SumberData>;
    rendah: Map<number, SumberData>;
};
