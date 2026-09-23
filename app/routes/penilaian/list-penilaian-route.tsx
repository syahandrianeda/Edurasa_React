import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/list-penilaian-route";
import TableDaftarTagihanPenilaian from "~/controllers/assesmen-penilaian/tabel/tabel-daftar-penilaian";
import { useAppSelector } from "~/context-reduct/hook";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import { instancePaketSoalSheet } from "~/context-reduct/selectores/paket-soal-selector";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import ListpenilaianPage from "~/pages/penilaian/list-penilaian-page";

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
        titleTambahan:'Daftar Penilaian (KBM)',
        controlKelas: settingRombel,
        toolbarTabs: undefined,// ConfigToolbarDesainPraSoal,//ConfigToolbarSelectMapel
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded,
                
    };
}


export default function ListPenilaianRoute() {
    const instancPaketSoal = useAppSelector(InstanceDataTagihanPenilaianSector);
    
    
    return(
        <div className="p-1">
            <h3 className="text-2xl font-extrabold text-center uppercase">Daftar Instrumen Tagihan Penilaian</h3>
            <h4 className="text-xl text-center capitalize font-black mb-7">Kelas {instancPaketSoal?.rombel}</h4>
            
            <ListpenilaianPage instansiasi={instancPaketSoal}/>
        </div>
    )
}
