import type { ListBentukSoalType } from "../bentuk-soal-type";


export interface countBentukSoalPaketBaku {
    dataBentukSoal: ListBentukSoalType['name'];
    count: number;
    description: string;
}
