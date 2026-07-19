import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/format-siswa";
import FormatDaftarSiswaPage from "~/pages/format-daftar-siswa";
import { ConfigFormatDaftarSiswa } from "~/controllers/data-siswa-controller/format-daftar-siswa/config-format-daftar-siswa";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Format Daftar Siswa'
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
        titleTambahan: 'Format Daftar Siswa', 
        data: [], // data: data, 
        toolbarTabs: ConfigFormatDaftarSiswa,
        controlKelas: settingRombel,
        pesanLoading:'Mempersiapkan Data Format Siswa',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa]
    };
}

export default function FormatDaftarSiswaRoute({loaderData}:Route.ComponentProps) {
    
    return (
            <FormatDaftarSiswaPage/>
        )
}