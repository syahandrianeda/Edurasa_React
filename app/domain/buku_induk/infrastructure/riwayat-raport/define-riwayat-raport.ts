import type { SiswaType } from "~/types/siswa";
import type { DefineNis } from "../nis/DefineNis";

export class DefineRiwayatRaport{
    constructor(readonly NisDefinition:DefineNis, private readonly dataSiswa: SiswaType){}

    /** valid antara NIS<prefixTapel, */
    validate(){
        // this.NisDefinition.
    }


}