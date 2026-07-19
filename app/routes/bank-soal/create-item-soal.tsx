import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/create-item-soal";
import { ConfigToolbarDesainPraSoal } from "~/controllers/bank-soal/toolbar/config-toolbar-create-soal";
import { CreateItemSoal } from "~/pages/bank-soal/CreateItemSoal";
import { CreateItemSoalProvider } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { initialCreateItemSoal } from "~/controllers/bank-soal/reducer-item-soal/Initial-item-soal";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { useEffect, useMemo, useRef } from "react";
import { useFetcher } from "react-router";
import { createParamEnloaded} from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { toast } from "sonner";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { useAppSelector } from "~/context-reduct/hook";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { namaTab } from "~/lib/nama-tab-environment";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";
import { store } from "~/context-reduct/redux-provider";

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
        showExport:true,
                // pesanLoading:'Mempersiapkan ATP',
                addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                sheetNeeded: defineCreateItemSoalNeeded
    };
}


export default function BankSoalRoute() {
    
        

    return(
        // <CreateItemSoalProvider dataImmer={dataBankSoalApp} actionImmer={setDataBankSoalApp}>
        <CreateItemSoalProvider initialData ={initialCreateItemSoal}>
            <CreateItemSoal/>
        
        </CreateItemSoalProvider>
    )
}

