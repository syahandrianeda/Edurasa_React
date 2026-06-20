import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/create-item-soal";
import CreateItemBankSoalPage from "~/pages/bank-soal/create-item-soal";
import { ConfigToolbarDesainPraSoal } from "~/controllers/bank-soal/toolbar/config-toolbar-create-soal";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";


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
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Buat Item Soal',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarDesainPraSoal,//ConfigToolbarSelectMapel
        showExport:false
    };
}

export default function BankSoalRoute() {
    const {value} = useFilterContext();
    console.log(value, value?.extra?.fokusBentukSoal)
    return(
        <CreateItemBankSoalPage/>
    )
}