import type { SiswaType } from "~/types/siswa";
import type { ProblemRiwayat } from "../../value-objects/RiwayatRaportSiswaType";
import { DefineNis } from "../nis/DefineNis";
import { getNumberFromString } from "~/lib/get-number";

export class ValidationPreRequesiteRiwayatRaport{
    private validation:ProblemRiwayat[] = [];
    readonly siswa:DefineNis;
    constructor(private readonly dataSiswa:SiswaType){
        this.siswa = new DefineNis(this.dataSiswa.nis);
    };

    evaluate():void{
        if(!this.notPrefixKosong){ this.validation.push({ isValid:false, message:'NIS tidak boleh kosong' }) };
        if(!this.hasFirstJenjang()){ this.validation.push({ isValid:false, message:'Kelas Awal belum diisi' }) }
        if(!this.isValidJenjangAndAwalKelas()) this.validation.push({isValid:false, message:'Awal kelas tidak sama dengan format NIS'})
        if(!this.hasMasukTgl()) this.validation.push({isValid:false, message:'Masuk Tanggal Belum diisi'})
            

    }

    get dataValidation(){
        return this.validation;
    }

    notPrefixKosong(){
        return this.siswa.prefix !== 'kosong'
    }
    
    hasFirstJenjang(){
        return !!this.dataSiswa.awal_kelas
    }

    /**
     * 
     * @returns <number> jika ada data.awal_kelas, maka ambil number kelasnya, jika tidak ada 1;
     */
    firstJenjang(){
        return this.hasFirstJenjang()? getNumberFromString(this.dataSiswa.awal_kelas):0
    }
    
    isValidJenjangAndAwalKelas(){
        const jenjangInNis = this.siswa.jenjang;
        const jenjangAwalKelas = this.firstJenjang();
        return jenjangInNis === jenjangAwalKelas;
    }
    hasMasukTgl(){
        return !!this.dataSiswa.masuk_tgl
    }
    hasKeluarTgl(){
        return !!this.dataSiswa.keluar_tgl
    }
    isStatusAkive(){
        return this.dataSiswa.aktif === 'aktif';
    }
    needKeluarTglExceptActiveState(){
        if(!this.isStatusAkive){
            return
        }
    }
}