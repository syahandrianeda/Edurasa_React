
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { NAMA_SEKOLAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import type { Route } from "./+types/gallery-schools";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Gallery'
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
        titleTambahan:'Gallery File dan Dokumen',
        controlKelas: settingRombel,
        toolbarTabs: {...TabConfigKopTtd, defaultValue:'tabTtd'},//ConfigToolbarSelectMapel
        showExport:false,
        // sheetNeeded: [
        //                 sheetTendik_riwayatIdAkun,
        //                 sheetTendik_pangkatGolongan,
        //                 sheetMasterInduk_riwayatRombel
        //         ],
        //         pesanLoading:'Mempersiapkan Surat Masuk dan Surat Keluar (termasuk sppd dan riwayat tugas PTK)',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}


export default function GallerySchoolsRoute() {
        
    return(
        <div className="p-1">
            <h3 className="text-2xl uppercase font-extrabold text-center mb-3">Gallery file dan dokumen {NAMA_SEKOLAH}</h3>
            Coming soon!
        </div>
    )
}