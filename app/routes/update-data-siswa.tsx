import type { Route } from "./+types/update-data-siswa";
import { useEffect } from "react";

import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import RedirectUpdateSiswa from "~/pages/redirect-update-siswa";

import { useFetcher, useNavigate } from "react-router";
import { ConfigUpdateDataSiswa } from "~/controllers/data-siswa-controller/update-siswa/config-toolbar-update-siswa";
import { useAppDispatch } from "~/context-reduct/hook";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setAllSiswa, type DataSiswa } from "~/context-reduct/global-state/siswa-slice";
import type { SiswaType } from "~/types/siswa";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Sekolah'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export async function clientLoader({}:Route.ComponentProps){


    return {
        titleTambahan:'Load Update Data',
        toolbarTabs: ConfigUpdateDataSiswa,
        controlKelas: undefined,
        showExport:false
    };
}
export async function clientAction({ request }: Route.ActionArgs){
    
    
    const instCall = new KesiswaanServiceImplements();
    const data = await instCall.loadAllSiswaAPI();
    return data;
}
export default function UpdateDataSiswaRoute({actionData}:Route.ComponentProps) {
    const fetcher = useFetcher<typeof clientAction>();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (fetcher.state === "idle") {
            fetcher.submit(null, {
                method: "post",
                action: "/kesiswaan/update-data-siswa",
            });
            
                dispatch(setloadedApi({
                    loaded:true, name:'loaded_animation'
                }))
        }
    }, [fetcher]);

    // redirect setelah action selesai
    useEffect(() => {
        if (fetcher.data?.success) {
            dispatch(
                setAllSiswa({
                    loaded:true,
                    data: fetcher.data?.data as SiswaType[],
                    source: fetcher.data?.source,
                    loading:false
                } as  DataSiswa<SiswaType>)
            );
            dispatch(
                setloadedApi({
                    loaded:false, name:'loaded_animation'
                })
            );

            navigate(-1)
        };
        
    }, [fetcher.data]);
    
    
    
    return (
            <RedirectUpdateSiswa />
        )
}