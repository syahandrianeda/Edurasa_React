import type { ParamRequestAppScript } from "~/configs/appscript-sheet";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { dataAbsensiTypeSlice } from "~/context-reduct/global-state/absensi-slice";
import type { RootState } from "~/context-reduct/store";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";

export interface ResultParamEnloade{
    unStated:DataSheetNeeeded[], 
    param:ParamRequestAppScript[],
    needCall:boolean,
    stateNotLaoded:Record<string, any>[], 
    notProvidedState :DataSheetNeeeded[],
    dataAbsensiKelasIni?:dataAbsensiTypeSlice
}

export default class BuildParamLoaded{
    private readonly unState:DataSheetNeeeded[] = [];
    public fokusObjectState?:Partial<RootState>;
    public stateHasCollection:RootState[]=[];
    /** sheetCollection ini menandakan bahwa sheet akan dikoleksikan ke property data */
    private readonly sheetCollection:string[];
    private summaryCall:boolean = false;
    private reqParam:ParamRequestAppScript[];
    public sheetToBeParam:DataSheetNeeeded[];
    
    constructor(private readonly stateRedux:RootState, private readonly sheetNeeded:DataSheetNeeeded[]){
        this.sheetCollection = ['absensi', 'tabungan']
        this.sheetToBeParam = [];
        this.reqParam =[]
    }
    
    get needCall(){
        return this.summaryCall;
    }

    get param(){
        return this.reqParam;
    }
    get state(){
        return this.stateRedux
    }

    evaluate():this{
        /** apakah sheetData sudah diload?
         * ------
         * caranya, find di dalam state
         */
        this.sheetToBeParam = [];
        this.reqParam = [];
        for(const sheet of this.sheetNeeded){
            const {sheet:sheetRequest, tab} = sheet;
            if(this.sheetCollection.includes(sheetRequest)){
                /** check sheet berikut karena tidak ada `name` untuk sheeet ini */
                if(sheetRequest === 'absensi'){
                    const spliting = tab.split('_')
                    const nama_rombel = spliting[spliting.length-1]
                    const foundData = this.state.absensiSiswa.dataAbsensi.find(s=>s.nama_rombel === nama_rombel);
                    if(!foundData){
                        this.sheetToBeParam.push(sheet)
                    }
                }
                if(sheetRequest === 'tabungan'){
                    if(tab.includes('tabungan')){
                        const spliting = tab.split('_')
                        const nama_rombel = spliting[spliting.length-1];
                        
                        const foundData = this.state.tabungan.data.find(s=>s.nama_rombel === nama_rombel);
                        if(!foundData){
                            this.sheetToBeParam.push(sheet)
                        }
                    }

                    if(tab.includes('keuangan_')){
                        const spliting = tab.split('_')
                        const user_id = spliting[spliting.length-1]
                        const foundData = this.state.keuangan.data.find(s=>s.user_id  === Number(user_id));
                        if(!foundData){
                            this.sheetToBeParam.push(sheet)
                        }
                    }

                    if(tab.includes('kategori_akses')){
                        if(!this.state.kategoriKeuangan.loaded){
                            this.sheetToBeParam.push(sheet)
                        }
                    }

                }

            }else{
                /** `name` di state redux identik dengan nama tab, 
                 * tapi kadang tab terdapat versiTrial*/
                const namaTab = tab.replace("trial_","");
                /**cek langsung di stateRedux */
                const check = Object.values(this.state).find(s=>s.name === namaTab)
                if(check){
                    if(!check.loaded){
                        this.sheetToBeParam.push(sheet);
                    }
                }
            }
        }
        const AppSheet = new AppScriptSheet();
        this.sheetToBeParam.forEach(({sheet, tab, params})=>{
            const idss = AppSheet.currentMacro['ss_'+sheet];
        
                const ob:ParamRequestAppScript = {
                    idss,
                    tab,
                    ...params
                };
                this.reqParam.push(ob);
        })
        // this.fokusObjectState =  Object.fromEntries(Object.entries(this.state).filter(([k, v])=>this.sheetNeeded.map(m=>m.tab).includes(v.name) && !v.loaded))

        return this;
    }


    filteringSheetNeedHasCollection(){
        /** variabel harus dicek di property `data`-nya. */
        const sheetNeedHasCollection =  this.sheetNeeded.filter(s=>this.sheetCollection.includes(s.sheet));
        /** variabel untuk mengecek `loaded` secara langsung*/
        const sheetNeedCheckStateImmadiately = this.sheetNeeded.filter(s=>!this.sheetCollection.includes(s.sheet));
        return {sheetNeedHasCollection, sheetNeedCheckStateImmadiately}
    }






}