import { ConfigImportFilePD } from "~/controllers/data-siswa-controller/import-file-pd/config-import-file-pd";
import type { Route } from "./+types/import-file-pd-siswa";
import ImportFilePdPage from "~/pages/import-file-pd";


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
        showExport:true
    };
}
export default function ImportFIlePdRoute(){
   
    return (
        <ImportFilePdPage/>
    )
}