import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import FormulirSuratSppdPage from "~/pages/surat/formulir-surat-keluar-sppd";
import { sheetSurat_sppd, sheetSurat_suratKeluar, sheetSurat_suratMasuk } from "~/domain/enloaded/intial-enloaded/by-sheet/surat";
import { sheetTendik_pangkatGolongan, sheetTendik_riwayatIdAkun } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";
import { sheetMasterInduk_riwayatRombel } from "~/domain/enloaded/intial-enloaded/by-sheet/master-induk";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import { getNumberFromString } from "~/lib/get-number";
import { useMemo } from "react";
import type { Route } from "./+types/buat-sppd";


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
    /** sediakan data apa yang dibutuhkan untuk halaman ini
     * misal, butuh:
     * [ 
     *  {sheet:'kurikulum', tab:'elemen_cp'},
     *  {sheet:'kurikulum', tab:'Atp'},
     *  {sheet:'kurikulum', tab:'Atp'},
     * ]
     *  */    

    return {
        titleTambahan:'Buat SPPD',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false,
        sheetNeeded: [
                        sheetSurat_suratKeluar,
                        sheetSurat_suratMasuk,
                        sheetSurat_sppd, 
                        sheetTendik_riwayatIdAkun,
                        sheetTendik_pangkatGolongan,
                        sheetMasterInduk_riwayatRombel
                        
                ],
                pesanLoading:'Mempersiapkan Surat Masuk dan Surat Keluar (termasuk sppd dan riwayat tugas PTK)',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}


export default function SppdRoute() {
    const sortir = useAppSelector(DataOrmSuratKeluarSelector);
    const nextNoSurat = useMemo(()=>getNumberFromString(sortir[0]?.id_nosurat) + 1,[sortir]);    

    
    return(
        <div className="p-1">
            <FormulirSuratSppdPage nextNoSurat={nextNoSurat}/>
        </div>
    )
}