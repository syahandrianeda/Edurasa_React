import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/mapel-route";
import MapelPage from "~/pages/kurikulum/mapel-page";
import { ConfigToolbarMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-mapel";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { useEffect, useMemo, useRef } from "react";
import { useFetcher } from "react-router";
import { createParamEnloaded} from "~/infrastructures/ensure-loaded-api/create-param-loaded";
import { toast } from "sonner";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { useAppSelector } from "~/context-reduct/hook";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import {  mapelNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/kurikulum/mapel-needed";
import { store } from "~/context-reduct/redux-provider";




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

export function clientLoader({}:Route.ComponentProps){
    // const page = getSessionApp();
    
    // if(!page){
    //     throw redirect('/login');
    // }
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel'
        }
        

    return {
        titleTambahan:'Mata Pelajaran',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarMapel,
        pesanLoading:'Mempersiapkan Mata Pelajaran',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: mapelNeeded
    };
}

export default function MapelPageRoute() {
    
    
    return(
        <MapelPage/>
    )
}