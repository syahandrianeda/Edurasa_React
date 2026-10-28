import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { useAppSelector } from "~/context-reduct/hook";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import { ConfigToolbarKategoriAssesmen } from "~/controllers/rekap-tagihan-harian/toolbar/ConfigToolbarKategoriAssesmen";
import RekapTagihanMidSemesterPage from "~/pages/penilaian/rekap-tagihan-mid-semester";
import type { Route } from "./+types/tagihan-tagihan-akhir-semester-route";
import RekapTagihanAkhirSemesterPage from "~/pages/penilaian/rekap-tagihan-akhir-semester";




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
        titleTambahan:'Kategori Penilaian Akhir Semester',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarKategoriAssesmen,
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded,
                
    };
}


export default function TagihanMidSemesterRoute() {
    const instancPaketSoal = useAppSelector(InstanceDataTagihanPenilaianSector)
    const dataNilaiPerKategoriTagihan = instancPaketSoal?.dataRekapPerKategoriAssesmen?.find(s=>s.type === 'akhir_semester');
    // const dataTapel = currentTapel({variant:'full'});
    // const dataSemester = currentTapelProperties({variant:'getSemesterWithGanjilGenap'});
    //     console.log({instancPaketSoal, dataNilaiPerKategoriTagihan})
        return(
        <RekapTagihanAkhirSemesterPage kategoriTagihan={dataNilaiPerKategoriTagihan}/>
        )
}
