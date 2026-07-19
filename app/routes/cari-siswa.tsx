import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/cari-siswa";
import CariSiswaPage from "~/pages/cari-siswa";
import { ConfigToolCariSiswa } from "~/controllers/data-siswa-controller/cari-siswa/config-toolbar-cari-siswa";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Cari Siswa'
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
        titleTambahan: 'Cari Siswa', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolCariSiswa,
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan Data Pencarian',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa]
    };
}

export default function CariSiswaRoute({loaderData}:Route.ComponentProps) {
    
    return (
                <CariSiswaPage/>
    
)
}