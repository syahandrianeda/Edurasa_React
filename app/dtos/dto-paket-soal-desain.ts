import type { ParamFile } from "~/configs/appscript-config";
import type { AlertPaketSoal } from "~/controllers/paket-soal/modal/validation-paket-soal";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import type { DataSoalDesign } from "~/domain/paket-soal/result/session-soal";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";
import { normalizeFileName } from "~/lib/normalized-filename";
import type{ UserPtk } from "~/types";
import type { DataSoalDesignBaku, PraSettingBaku } from "~/types/bank-soal/entities/paket-soal-app-type";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export default class DtoPaketSoalDesainType extends DataKisiKisi{
    constructor( PaketSoal:PaketSoalDesign){
        super(PaketSoal);
    }
   
    /**
     * 
    */
    get praSettingBaku():PraSettingBaku{
        return {
                    identitas           : this.dataSettingIdentitas,
                    dataKopCustom       : this.dataKop,
                    koleksi_mapel       : this.dataSettingKoleksiMapel,//KoleksiMapelPaketSoal, 
                    data_target         : this.dataSetting?.data_target ?? [],
                    count_bentuk_soal   : this.toBentukSoalPaketBaku,
                    kurikulum           : this.atpIdsSoal,//AtpAsOrm[]
                    nomorSoalUrut       : this.dataSetting?.nomorSoalUrut!!
        }
    } 
    // get dataSoalDesignBaku():DataSoalDesignBaku{
    //     return {
    //         startNumber :   number,
    //         bentukSoal:ListBentukSoalType['name']
    //         petunjukPengisian:string,
    //         dataSoal:DisplayFormatItemSoalBaku[]
    //     }
    // }
    toPaketSoalSheetType():PaketSoalSheetType{
        
        const target_asesmen = this.dataSetting?.target_paket ?? 'rombel'
        const target_rombel = this.dataSetting?.identitas?.kelas ?? ''

        const nama_paket =( this.dataSettingIdentitas?.nama ?? 'Paket Soal ' + new Date().getTime()) + (this.dataCountItemHasImplemented !==0 ? ' BELUM LENGKAP':'');
        const lintas_mapel = this.isMultiple ? 1 : 0;
        const kode_mapel = this.stringArrayToString(this.dataKoleksiMapelPaket);//this.dataSetting?.koleksi_mapel?.data?.join(', ') ?? '';
        const id_banksoal = this.numberArrayToString(this.dataSoal.map(m=>m.data_soal?.idbaris ?? 0));// this.dataSoal.map(m=>m.data_soal?.idbaris).join(', ');
        const json_setting = this.JsonSetting;
        const user = getSessionApp<UserPtk>()?.name ?? '';
        const start_time = this.dataSettingIdentitas?.start_time.toLocaleString() ?? new Date().toLocaleString();
        const durasi = this.dataSettingIdentitas?.durasi ?? 60;
        
        return {
            idbaris                     : 0,
            target_asesmen              ,//: 'rombel',
            target_rombel               ,//: 'string',
            nama_paket                  ,//: 'string',
            lintas_mapel                ,//: 0,
            kode_mapel                  ,//: 'string',
            id_banksoal                 ,//: 'string',
            json_setting                ,//: 'string',
            // json_desain                 ,//: 'string'
            user,
            start_time,
            durasi,
            kurikulum_name:'kurmer'

        
        }
    }
    toBase64Konten():string{
        this.validateObject(this.designPaket, 'paket_soal');
        return JSON.stringify(this.designPaket);
    }
    /**
     * 
     * @returns const namafileTapel = currentTapel({variant:'short'});
             const semester = currentTapelProperties({variant:'getSemester'});
             const base64 = JSON.stringify(param.paketSoal) 
             const paramFile:ParamFile = {
                             folder: 'JSON PAKET SOAL',
                             subfolder: namafileTapel +'_S_'+semester,
                             namafile: param.paketSoal.setting.identitas.nama ?? 'Paket Soal',
                             mimeType:'txt/plain',
                             base64: base64
                         }
     */
    toParamFile():ParamFile{
        const namafileTapel = currentTapel({variant:'short'});
        const semester = currentTapelProperties({variant:'getSemester'});
        const base64 = this.toBase64Konten();
        const namafile = 'kelas_'+(this.dataSettingIdentitas?.kelas ?? new Date().getTime()) + '_'+(normalizeFileName(this.dataSettingIdentitas?.nama ?? 'Paket Soal '+ new Date().getTime()))+'_'+new Date().getTime() + '.txt';
        return  {
                folder: 'JSON PAKET SOAL',
                subfolder: namafileTapel +'_S_'+semester,
                namafile,
                mimeType:'txt/plain',
                base64: base64
            }
        
    }
    get jsonDesign():string{
        const value: DataSoalDesignBaku[] = this.toDataSoalDesignBaku();
        
        // this.validateObject( value, 'json_design' );

        
        return JSON.stringify(value);
    }
    get JsonSetting( ): string {
        const value: PraSettingBaku = this.praSettingBaku
        this.validateObject( value, 'json_setting' );

        this.validateObject( value.identitas, 'json_setting.identitas' );

        if (!(value?.identitas?.start_time instanceof Date)) {
            throw new Error(
                'json_setting.identitas.start_time harus berupa Date.'
            );
        }

        if ( value.identitas.end_time !== undefined && !(value.identitas.end_time instanceof Date) ) {
            throw new Error(
                'json_setting.identitas.end_time harus berupa Date.'
            );
        }

        return JSON.stringify(value);
    }


    /* =====================================================
        * JSON DESAIN
        * ===================================================== */

    /**
     * Mengubah string JSON Sheet menjadi
     * DataSoalDesignBaku.
     */
    parseJsonDesain( value: string ): DataSoalDesignBaku {

        const parsed: unknown = this.parseJson(
            value,
            'json_desain'
        );

        if (!this.isObject(parsed)) {
            throw new Error(
                'json_desain harus berupa object.'
            );
        }

        return parsed as DataSoalDesignBaku;
    }
    
    validateObject( value: unknown, fieldName: string ): void {

        if (!this.isObject(value)) {
            throw new Error(
                `${fieldName} harus berupa object.`
            );
        }
    }

    parseJson( value: string, fieldName: string ): unknown {

        if (!value?.trim()) {
            throw new Error(
                `${fieldName} tidak boleh kosong.`
            );
        }

        try {
            return JSON.parse(value);
        } catch (error) {

            throw new Error(
                `${fieldName} bukan JSON yang valid.`,
                {
                    cause: error
                }
            );
        }
    }


    /* =====================================================
     * TYPE GUARDS
     * ===================================================== */

    isObject( value: unknown ): value is Record<string, any> {

        return ( typeof value === 'object' && value !== undefined && !Array.isArray(value)
        );
    }

    stringArrayToString( value: string[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .map(item => String(item).trim())
            .filter(Boolean)
            .join(', ');
    }
    
    numberArrayToString( value: number[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .filter(item => Number.isFinite(item))
            .join(', ');
    }
    /* =====================================================
     * DATE HELPER
     * ===================================================== */

    parseDate( value: unknown, fieldName: string ): Date {

        if (value instanceof Date) {
            return value;
        }

        if ( typeof value !== 'string' && typeof value !== 'number' ) {
            throw new Error(
                `${fieldName} bukan tanggal yang valid.`
            );
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            throw new Error(
                `${fieldName} bukan tanggal yang valid.`
            );
        }

        return date;
    }

    validToSend():AlertPaketSoal{
        let isValid = true;
        const message:AlertPaketSoal['message']= [];

        /** jika jumlah soal yang telah diimpelentasikan habis semua */
        if(this.dataCountItemHasImplemented !==0){
            isValid = false;
            message.push(`'Masih ada ${this.dataCountItemHasImplemented} soal yang belum dilengkapi item soal`)
        }
        if(this.dataSettingIdentitas?.nama === ''){
            isValid = false;
            message.push('Nama Paket harus diisi untuk data koleksi paket soal');
        }

        return {
            isValid,
            message
        }
    }
    

}