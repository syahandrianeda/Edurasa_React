import { getNumberFromString } from "~/lib/get-number";
import { namaTab } from "~/lib/nama-tab-environment";



export const defineNilaiSheetTabName = (rombel?:string, tabName?:string)=>{
    const jenjang = getNumberFromString(rombel);
    const sheet = 'nilai_'+jenjang;
    const tabText = tabName+'_'+ jenjang;
    const tab = namaTab(tabText)
    return  {sheet, tab}
}

export const defineNilaiTabTagihanRespon = (rombel:string)=>{
    return defineNilaiSheetTabName(rombel, 'respon_tagihan');
}