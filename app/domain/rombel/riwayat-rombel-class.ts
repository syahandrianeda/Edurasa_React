import { currentTapel } from "~/lib/current-tapel";
import type { RiwayatRombelAppType } from "~/types/buku-induk/riwayat-rombel";
import type { RombelInTapelSiswaType } from "./rombel-in-tapel-type";
import { getNumberFromString } from "~/lib/get-number";
import type { SiswaType } from "~/types/siswa";

export default class RiwayatRombelClass{
    constructor(private readonly dataRiwayat:RiwayatRombelAppType[]){}

    getRombelSiswaInTapel(idSiswa:number, tgl:Date):string|undefined{
        const found =  this.dataRiwayat.find(s=>s.id === idSiswa);
        const tapel = currentTapel({variant:'short', date:tgl});
        const key = 'tapel_'+tapel;
        if(found){
            return found[key]
        }
    }

    getRiwayatRombelSiswa(idSiswa:number):RombelInTapelSiswaType[]{
        const found =  this.dataRiwayat.find(s=>s.id === idSiswa);
        if(found){
            return Object.entries(found).filter(([k,v])=>k.includes('tapel_') && v!=="").map(([key,value])=>({
                rombelName:value,
                tapel:key.substring(6,10),
                jenjang: getNumberFromString(value)
            }))
        }
        return []
    }

    getAllSiswaInTapelHasRombel(tapel:string):RiwayatRombelAppType[]{
        return this.dataRiwayat.filter(s=>s['tapel_'+tapel]!=="");

    }

    getCollectionsRombelInTapel(tapel:string):string[]{
        const allSiswa = this.getAllSiswaInTapelHasRombel(tapel);
        return [...new Set(
                    allSiswa.map(m => m['tapel_' + tapel])
                        .map(rombel => rombel.replace(/\s+/g, ''))
                )].sort((a, b) => {
                        const matchA = a.match(/^(\d+)(.*)$/);
                        const matchB = b.match(/^(\d+)(.*)$/);

                        if (!matchA || !matchB) return a.localeCompare(b);

                        const numberA = Number(matchA[1]);
                        const numberB = Number(matchB[1]);

                        if (numberA !== numberB) {
                            return numberA - numberB;
                        }

                        return matchA[2].localeCompare(matchB[2]);
                    });;
    }
}