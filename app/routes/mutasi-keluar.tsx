
import { ConfigToolbarMutasi } from "~/controllers/data-siswa-controller/config-toolbar";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "../+types/root";
import MutasiKeluarPage from "~/pages/mutasi-keluar";

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
        showControlKelas:false,
        title: 'Rombel',
        description:'Rombel yang Anda Ampu',
        typeKelas:'rombel'
    }
    
    return {
        titleTambahan: 'Mutasi Keluar', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarMutasi,
        controlKelas: settingRombel
    };
}

export default function MutasiKeluarRoute({loaderData}:Route.ComponentProps) {
    
    return (
                <MutasiKeluarPage/>
    
)
}