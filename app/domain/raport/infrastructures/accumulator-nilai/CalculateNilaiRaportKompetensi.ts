import Decimal from "node_modules/decimal.js/decimal";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";

export default function calculateNilaiRaportKompetensi(nilai?:SkorKdNullableType):number|null{
        if(!nilai) return null;
        /** make sure every competenstion not null */
        const arrayNilai = Object.values(nilai);
        
        if(arrayNilai.every(s=>s === null)) return null;

        const makeSureNumber = arrayNilai.map(n=>Decimal(n?? 0));


        return Decimal.sum(...makeSureNumber).div(makeSureNumber.length).toDecimalPlaces(2).toNumber();

    }