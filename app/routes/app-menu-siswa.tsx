

import { useAppSelector } from "~/context-reduct/hook";
import { DataMenu } from "~/configs/menu";
import PermissionMenu from "~/lib/permission-menu";
import AppMenuSiswaPage from "~/pages/app-menu-siswa-page";
import type { Route } from "./+types/app-menu-siswa";
import ModalProvider from "~/components/modals/modal-provider";
import ModalBankSoal from "~/controllers/bank-soal/modal/modal-bank-soal";
import NextModalPaketSoal from "~/controllers/paket-soal/modal/next-modal-paket";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";




export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Menu'
        },
        { 
            name: "description", 
            content: "Edurasa New Version" 
        },
    ];
}
export async function clientLoader({}:Route.ComponentProps){
    

    return {
        titleTambahan:'Menu',
         addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
        sheetNeeded: defineCreateItemSoalNeeded,
        mustLoadSheetNeedSiswaIfExist:true,
    };
}
export default function AppMenuSiswaRoute({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps){
        // disini harusnya ada ensureLoaded
             
        return (
                    <AppMenuSiswaPage />
                
                        
                    
        )
}
