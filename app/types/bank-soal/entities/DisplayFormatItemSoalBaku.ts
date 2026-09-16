import type { FormatElemen, ListBentukSoalType } from "../bentuk-soal-type";


export interface DisplayFormatItemSoalBaku {
    index: number;
    no_soal: number;
    idSoal: number;
    format_display?: FormatElemen;
    bentuk_soal?: ListBentukSoalType;
    showStimulus: boolean;
}
