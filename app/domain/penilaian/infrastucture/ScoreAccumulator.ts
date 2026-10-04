import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { PrediksiNoSoal } from "../model/grouping-kurikulum-by-bentuksoal";

type DataBentukSoalMap = Map<string, PrediksiNoSoal[]>;
type DataAtpMap = Map<number, {
    atp_id: number;
    atp_description: string;
    score: ScoreAccumulator;
    dataBentukSoal: DataBentukSoalMap;
}>;
type DataTpMap = Map<number, {
    tp_id: number;
    tp_description: string;
    score: ScoreAccumulator;
    dataAtp: DataAtpMap;
}>;
type DataCpMap = Map<number, {
    cp_id: number;
    cp_description: string;
    score: ScoreAccumulator;
    dataTp: DataTpMap;
}>;
export type ScoreAccumulator = {
    total: number;
    count: number;
};
export type RefAtpHasManySoalType = AtpHasManySoalType & {
    currentIdSoal: number;
};
