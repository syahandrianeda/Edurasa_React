import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import type { Route } from "./+types/create-daftar-serah-terima-dokumen-route";
import FormulirDokumenSerahTerimaDokumen from "~/pages/galeries/formulir-dokumen-serah-terima-page";
import { useAppSelector } from "~/context-reduct/hook";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import { sheetGallery_serahTerimaDokumen, sheetGallery_transaksiSerahTerimaDokumen } from "~/domain/enloaded/intial-enloaded/by-sheet/gallery";
import TableKegiatanSerahTerimaPage from "~/pages/galeries/tabel-kegiatan-serah-terima-page";
import { DtoSerahTerimaSelector } from "~/context-reduct/selectores/serah-terima-selector";
import { sheetTendik_pangkatGolongan, sheetTendik_riwayatIdAkun } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";



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
        titleTambahan:'Daftar Serah Terima Dokumen',
        controlKelas: settingRombel,
        toolbarTabs: {...TabConfigKopTtd, defaultValue:'tabTtd'},//ConfigToolbarSelectMapel
        showExport:false,
        sheetNeeded: [
                    sheetAkun_dataSiswa,
                    sheetGallery_serahTerimaDokumen,
                    sheetGallery_transaksiSerahTerimaDokumen,
                    sheetTendik_riwayatIdAkun,
                    sheetTendik_pangkatGolongan
                ],
        //pesanLoading:'Mempersiapkan Surat Masuk dan Surat Keluar (termasuk sppd dan riwayat tugas PTK)',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}


export default function CreateDaftarSerahTerimaDokumenRoute() {
    const dataDaftarAsal = useAppSelector(DtoSerahTerimaSelector);
    const dataDaftar = dataDaftarAsal.filter(s=>s.status === "");
    
    
    return(
        <div className="p-1 mb-4">
            <h3 className="text-2xl uppercase font-extrabold text-center mb-3">Daftar Kegiatan Serah Terima Dokumen</h3>
            <FormulirDokumenSerahTerimaDokumen/>
            <TableKegiatanSerahTerimaPage data={dataDaftar}/>
        </div>
    )
}