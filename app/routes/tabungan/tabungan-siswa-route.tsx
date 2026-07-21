import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";

import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import type { Route } from "./+types/rekap-tabungan-siswa-route";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Buku Induk'
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
            typeKelas:'rombel'
        }
    return {
        titleTambahan:'Buku Tabungan',
        controlKelas: settingRombel,
        // toolbarTabs: ConfigToolbarSelectMape
        pesanLoading:'Memanggil Data Tabungan',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa],
        mustLoadSheetNeedSiswaIfExist:true
    };
}

export default function TabunganSiswaRoute({loaderData}:Route.ComponentProps){
    
    return (
        <div className="p-1">
            <h3 className="font-bold uppercase text-center text-3xl">Hallo Tabungan Siswa</h3>
            
        </div>
    )
}