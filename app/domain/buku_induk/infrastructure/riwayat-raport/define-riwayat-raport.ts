import type { SiswaType } from "~/types/siswa";
import { DefineNis } from "../nis/DefineNis";
import { currentTapel } from "~/lib/current-tapel";
import type { ProblemRiwayat } from "../../value-objects/RiwayatRaportSiswaType";
import { getNumberFromString } from "~/lib/get-number";
import { ValidationPreRequesiteRiwayatRaport } from "./validation-riwayat-raport";

export class DefineRiwayatRaport{
    
    private validateRaport:ValidationPreRequesiteRiwayatRaport;
    constructor(dataSiswa: SiswaType){
        this.validateRaport = new ValidationPreRequesiteRiwayatRaport(dataSiswa)
    }

    /** valid antara NIS<prefixTapel, */
    validate(){
        this.validateRaport.evaluate();
        this.validateRaport.dataValidation.length
    }

    /**
     * RiwayatRaport bisa terdetteksi jika:
     * - punya nis, masuk_tgl, awal_kelas, 
     * - keluar_tgl, aktif
     * - NIS dan Tahun Masuk sama
     * -
     */
    
}