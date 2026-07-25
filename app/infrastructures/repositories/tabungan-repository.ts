import type { ApiResponse } from "~/configs/appscript-config";
import AppScriptSheet from "~/configs/appscript-sheet";
import type { TabunganRepositoryInterface } from "~/domain/interfaces/tabungan-repository-interface";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";

export default class TabunganRepository extends AppScriptSheet implements TabunganRepositoryInterface{
    
    constructor(){
        super()
    }
    async update(param: Record<string, any>):Promise<ApiResponse<TabunganSheetType>>{
        const newParam = {...param, idss:this.sheetTabungan}
        const action = await this.postBody(newParam);
        
        return this.responActionRead(action);
    }
}