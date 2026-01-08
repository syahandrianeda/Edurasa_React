
import { AppScriptConfig } from "./appscript-config";


interface ParamRequestAppScript{
    idss: string,
    tab: string,
    [key: string]: unknown;

}

export default class AppScriptSheet extends AppScriptConfig{
    protected sheetAkunTabUser: ParamRequestAppScript   = {idss:'',tab:''};;
    protected sheetAkunTabSiswa: ParamRequestAppScript  = {idss:'',tab:''};;
    constructor(){
        super()
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
    get paramSheetAkunTabSiswa(){
        return this.sheetAkunTabSiswa
    }

    


}