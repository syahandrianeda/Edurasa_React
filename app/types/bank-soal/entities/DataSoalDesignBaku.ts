import type { ListBentukSoalType } from "../bentuk-soal-type";
import type { DisplayFormatItemSoalBaku } from "./DisplayFormatItemSoalBaku";


export interface DataSoalDesignBaku {
    startNumber: number;
    bentukSoal: ListBentukSoalType['name'];
    petunjukPengisian: string;
    dataSoal: DisplayFormatItemSoalBaku[];
}
