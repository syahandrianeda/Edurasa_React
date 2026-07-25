import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/rekap-tabungan-siswa-route";
import InputHarianTabungan from "~/pages/tabungan/input-harian";
import { useAppSelector } from "~/context-reduct/hook";
import { defineTabunganRombelNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/tabungan/input-tabungan-needed";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import { ConfigToolbarTanggalInput } from "~/controllers/tabungan/toolbar/configToolbarTanngalInput";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Keuangan'
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
            title: 'Akses kelas',
            description:'Akses Rombel',
            typeKelas:'rombel',
            sourceKelas:'keuangan'
        }
    return {
        titleTambahan:'Buku Tabungan',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarTanggalInput,
        pesanLoading:'Memanggil Data Tabungan',
        sourceKelas:'tabungan',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: defineTabunganRombelNeeded,//[sheetAkun_dataSiswa],
        mustLoadSheetNeedSiswaIfExist:true
    };
}

export default function TabunganSiswaRoute({loaderData}:Route.ComponentProps){
    const fokus = useAppSelector(FokusRombelKeuangan);
    const rombel = fokus?.rombel;
    return (
        <div className="p-1">
            <h3 className="font-bold uppercase text-center text-3xl mb-0">Input {fokus?.kategori} Kelas {rombel}</h3>
            <InputHarianTabungan/>
        </div>
    )
}