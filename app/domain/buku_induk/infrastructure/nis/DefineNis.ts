import type { PrefixNis } from "../../value-objects/PrefixNis";
import { ValidateNisValue } from "./ValidateNis";

export class DefineNis extends ValidateNisValue{

    constructor(readonly nis: string) {
        super(nis);
        
    }

    get prefix(){
        
        return this.validation.valid ? this.nis.substring(0,4) :"kosong"
    }
    /**
     * @info sufix adalah 3 angka terakhir NIS
     * @param nis <String>, contoh "056"
     * @returns <number> hasil= 56<number>
     */
    get sufix():string{
        return this.nis.substring(6,9)
    }

    get jenjangString():string{
        return this.nis.substring(4,6)

    }
    /**
     * 
     * @param nis <string>, contoh: "2627030056"
     * @returns <number>, result: 3, nis ="" --> undefined
     */
    get jenjang():number|undefined{
        const jenjangNumb = Number(this.jenjangString)
        return isNaN(jenjangNumb)? undefined : jenjangNumb
    }


    get nisIndex():number{
        const sufix = this.sufix === ""?-1:Number(this.sufix);

        return isNaN(sufix)? -1: sufix
    }
    
}