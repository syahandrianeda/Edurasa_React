import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/laporan-mutasi";
import MutasiLaporanMutasiPage from "~/pages/mutasi-laporan-mutasi";
import { ConfigToolbarLaporan, ConfigToolbarMutasi } from "~/controllers/data-siswa-controller/config-toolbar";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Laporan Mutasi'
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
        title: 'Rombel',
        description:'Rombel yang Anda Ampu',
        typeKelas:'rombel'
    }
    
    return {
        titleTambahan: 'Laporan Mutasi', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarLaporan,
        controlKelas: settingRombel
    };
}

export default function MutasiKeluarRoute({loaderData}:Route.ComponentProps) {
    
    return (
                <MutasiLaporanMutasiPage/>
    
)
}