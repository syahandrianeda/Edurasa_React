import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { currentTapelProperties } from "~/lib/current-tapel";
import { getNumberFromString } from "~/lib/get-number";
import { koleksiKategoriTagihanRaport } from "./KategoriTagihanRaportCollections";
import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";

export default class KoleksiKategoriAssesmenOnJenjang{
    static build():KategoriTagihanType[]{
        const rombelAktif = getSessionRombel();
        const jenjang = getNumberFromString(rombelAktif);
        const semester = currentTapelProperties({variant:'getSemester', tgl:new Date()})
        const kategoriAssesmenJenjang = koleksiKategoriTagihanRaport(jenjang, semester as number);
        return kategoriAssesmenJenjang;        
    }
}