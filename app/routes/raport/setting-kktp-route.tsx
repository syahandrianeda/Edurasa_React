import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import { JadwalPelajaranNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/jadwal-pelajaran-needed";
import type { Route } from "./+types/setting-kktp-route";
import SettingKktpPage from "~/pages/raport/setting-kktp-page";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Raport'
        },
        { 
            name: "description", 
            content: "Edurasa New Version" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'KKTP',
        controlKelas: settingRombel,
        toolbarTabs: undefined,// ConfigToolbarDesainPraSoal,//ConfigToolbarSelectMapel
        showExport:false,
        pesanLoading:'Mempersiapkan Data KKTP',
        addPesanRombel:{isAdd:true, type:'jenjang', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa, ...JadwalPelajaranNeeded],
        mustLoadSheetNeedSiswaIfExist:true
        
                
    };
}


export default function ERaportHelperRoute() {
    
    
    return(
        <SettingKktpPage/>
    )
}
