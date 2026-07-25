
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
    /** * @deprecated */
    protected sheetMateriTabElemenCp    : ParamRequestAppScript = {idss:'',tab:''};
    /**@info pengganti sheetMateriTabElemenCp */
    protected KurikulumTabElemenCp         : ParamRequestAppScript = {idss:'',tab:''};

    /** * @deprecated */
    protected sheetMateriTabFaseA       : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabFaseA       :    ParamRequestAppScript = {idss:'',tab:''};
    
    /** * @deprecated */
    protected sheetMateriTabFaseB       : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabFaseB       : ParamRequestAppScript = {idss:'',tab:''};

    /** * @deprecated */
    protected sheetMateriTabFaseC       : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabFaseC       : ParamRequestAppScript = {idss:'',tab:''};

    /** * @deprecated */
    protected sheetMateriTabFaseTpAtp   : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabAtp     : ParamRequestAppScript = {idss:'',tab:''};


    /**===================================================
     *  mapel, jp-mapel, dan jadwal-mapel, serta setting *
     * ===================================================/
    
    /** * @deprecated */
    protected sheetMateriTabMapel       : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabMapel         : ParamRequestAppScript = {idss:'',tab:''};
    /** * @deprecated */
    protected sheetMateriTabJpMapel     : ParamRequestAppScript = {idss:'',tab:''};
    /**@info tab Jp Mapel menginformasikan jumlah JP dalam suatu mapel */
    protected KurikulumTabJpMapel     : ParamRequestAppScript = {idss:'',tab:''};
    /** * @deprecated */
    protected sheetMateriTabJadwalMapel : ParamRequestAppScript = {idss:'',tab:''};
    /**@info data jadwal pelajaran */
    protected KurikulumTabJadwalMapel   : ParamRequestAppScript = {idss:'',tab:''};

    /** * @deprecated */
    protected sheetMateriTabSettingJadwalMapel : ParamRequestAppScript = {idss:'',tab:''};
    /**@info setting pengatruan jadwal mapel, contohnya berapa jumlah jp dalam jadwal pelajaran, ada istirahatnya atau ga */
    protected KurikulumTabSettingJadwal : ParamRequestAppScript = {idss:'',tab:''};

    /** ================================================
     * pembiasaan dan kegiatan sekolah yang dijadwalkan 
     * ================================================*/
    /** * @deprecated */
    protected sheetMateriTabKegiatanNonKbm : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabKegiatanNonKbm : ParamRequestAppScript = {idss:'',tab:''};
    /** * @deprecated */
    protected sheetMateriTabProta : ParamRequestAppScript = {idss:'',tab:''};
    protected KurikulumTabProta : ParamRequestAppScript = {idss:'',tab:''};
    

    constructor(){
        super();
        this.sheetAkunTabUser                   = {idss:this.sheetAkun, tab:'user'}
        this.sheetAkunTabSiswa                  = {idss:this.sheetAkun, tab:'siswa'}
        this.sheetAkunTabDapodik                = {idss:this.sheetAkun, tab:'dapodik'}
        this.sheetKaldikTabKaldik               = {idss:this.sheetKaldik, tab:'kalender'}
        //1
        this.KurikulumTabMapel                  = {idss:this.sheetKurikulum, tab:'mapel'}
        //2
        this.KurikulumTabJpMapel                = {idss:this.sheetKurikulum, tab:'jp_mapel'}
        //3
        this.KurikulumTabJadwalMapel            = {idss:this.sheetKurikulum, tab:'jadwal_mapel'}
        //4
        this.KurikulumTabSettingJadwal          = {idss:this.sheetKurikulum, tab:'setting_jadwal'}
        //5
        this.KurikulumTabKegiatanNonKbm         = {idss:this.sheetKurikulum, tab:'kegiatan_nonkbm'}
        //6
        this.KurikulumTabProta                  = {idss:this.sheetKurikulum, tab:'prota'};
        //7
        this.KurikulumTabFaseA                  = {idss:this.sheetKurikulum, tab:'faseA'};
        this.KurikulumTabFaseB                  = {idss:this.sheetKurikulum, tab:'faseB'};
        this.KurikulumTabFaseC                  = {idss:this.sheetKurikulum, tab:'faseC'};
        //10
        this.KurikulumTabElemenCp               = {idss:this.sheetKurikulum, tab:'elemen_cp'};
        this.KurikulumTabProta                  = {idss:this.sheetKurikulum, tab:'prota'};
        /**deprecated:
            this.sheetMateriTabMapel                = {idss:this.sheetMateri, tab:'mapel'}
            this.sheetMateriTabJpMapel              = {idss:this.sheetMateri, tab:'jp_mapel'}
            this.sheetMateriTabJadwalMapel          = {idss:this.sheetMateri, tab:'jadwal_mapel'}
            this.sheetMateriTabSettingJadwalMapel   = {idss:this.sheetMateri, tab:'setting_jadwal'}
            this.sheetMateriTabKegiatanNonKbm       = {idss:this.sheetMateri, tab:'kegiatan_nonkbm'}
            this.sheetMateriTabProta                = {idss:this.sheetMateri, tab:'prota'}
         * 
         */
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
    get sheetKurikulum():string{
        return this.currentMacro['ss_kurikulum']
    }
    get sheetTabungan():string{
        return this.currentMacro['ss_tabungan']
    }
    /** id sheet Absensi: */
    sheetAbsensi(jenjang:number): string{
        //ss_absen_6
        // const namaSheet = 'ss_absen_'+jenjang;
        // return this.currentMacro[namaSheet]
        
        return this.currentMacro.ss_absensi;
    }
    idssTabAbsensi(rombel:string){
        
        const idss = this.currentMacro.ss_absensi
        const tab = this.isDev?'trial_kelas_'+rombel:'kelas_'+rombel;
        return {idss, tab};
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
            tab,
            ...additionalParam
        }
    }
    get paramSheetKaldikTabKaldik(){
        return this.sheetKaldikTabKaldik;
    }

    /**
     * @deprecated 
     * Sebaiknya ganti dengan `CreateParamSheetAbsensiRombel`
     * 
     */
    CreateParamSheetAbsensiJenjang(jenjang:number, additonalParam:Record<string, any>){
        /** deprecated
         * const namaSheet = this.sheetAbsensi(jenjang);
            const tab ='responses';
         */
        const namaSheet = this.sheetAbsensi(jenjang);
        const tab ='responses';
        this.sheetAbsensiTabResponse={
            idss: namaSheet,
            tab: tab,
            ...additonalParam
        }
        return this.sheetAbsensiTabResponse;
    }

    CreateParamSheetAbsensiRombel(rombel:string, additonalParam:Record<string, any>){
        /** deprecated
         * const namaSheet = this.sheetAbsensi(jenjang);
            const tab ='responses';
         */
        const {idss, tab} = this.idssTabAbsensi(rombel);
        this.sheetAbsensiTabResponse={
            idss, 
            tab,
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
        const tab = this.isDev?'trial_elemen_cp':'elemen_cp';
        this.KurikulumTabElemenCp = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumCp(){
        return this.KurikulumTabElemenCp;
    }
    //tp faseA
    set paramKurikulumTpFaseA(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseA':'faseA';
        this.KurikulumTabFaseA = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumTpFaseA(){
        return this.KurikulumTabFaseA;
    }
    //tp faseB
    set paramKurikulumTpFaseB(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseB':'faseB';
        this.KurikulumTabFaseB = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumTpFaseB(){
        return this.KurikulumTabFaseB;
    }
    //tp faseC
    set paramKurikulumTpFaseC(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_faseC':'faseC';
        this.KurikulumTabFaseC = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
        /**deprecate
            this.sheetMateriTabFaseC = {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * 
         */
    }
    get paramKurikulumTpFaseC(){
        /**deprecated return this.sheetMateriTabFaseC; * */
        return this.KurikulumTabFaseC;
    }
    //atp
    set paramKurikulumAtp(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_Atp':'Atp';
        this.KurikulumTabAtp = {idss: this.sheetKurikulum, tab, ...additionalParam};
        /**deprecated
            this.sheetMateriTabFaseTpAtp = {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * 
         */
    }
    get paramKurikulumAtp(){
        /**deprecated:
            return this.sheetMateriTabFaseTpAtp;
         **/
        return this.KurikulumTabAtp 
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
            // this.sheetMateriTabElemenCp,
            this.KurikulumTabElemenCp,
            // this.sheetMateriTabFaseA,
            this.KurikulumTabFaseA,
            // this.sheetMateriTabFaseB,
            this.KurikulumTabFaseB,
            // this.sheetMateriTabFaseC,
            this.KurikulumTabFaseC,
            // this.sheetMateriTabFaseTpAtp,
            this.KurikulumTabAtp ,

            /** terkait mapel di rombel, jp, dan jadwal */
            // this.sheetMateriTabKegiatanNonKbm,
            this.KurikulumTabKegiatanNonKbm,
            
            /** terkait mapel di rombel, jp, dan jadwal */
            // this.sheetMateriTabMapel,
            this.KurikulumTabMapel,
            // this.sheetMateriTabJpMapel,
            this.KurikulumTabJpMapel,
            // this.sheetMateriTabSettingJadwalMapel,
            this.KurikulumTabSettingJadwal,
            // this.sheetMateriTabJadwalMapel,
            this.KurikulumTabJadwalMapel,
            /** terkait kaldik dan prota */
            this.sheetKaldikTabKaldik,
            // this.sheetMateriTabProta
            this.KurikulumTabProta  
        

        ]
    }

    
    /** Mapel, jp-mapel, jadwal-mapel */
    set paramKurikulumMapel(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_mapel':'mapel';
        // this.sheetMateriTabMapel = {
        //     idss: this.sheetMateri,
        //     tab,
        //     ...additionalParam
        // }
        this.KurikulumTabMapel = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
        // this.sheetMateriTabMapel = {
        //     idss: this.sheetKurikulum,
        //     tab,
        //     ...additionalParam
        // }
        
    }
    get paramKurikulumMapel(){
        // return this.sheetMateriTabMapel;
        return this.KurikulumTabMapel;
    }

    set paramKurikulumJpMapel(additionalParam:Record<string, any>){
        const tab =  this.isDev?'trial_jp_mapel':'jp_mapel';
        this.KurikulumTabJpMapel={
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
        /**deprecated
            this.sheetMateriTabJpMapel = {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * 
         */
    }
    get paramKurikulumJpMapel(){
        /**deprecated
            return this.sheetMateriTabJpMapel;
         * */
        return this.KurikulumTabJpMapel
    }

    set paramKurikulumJadwalMapel(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_jadwal_mapel':'jadwal_mapel';
        /**deprecated
            this.sheetMateriTabJadwalMapel = {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * */
        this.KurikulumTabJadwalMapel = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumJadwalMapel(){
        /** deprecated
         * return this.sheetMateriTabJadwalMapel;
         * */
        return this.KurikulumTabJadwalMapel
    }
    set paramKurikulumSettingJadwalMapel(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_setting_jadwal':'setting_jadwal'
        this.KurikulumTabSettingJadwal = { idss: this.sheetKurikulum, tab, ...additionalParam }
        /**deprecated:
            this.sheetMateriTabSettingJadwalMapel= {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * 
         */
    }
    get paramKurikulumSettingJadwalMapel(){
        return this.KurikulumTabSettingJadwal;
        /**deprecated
            return this.sheetMateriTabSettingJadwalMapel;
         * */
    }
    set paramKurikulumKegiatanNonKbm(additionalParam:Record<string, any>){
        const tab = this.isDev?'trial_kegiatan_nonkbm':'kegiatan_nonkbm';
        /**deprecated
            this.sheetMateriTabKegiatanNonKbm= {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * */
        this.KurikulumTabKegiatanNonKbm = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
    }
    get paramKurikulumKegiatanNonKbm(){
        return this.KurikulumTabKegiatanNonKbm;
        /** depreacated 
        return this.sheetMateriTabKegiatanNonKbm;*
        */
        
    }
    
    set paramSheetMateriTabProta(additionalParam:Record<string, any>){
        const tab = this.isDev?'prota':'prota';
        this.KurikulumTabProta = {
            idss: this.sheetKurikulum,
            tab,
            ...additionalParam
        }
        /**deprecated
            this.sheetMateriTabProta= {
                idss: this.sheetMateri,
                tab,
                ...additionalParam
            }
         * */
    }
    get paramSheetMateriTabProta(){
        /**deprecate:
            return this.sheetMateriTabProta;
         * */
        return this.KurikulumTabProta;
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