import type { Route } from "./+types/sk-siswa-aktif";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { sheetMasterInduk_riwayatRombel } from "~/domain/enloaded/intial-enloaded/by-sheet/master-induk";
import SuketSiswaAktifPage from "~/pages/surat/suket-siswa-aktif-page";
import { sheetSurat_sppd, sheetSurat_suratKeluar, sheetSurat_suratMasuk } from "~/domain/enloaded/intial-enloaded/by-sheet/surat";
import { sheetTendik_riwayatIdAkun, sheetTendik_pangkatGolongan } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";




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
        titleTambahan:'Surat Keterangan Siswa Aktif',
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
                // pesanLoading:'Mempersiapkan ATP',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}


export default function SuratSiswaAktifRoute() {
    return(
        <div className="p-1">
            <h3 className="text-2xl uppercase font-extrabold text-center mb-3">Daftar Surat Keterangan Siswa Aktif</h3>
            <SuketSiswaAktifPage/>
        </div>
    )
}