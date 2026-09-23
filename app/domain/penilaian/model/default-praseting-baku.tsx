import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { KoleksiMapelPaketSoal } from "~/domain/paket-soal/entities/koleksi-mapel-paket-soal";
import type { countBentukSoalPaketBaku } from "~/types/bank-soal/entities/countBentukSoalPaketBaku";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";

export default class PraSetingBakuDefault{
    /** Property PraSettingBaku */
    private _identitas:IdentitasKontenPaket = {
            nama:'',
            start_time: new Date(),
            end_time:new Date(),
            kelas:'',
            dataIdentitas:'',
            durasi:0,
            // dataKop?:string,
            showKop:false,
            showKolom:false,
            showIdentitas:false,
            showPetunjuk:false,
            showSebaranTp:false
        }
    private _dataKopCustom: string[] = [];
    private _koleksiMapel:KoleksiMapelPaketSoal = {
            isMultiple:false,
            data: []
        }
    private _data_target:string[]= [];
    private _count_bentuk_soal:countBentukSoalPaketBaku[]=[];
    private _kurikulum:number[] = [];
    private _nomorSoalUrut:boolean = true;
    constructor(private readonly rombel:string){
        
    }

    get dataPrasettingBaku():PraSettingBaku{
        return {
            identitas           : this._identitas,
            dataKopCustom       : this._dataKopCustom,
            koleksi_mapel       : this._koleksiMapel,
            data_target         : this._data_target,
            count_bentuk_soal   : this._count_bentuk_soal,
            kurikulum           : this._kurikulum,
            nomorSoalUrut       : this._nomorSoalUrut
        }
    };

    
    buildDefault():this{
        this._identitas = {...this._identitas, kelas:this.rombel}
        return this;
    }
    // get identitasKonenPaket():IdentitasKontenPaket{
    //     return this._identitas
    //     // {
    //     //      nama:string,
    //     //     start_time: new Date(),
    //     //     // end_time?:Date,
    //     //     kelas:string,
    //     //     dataIdentitas:string,
    //     //     durasi:number,
    //     //     // dataKop?:string,
    //     //     // showKop:boolean
    //     //     // showKolom:boolean,
    //     //     // showIdentitas:boolean,
    //     //     // showPetunjuk:boolean
    //     //     // showSebaranTp:boolean
    //     // }
    // }
}