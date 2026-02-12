import { ConfigToolbarInputSiswa } from "~/controllers/data-siswa-controller/input-siswa/config-toolbar-input-siswa";
import type { Route } from "./+types/input-siswa";
import CreateNewSiswaPage from "~/pages/create-new-siswa";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Input Manual'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export async function clientLoader({}:Route.ComponentProps){

    return {
        titleTambahan: 'Input Manual', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarInputSiswa,
        controlKelas: undefined,
        showExport:false
    };
}
export default function InputSiswaRoute(){
    return (
        <CreateNewSiswaPage/>
    )
}