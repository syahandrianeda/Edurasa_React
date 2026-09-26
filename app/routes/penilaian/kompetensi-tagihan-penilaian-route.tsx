import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/kompetensi-tagihan-penilaian-route";
import TableTagihanKompetensi from "~/controllers/assesmen-penilaian/tabel/tabel-tagihan-kompetensi";
import { useAppSelector } from "~/context-reduct/hook";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";


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
        titleTambahan:'Data Kompetensi Tagihan',
        controlKelas: settingRombel,
        toolbarTabs: undefined,// ConfigToolbarDesainPraSoal,//ConfigToolbarSelectMapel
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded,
                
                
                
    };
}


export default function KompetensiTagihanRoute() {
     const instancPaketSoal = useAppSelector(InstanceDataTagihanPenilaianSector)
        const data = instancPaketSoal?.dataSebaranTagihanKurikulum
        

    return(
        <div className="p-1">
            <h3 className="text-2xl font-extrabold text-center">Daftar Kompetensi yang diukur dalam penilaian di Kelas {instancPaketSoal?.rombel}</h3>
            <TableTagihanKompetensi data={data}/>
        </div>
    )
}
