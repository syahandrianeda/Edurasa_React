import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { ListEditorSoal } from "~/domain/bank-soal/list-editor-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { EditorSoalType } from "~/types/bank-soal/editor-soal";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export type BuktiSerahTerima='ttd'|'poto';
export interface UiFokusCollection{
    serahTerimaDokumen?:number,
    buktiSerahTerima?:BuktiSerahTerima,
    fillTgl:boolean,
    
    /** toolbar saat buat item soal*/
    fokusBentukSoal?: ListBentukSoalType;
    fokusAtp?: AtpAsOrm
    fokusEditor?:EditorSoalType
}

export const initialUiFokusCollection:UiFokusCollection ={
    serahTerimaDokumen:0,
    buktiSerahTerima:'poto',
    fillTgl:true,
    
    /** initial saat buat item soal pertama kali */
    /** fokusAtp diatur oleh selector, initial pertama adalah undefined */
    fokusBentukSoal:ListBentukSoal[0],
    fokusEditor:ListEditorSoal[0],


}