import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type { RefrenceAccumulatorNilaiMapelSkorKdSheet } from "../kategori-tagihan/types";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export type DataKdSheetAppWithCountSoalTagihan = { countSoal: BankSoalAppType[]; tagihan: TagihanHasDataResponse; data: DataKdSheetApp; }

export type MapperSiswaWithDetailNilaiSheetKdAppType = Map<number, {
    idbaris: number;
    siswa_id: number;
    nama_siswa: string;
    rombel: string;
    data: DataKdSheetApp[];
    atpMapper: Map<number, DataKdSheetApp[]>;
    atpMapperWithSource: Map<number, {
        tagihanMapper: Map<number, DataKdSheetAppWithCountSoalTagihan>;
    }>;

}>;
