
import DataSiswaPerJenjangPage from "~/pages/siswa-per-jenjang";
import type { Route } from "./+types/data-siswa-jenjang";
import { ConfigToolbarDataSiswaJenjang } from "~/controllers/data-siswa-controller/config-toolbar";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Kesiswaan'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export async function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Kelas',
            description:'Daftar Jenjang',
            typeKelas:'jenjang'
        }
    
    return {
        titleTambahan: 'Per Jenjang', 
        data: [],//data, 
        toolbarTabs: ConfigToolbarDataSiswaJenjang,
        controlKelas: settingRombel
    };
}

export default function DataSiswaPerJenjang({loaderData}:Route.ComponentProps) {
    
    
    
    return (
                <DataSiswaPerJenjangPage/>
)
}