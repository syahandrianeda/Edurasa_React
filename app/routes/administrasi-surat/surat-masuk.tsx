import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/surat-masuk";
import SuratMasukPage from "~/pages/surat/surat-masuk-page";
import { sheetSurat_sppd, sheetSurat_suratKeluar, sheetSurat_suratMasuk } from "~/domain/enloaded/intial-enloaded/by-sheet/surat";
import { sheetTendik_pangkatGolongan, sheetTendik_riwayatIdAkun } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";
import { sheetMasterInduk_riwayatRombel } from "~/domain/enloaded/intial-enloaded/by-sheet/master-induk";






export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Surat'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:false,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'jenjang'
        }
        
     
    return {
        titleTambahan:'Surat Masuk',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:true,
        sheetNeeded: [
            sheetSurat_suratKeluar,
            sheetSurat_suratMasuk,
            sheetSurat_sppd, 
            sheetTendik_riwayatIdAkun,
            sheetTendik_pangkatGolongan,
            sheetMasterInduk_riwayatRombel
        ]
    };
}


export default function SuratMasukRoute() {

    return(
        <div className="p-1">
            <h3 className="text-2xl uppercase font-extrabold text-center mb-3">Daftar Surat Masuk</h3>
            <SuratMasukPage/>
        </div>
    )
}