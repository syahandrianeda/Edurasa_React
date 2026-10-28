import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { RefrensiTabResponTagihanJenjangType } from "./RefrensiTabResponTagihanJenjangType";


export type DataRefrensiPerBentukSoal = {
    bentukSoal: ListBentukSoalType['name'];
    data: RefrensiTabResponTagihanJenjangType[];
};
