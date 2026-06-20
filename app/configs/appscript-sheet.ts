
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { AppScriptConfig } from "./appscript-config";
import type { UserPtk } from "~/types";


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
    /** kurikulum */
    protected sheetMateriTabElemenCp    : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabFaseA       : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabFaseB       : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabFaseC       : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabFaseTpAtp   : ParamRequestAppScript = {idss:'',tab:''};
    /** mapel, jp-mapel, dan jadwal-mapel, serta setting */
    protected sheetMateriTabMapel       : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabJpMapel     : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabJadwalMapel : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabSettingJadwalMapel : ParamRequestAppScript = {idss:'',tab:''};
    /** pembiasaan dan kegiatan sekolah yang dijadwalkan */
    protected sheetMateriTabKegiatanNonKbm : ParamRequestAppScript = {idss:'',tab:''};
    protected sheetMateriTabProta : ParamRequestAppScript = {idss:'',tab:''};
    

    constructor(){
        super();
        this.sheetAkunTabUser        = {idss:this.sheetAkun, tab:'user'}
        this.sheetAkunTabSiswa       = {idss:this.sheetAkun, tab:'siswa'}
        this.sheetAkunTabDapodik     = {idss:this.sheetAkun, tab:'dapodik'}
        this.sheetKaldikTabKaldik    = {idss:this.sheetKaldik, tab:'kalender'}
        this.sheetMateriTabMapel       = {idss:this.sheetMateri, tab:'mapel'}
        this.sheetMateriTabJpMapel     = {idss:this.sheetMateri, tab:'jp_mapel'}
        this.sheetMateriTabJadwalMapel = {idss:this.sheetMateri, tab:'jadwal_mapel'}
        this.sheetMateriTabSettingJadwalMapel = {idss:this.sheetMateri, tab:'setting_jadwal'}
        this.sheetMateriTabKegiatanNonKbm = {idss:this.sheetMateri, tab:'kegiatan_nonkbm'}
        this.sheetMateriTabProta = {idss:this.sheetMateri, tab:'prota'}

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
    get sheetMateri():string{
        return this.currentMacro['ss_materi']
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
        //this.sheetKaldikTabKaldik 
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
        const tab ='responses';
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

    /**
     * Kurikulum
     */
    set paramKurikulumCp(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_elemencp':'elemencp';
        this.sheetMateriTabElemenCp = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumCp(){
        return this.sheetMateriTabElemenCp;
    }
    //tp faseA
    set paramKurikulumTpFaseA(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseA':'faseA';
        this.sheetMateriTabFaseA = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumTpFaseA(){
        return this.sheetMateriTabFaseA;
    }
    //tp faseB
    set paramKurikulumTpFaseB(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseB':'faseB';
        this.sheetMateriTabFaseB = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumTpFaseB(){
        return this.sheetMateriTabFaseB;
    }
    //tp faseC
    set paramKurikulumTpFaseC(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseC':'faseC';
        this.sheetMateriTabFaseC = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumTpFaseC(){
        return this.sheetMateriTabFaseC;
    }
    //atp
    set paramKurikulumAtp(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseTPATP':'faseTPATP';
        this.sheetMateriTabFaseTpAtp = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumAtp(){
        return this.sheetMateriTabFaseTpAtp;
    }


    getParamKurikulumNeeded():ParamRequestAppScript[]{
        this.paramKurikulumMapel={};
        this.paramKurikulumJpMapel ={} ;// a.ka mapel rombel
        this.paramKurikulumCp = {};
        this.paramKurikulumTpFaseA={};
        this.paramKurikulumTpFaseB = {};
        this.paramKurikulumTpFaseC = {};
        this.paramKurikulumAtp = {};
        /** tambahan untuk mapel */
        this.paramKurikulumSettingJadwalMapel = {};
        this.paramKurikulumJadwalMapel = {};
        /** param kegiatan jadwal */
        this.paramKurikulumKegiatanNonKbm = {};
        /** kaldik */
        this.paramSheetKaldikTabKaldik = {};
        /** prota */
        

        return [
            this.sheetMateriTabElemenCp,
            this.sheetMateriTabFaseA,
            this.sheetMateriTabFaseB,
            this.sheetMateriTabFaseC,
            this.sheetMateriTabFaseTpAtp,
            /** terkait mapel di rombel, jp, dan jadwal */
            this.sheetMateriTabKegiatanNonKbm,
            
            /** terkait mapel di rombel, jp, dan jadwal */
            this.sheetMateriTabMapel,
            this.sheetMateriTabJpMapel,
            this.sheetMateriTabSettingJadwalMapel,
            this.sheetMateriTabJadwalMapel,
            /** terkait kaldik dan prota */
            this.sheetKaldikTabKaldik,
            this.sheetMateriTabProta
        

        ]
    }

    
    /** Mapel, jp-mapel, jadwal-mapel */
    set paramKurikulumMapel(additionalParam:Record<string, any>){
        const tab = 'mapel';
        this.sheetMateriTabMapel = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumMapel(){
        return this.sheetMateriTabMapel;
    }

    set paramKurikulumJpMapel(additionalParam:Record<string, any>){
        const tab = 'jp_mapel';
        this.sheetMateriTabJpMapel = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumJpMapel(){
        return this.sheetMateriTabJpMapel;
    }

    set paramKurikulumJadwalMapel(additionalParam:Record<string, any>){
        const tab = 'jadwal_mapel';
        this.sheetMateriTabJadwalMapel = {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumJadwalMapel(){
        return this.sheetMateriTabJadwalMapel;
    }
    set paramKurikulumSettingJadwalMapel(additionalParam:Record<string, any>){
        const tab = 'setting_jadwal';
        this.sheetMateriTabSettingJadwalMapel= {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumSettingJadwalMapel(){
        return this.sheetMateriTabSettingJadwalMapel;
    }
    set paramKurikulumKegiatanNonKbm(additionalParam:Record<string, any>){
        const tab = 'kegiatan_nonkbm';
        this.sheetMateriTabKegiatanNonKbm= {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumKegiatanNonKbm(){
        return this.sheetMateriTabKegiatanNonKbm;
    }
    
    set paramSheetMateriTabProta(additionalParam:Record<string, any>){
        const tab = 'prota';
        this.sheetMateriTabProta= {
            idss: this.sheetMateri,
            tab,
            ...additionalParam
        }
    }
    get paramSheetMateriTabProta(){
        return this.sheetMateriTabProta;
    }

    dataAuth(){
        this.paramSheetAkunTabUser = {};
        const sheetTabAkun = this.paramSheetAkunTabUser;
        const currentUser = getSessionApp() as unknown as UserPtk ;
        if(currentUser){
            const auth = JSON.stringify({
                token: currentUser.id,
                sheet_id:sheetTabAkun.idss,
                tab: sheetTabAkun.tab
            });
            return auth;
        }
        return null
    }

}