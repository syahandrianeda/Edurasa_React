import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/program-tahunan";
import ProsemPage from "~/pages/kurikulum/prosem-page";
import { ConfigToolbarSemester } from "~/controllers/prosem/config-semester-toolbar";
import { defineProsemNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/prosem-needed";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Kurikulum'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export async function clientLoader({}:Route.ComponentProps){
    // const page = getSessionApp();
    
    // if(!page){
    //     throw redirect('/login');
    // }
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Kelas',
            description:'Daftar Jenjang',
            typeKelas:'rombel'
        }
        
    
    return {
        titleTambahan:'Program Semester',
        controlKelas: settingRombel,
        toolbarTabs:ConfigToolbarSemester,
        pesanLoading:'Mempersiapkan Program Semester',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
        sheetNeeded: defineProsemNeeded,
        mustLoadSheetNeedSiswaIfExist:true
    };
}


export default function ProgramSemesterRoutePage({loaderData}: Route.ComponentProps) {
    
    return(
        
            <ProsemPage/>
            
    )
}