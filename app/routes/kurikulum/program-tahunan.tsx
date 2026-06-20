import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/program-tahunan";
import { useAppSelector } from "~/context-reduct/hook";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { Fragment, useMemo } from "react";
import { jadwalPelajaranAppSelector, jadwalPelajaranAppSelectorAll } from "~/context-reduct/selectores/jadwal-pelajaran-selector";
import { KurmerDtoSelector, PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import { ConfigToolbarSelectMapel } from "~/controllers/kurikulum/toolbar/config-toolbar-select.mapel";
import OrmProta from "~/domain/kurikulum/orm-prota";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import ProtaPage from "~/pages/kurikulum/prota-page";
import { DtoProtaSelector } from "~/context-reduct/selectores/prota-selector";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import OrmPromes from "~/domain/kurikulum/orm-promes";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { redirect } from "react-router";

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
        titleTambahan:'Program Tahunan',
        controlKelas: settingRombel,
        toolbarTabs:ConfigToolbarSelectMapel,//ConfigToolbarJadwalMapelAll
    };
}

export default function ProgramTahunanRoutePage({loaderData}: Route.ComponentProps) {
    const ormKaldik = useAppSelector(instanceOfKaldik);
    const jadwal = useAppSelector(jadwalPelajaranAppSelector);
    const cpFaseAtp = useAppSelector(KurmerDtoSelector);
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const prota = useAppSelector(DtoProtaSelector);
    const user = useAppSelector(state=>state.auth.user);
    const instansiasi = useMemo(()=>{
        const kaldik = ormKaldik;
        const inprota = user && new OrmProta(cpFaseAtp,jadwal,kaldik,fokusMapel,rombel ?? getSessionRombel(),user,prota).init();//.createKoleksiMapelInJadwal().koleksiMapelInJadwal
        return inprota
    },[ormKaldik,fokusMapel,cpFaseAtp,jadwal,rombel,user,prota]);
    
    if(!instansiasi) return 'Not Found'
    return(
        
            <ProtaPage prota={instansiasi}/>
            
    )
}