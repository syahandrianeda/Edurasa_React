import { currentTapel } from "~/lib/current-tapel";
import type { PredicatableRiwayatRaport, RiwayatRaportSiswa } from "../../value-objects/RiwayatRaportSiswaType";
import type { ValidationPreRequesiteRiwayatRaport } from "./validation-riwayat-raport";

export class CollectingRiwayatRaport{
    private resultColllection:PredicatableRiwayatRaport={
            isValid:false,
            prediksiKelas:[],
            shouldBeFixed:[]
        }
    constructor(private readonly validate:ValidationPreRequesiteRiwayatRaport){}

    evaluate():this{
        this.validate.evaluate();
        if(this.validate.dataValidation.length === 0){
            const kelasAwal = this.validate.firstJenjang();
            const sufixRombel = this.validate.sufixRombel();
            const prediksi:RiwayatRaportSiswa[]=[];
            const currentNisTapel = Number(currentTapel({variant:'short'}))
            let i:number = kelasAwal
            let prefix:number = Number(this.validate.fristPrefix());
            while(prefix <= currentNisTapel){
                const data:RiwayatRaportSiswa = {
                    tapel:prefix.toString(),
                    rombelInTapel:i+sufixRombel

                };
                prediksi.push(data);
                prefix+=101;
                i++;
            }
            
            this.resultColllection = {
                isValid: prediksi.length>0,
                prediksiKelas:prediksi,
                shouldBeFixed: this.validate.dataValidation.map(m=>m?.message ?? '')
                
            }
        }else{
            this.resultColllection={
                isValid:false,
                prediksiKelas:[],
                shouldBeFixed: this.validate.dataValidation.map(m=>m?.message ?? '')
            }
        }

        return this
    }
    build(){
        return structuredClone(this.resultColllection)
    }

}