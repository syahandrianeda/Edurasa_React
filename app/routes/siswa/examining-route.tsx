
import type { Route } from "./+types/examining-route";
import { useAppSelector } from "~/context-reduct/hook";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import { useMemo } from "react";
import { Navigate } from "react-router";
import ExaminatorPage from "~/pages/siswa/examinitor-page";

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

export async function clientLoader({
    params,
}: Route.ClientLoaderArgs){
    const data = params.paketSoalId;
    return {
        titleTambahan:'Siap kerjakan',
        // controlKelas: settingRombel,
        // toolbarTabs: ConfigToolbarSelectMapel,
        // showExport:true
        data,
        showExport:false
    };
}

export default function ExaminingRoute({loaderData}:Route.ComponentProps) {
    const dataSoal = useAppSelector(InstanceDataTagihanPenilaianSector);
    const idSoal = loaderData?.data;
    const dataSoalSelected = useMemo(()=>{
        if(!idSoal) return 
        const id = Number(idSoal)
        return dataSoal?.dataTagihanHasResponse.find(s=> s.idbaris === id)

    }, [idSoal, dataSoal])
    

    if(!dataSoalSelected){
        return <Navigate to="/menu-siswa" replace />
    }
    return(
        <ExaminatorPage data={dataSoalSelected}/>
    )
}