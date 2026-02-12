
import { AppScriptConfig } from "./appscript-config";


export interface ParamRequestAppScript{
    idss: string,
    tab: string,
    action?: string;
    [key: string]: unknown;
}

export interface ParamUpdateRecord<T> extends ParamRequestAppScript{
    formData: string//,'{"no":"9","data":"19","data3":"03/02/2023 edited"}',
    byRow : number, 
    autoId?: keyof T,
    stringFormat?:string ,//["data"]',
    filter?: string,//'{"jenjang":"6"}'
}

export interface ParamUpsert<T> extends ParamRequestAppScript{
    data:string
}
export default class AppScriptSheet extends AppScriptConfig{
    protected sheetAkunTabUser          : ParamRequestAppScript   = {idss:'',tab:''};;
    protected sheetAkunTabSiswa         : ParamRequestAppScript  = {idss:'',tab:''};;
    protected sheetAkunTabDapodik       : ParamRequestAppScript  = {idss:'',tab:''};;
    protected sheetKaldikTabKaldik      : ParamRequestAppScript  = {idss:'',tab:''};
    protected sheetAbsensiTabResponse   : ParamRequestAppScript  = {idss:'',tab:''};

    constructor(){
        super();
        this.sheetAkunTabUser        = {idss:this.sheetAkun, tab:'user'}
        this.sheetAkunTabSiswa       = {idss:this.sheetAkun, tab:'siswa'}
        this.sheetAkunTabDapodik     = {idss:this.sheetAkun, tab:'dapodik'}
        this.sheetKaldikTabKaldik    = {idss:this.sheetKaldik, tab:'kalender'}
        // this.sheetAkunTabUser   = {idss:'',tab:''};
        // this.sheetAkunTabSiswa  = {idss:'',tab:''};
    }
    get isDev(){
        return import.meta.env.DEV
    }
    /** === Nama SpreadSheet */
    get sheetAkun():string{
        return this.currentMacro['ss_user']
    }

    /** id sheet Kaldik: */
    get sheetKaldik():string{
        return this.currentMacro['ss_kalender']
    }
    /** id sheet Absensi: */
    sheetAbsensi(jenjang:number):string{
        //ss_absen_6
        const namaSheet = 'ss_absen_'+jenjang;
        return this.currentMacro[namaSheet]
    }

    set paramSheetAkunTabUser(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_user':'user';
        this.sheetAkunTabUser = {
                                    idss: this.sheetAkun,
                                    tab: tab,
                                    ...additionalParam
                                }
    }
    get paramSheetAkunTabUser():ParamRequestAppScript{
        return this.sheetAkunTabUser
    }

    /** === parameter sheet Akun tab Siswa */
    set paramSheetAkunTabSiswa(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_datasiswa':'datasiswa';
        this.sheetAkunTabSiswa = {
            idss: this.sheetAkun,
            tab: tab,
            ...additionalParam
        }
    }
    get paramSheetAkunTabSiswa():ParamRequestAppScript{
        return this.sheetAkunTabSiswa
    }

    /**
     * ==================
     * Parameter Sheet Akun tab Dapodik
     * ==================
     */
    set paramSheetAkunTabDapodik(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_dapodik':'dapodik';
        this.sheetAkunTabDapodik = {
            idss: this.sheetAkun,
            tab: tab,
            ...additionalParam
        }
    }
    get paramSheetAkunTabDapodik(){
        return this.sheetAkunTabDapodik;
    }
    
    /**
     * ==============
     * sheet Kaldik tab kaldik
     * ==============
     */
    set paramSheetKaldikTabKaldik(additionalParam:Record<string, any>){
        const tab=this.isDev?"trial_kalender":"kalender";
        this.sheetKaldikTabKaldik = {
            idss: this.sheetKaldik,
            tab: tab,
            ...additionalParam
        }
    }
    get paramSheetKaldikTabKaldik(){
        return this.sheetKaldikTabKaldik;
    }

    /**
     * ====================
     * sheet Absensi Tab Response by jenjang
     * ====================
     */
    CreateParamSheetAbsensiJenjang(jenjang:number, additonalParam:Record<string, any>){
        const namaSheet = this.sheetAbsensi(jenjang);
        const tab =this.isDev?'trial_responses':'responses';
        this.sheetAbsensiTabResponse={
            idss: namaSheet,
            tab: tab,
            ...additonalParam
        }
        return this.sheetAbsensiTabResponse;
    }

    get paramSheetAbsensiJenjang(){
        return this.sheetAbsensiTabResponse;
    }


}