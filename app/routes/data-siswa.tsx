import DataSiswaPage from "~/pages/data-siswa";
import type { Route } from "./+types/data-siswa";
import  { ConfigToolbarDataSiswa } from "~/controllers/data-siswa-controller/config-toolbar";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";

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
        title: 'Rombel',
        description:'Rombel yang Anda Ampu',
        typeKelas:'rombel'
    }
    
    return {
        titleTambahan: 'Data Rombel', 
        toolbarTabs: ConfigToolbarDataSiswa,
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan Data Rombel',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa]
    };
}

export default function DataSiswaRoute({loaderData}:Route.ComponentProps) {
    
    return (<>
        
                <DataSiswaPage/>
    </>
)
}