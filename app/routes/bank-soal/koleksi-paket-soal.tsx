import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/koleksi-paket-soal";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Bank Soal'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'jenjang'
        }
        

    return {
        titleTambahan:'Koleksi Paket Soal',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false
    };
}

export default function KoleksiPaketSoalRoute() {
    
    return(
        <p>Hello Page Koleksi Paket SOal</p>
    )
}