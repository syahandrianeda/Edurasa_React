import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/statistik-agama";
import { ConfigToolbarStatistikAgama } from "~/controllers/data-siswa-controller/statistik/statistik-agama";
import StatistikAgamaPage from "~/pages/statistik-agama";
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
        showControlKelas:false,
        title: 'Rombel',
        description:'Rombel yang Anda Ampu',
        typeKelas:'rombel'
    }
    
    return {
        titleTambahan: 'Statistik Agama', 
        data: [], // data: data, 
        toolbarTabs: ConfigToolbarStatistikAgama,
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan Data Statistik Agama',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa]
    };
}

export default function StatistikAgamaRoute({loaderData}:Route.ComponentProps) {
    
    return (
                <StatistikAgamaPage/>
    
)
}