import type { faseMerdekaType } from "./kurikulum/kurikulum-type";

export interface InterfaceRombel{
    id: number,
    rombelName: string,
    jenjang: number;
    active?:boolean,
    fase?:faseMerdekaType
}