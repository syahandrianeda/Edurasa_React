import type { DisplayFormatItemSoalBaku } from "~/types/bank-soal/entities/DisplayFormatItemSoalBaku";
import type { DataSoalDesignBaku } from "~/types/bank-soal/entities/DataSoalDesignBaku";
import type { countBentukSoalPaketBaku } from "~/types/bank-soal/entities/countBentukSoalPaketBaku";
import type { IdentitasKontenPaket } from "../entities/identitas-paket";
import type { PraSettingPaket } from "../entities/pra-setting-paket";
import type { PaketSoalDesign } from "../result/paket-soal";
import type { DataSoalDesign } from "../result/session-soal";
import type { DisplayFormatItemSoal } from "../result/display-format-item-soal";
import type { KoleksiMapelPaketSoal } from "../entities/koleksi-mapel-paket-soal";
import type { CountBentukSoalPaket } from "../entities/count-bentuk-soal-paket";

export default class PaketSoalDesignClass{
    constructor(private readonly PaketSoal:PaketSoalDesign){}
/**
     * @returns  : {  data: DataSoalDesign[],  setting?: PraSettingPaket 
     * }
     */
    get designPaket():PaketSoalDesign{
        return this.PaketSoal;
    }
    
    /** 
     * @returns PaketSoal.setting = PraSettingPaket | undefined
     */
    get dataSetting():PraSettingPaket | undefined{
        return  this.PaketSoal.setting
    }
    
    /** 
     * @return PaketSoal.data = Array<DataSoalDesign>
     */
    get dataKontenSoal():DataSoalDesign[]{
        return this.PaketSoal.data ?? []
    }
    
    /**
     * =============================
     * DATA SETTING.IDENTITAS
     * ===============================
     */

    /**
     * @return PaketSoal.setting.identitas = type IdentitasKontentPaket | undefined
     */
    get dataSettingIdentitas():IdentitasKontenPaket|undefined{
        return this.dataSetting?.identitas;
    }
    
    /** countBentukSoal */
    get dataSettingCountBentukSoal():CountBentukSoalPaket[]{
        return this.dataSetting?.count_bentuk_soal ?? []
    }

    /** total jumlah soal dalam paket soal */
    get dataCountItemSoalSetting():number{
        const mapNumber = this.dataSettingCountBentukSoal?.map(m=>m.count)
        if(mapNumber.length>0){
            return mapNumber.reduce((a, b)=>a+b);
        }
        return 0
    }

    /** toal soal yang telah diterappakan pada setting */
    get dataCountItemHasImplemented():number{
        const dataSoalImplemented = this.dataSoal?.length
        const dataSoalSetting = this.dataCountItemSoalSetting;
        return dataSoalSetting - dataSoalImplemented
    }
    
    /**
     * @return PaketSoal.setting.identitas.count_bentuk_soal : countBentukSoalPaket [] ==> c
     */
    get toBentukSoalPaketBaku():countBentukSoalPaketBaku[]{
        return this.dataSetting?.count_bentuk_soal?.map((m,i)=>{
            const {dataBentukSoal, count, description} = m
            return {
                dataBentukSoal: dataBentukSoal.name,
                count, 
                description
            }
        }) ?? []
    }
    
    /**
     * @returns contoh data: ['Pendidikan Penacasila', 'Matematika'] = type AtpAsOrm["namaMapel"]
     */
    get dataSettingKoleksiMapel(): KoleksiMapelPaketSoal | undefined{
        return this.dataSetting?.koleksi_mapel
    }

   

   
    /**
     * @returns contoh data: ['Pendidikan Penacasila', 'Matematika'] = type AtpAsOrm["namaMapel"]
     */
    get dataKoleksiMapelPaket():string[]{
        return  this.dataSettingKoleksiMapel?.data ?? []
    }

    /**
     * @returns PaketSoal.setting.koleksi_mapel.isMultiple = type boolean
     */
    get isMultiple():boolean{
        return  this.dataSettingKoleksiMapel?.isMultiple!!
    }
    
     get dataKop():string[]{
        return this.dataSetting?.dataKopCustom ?? []
    }
    /**
     * ===================
     *      KURIKULUM
     * ====================
     */

    get atpIdsSoal(): number[]{
        return this.dataSetting?.kurikulum?.map(m=>m.atp_as_tp_id) ?? []
    }

    
    /**
     * @return koleksi namaMapel;
     */

    get namaMapel():string[]{
        const koleksiMapel = this.dataSetting?.kurikulum?.map(m=>m.mapelname ?? '') ?? []
        return [...new Set([...koleksiMapel])]
    }
    get kodeMapel():string[]{
        const koleksiMapel = this.dataSetting?.kurikulum?.map(m=>m.kodemapel ?? '') ?? []
        return [...new Set([...koleksiMapel])]
    }


    /** 
     * @return PaketSoal.data = Array< {index:number, no_soal:number, data_soal:BankSoalAppType, formatElemen:elemenFormat, bentukSoal:ListBentukSoal}
     */
    get dataSoal():DisplayFormatItemSoal[]{
        return this.dataKontenSoal?.map(m=>m.dataSoal)?.flat()
    }
    toDisplayFormatItemSoalbaku(soal:DisplayFormatItemSoal):DisplayFormatItemSoalBaku{
        const {index, no_soal, data_soal:sourceDataSoal, format_display, showStimulus } = soal;
        const idSoal = sourceDataSoal?.idbaris ?? 0;
        return {
            index, 
            no_soal, 
            idSoal, 
            format_display, 
            showStimulus
        }
    }
    toDataSoalDesignBaku():DataSoalDesignBaku[]{
        return this.dataKontenSoal.map((m)=>{
            const {bentukSoal, dataSoal:source, startNumber, petunjukPengisian,} = m;
            const dataSoal = source.map(this.toDisplayFormatItemSoalbaku);
            return ({
                bentukSoal: bentukSoal.name,
                startNumber,
                petunjukPengisian,
                dataSoal
            })
        })
    }
    get dataIdSoal():number[]{
        return this.dataSoal.map(m=>m.data_soal?.idbaris ?? 0)
    }
    
}