import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { useAppSelector } from "~/context-reduct/hook";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import { ConfigToolbarKategoriAssesmen } from "~/controllers/rekap-tagihan-harian/toolbar/ConfigToolbarKategoriAssesmen";
import type { Route } from "./+types/rekap-per-tagihan-route";
import RekapPerJenisTagihanPage from "~/pages/penilaian/rekap-per-jenis-tagihan-page";



export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Penilaian'
        },
        { 
            name: "description", 
            content: "Edurasa New Version" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Kategori Penilaian Harian',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarKategoriAssesmen,
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded,
                
    };
}


export default function RekapPertagihanRoute() {
    const instancPaketSoal = useAppSelector(InstanceDataTagihanPenilaianSector)
    const dataNilaiPerKategoriTagihan = instancPaketSoal?.raporAsal;//?.find(s=>s.type === 'harian');
   
    return (
        <RekapPerJenisTagihanPage raportAsal={dataNilaiPerKategoriTagihan}/>
        )
}
