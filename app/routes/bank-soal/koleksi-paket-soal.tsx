import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/koleksi-paket-soal";
import { useAppSelector } from "~/context-reduct/hook";
import { getNumberFromString } from "~/lib/get-number";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";


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
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'jenjang'
        }
        

    return {
        titleTambahan:'Koleksi Paket Soal',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:true,
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded
        
    };
}

export default function KoleksiPaketSoalRoute() {
    const kelas = useAppSelector(s=>s.fokusRombel.value);
    const koleksiPaketSoal = useAppSelector(s=>s.paketSoal);
    console.log({koleksiPaketSoal})
    return(
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase">Koleksi Paket Soal kelas {getNumberFromString(kelas)} </h3>
            
        </div>
    )
}