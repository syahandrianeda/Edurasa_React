import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/surat-masuk-harian";
import FormulirSuratKeluarUmumPage from "~/pages/surat/formulir-surat-keluar-umum";
import { sheetSurat_sppd, sheetSurat_suratKeluar, sheetSurat_suratMasuk } from "~/domain/enloaded/intial-enloaded/by-sheet/surat";
import { sheetTendik_pangkatGolongan, sheetTendik_riwayatIdAkun } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";





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
        titleTambahan:'Surat Keluar',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false,
        sheetNeeded: [
                sheetSurat_suratKeluar,
                sheetSurat_suratMasuk,
                sheetSurat_sppd, 
                sheetTendik_riwayatIdAkun,
                sheetTendik_pangkatGolongan
                
        ]
                // pesanLoading:'Mempersiapkan ATP',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}



export default function SuratKeluarHarianRoute() {
    
    return(
        <div className="p-1">
            <FormulirSuratKeluarUmumPage/> 
        </div>
    )
}