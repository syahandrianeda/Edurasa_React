import { ConfigImportFilePD } from "~/controllers/data-siswa-controller/import-file-pd/config-import-file-pd";
import type { Route } from "./+types/import-file-pd-siswa";
import ImportFilePdPage from "~/pages/import-file-pd";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Import PD Dapodik'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export async function clientLoader({}:Route.ComponentProps){

    return {
        titleTambahan: 'Import FIle PD', 
        data: [], // data: data, 
        toolbarTabs: ConfigImportFilePD,
        controlKelas: undefined,
        showExport:true,
        pesanLoading:'Mempersiapkan Data Import ',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa]
    };
}
export default function ImportFIlePdRoute(){
   
    return (
        <ImportFilePdPage/>
    )
}