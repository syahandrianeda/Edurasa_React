import { useEffect } from "react";
import { Outlet, redirect } from "react-router";
import InitNeededSliceStore from "~/context-reduct/bootstrap/init-needeed-store";
import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import { CrudAtpProvider } from "~/controllers/kurikulum/crud/crud-atp-provider";
import { CrudElemenCpProvider } from "~/controllers/kurikulum/crud/crud-elemen-cp-provider";
import { CrudMapelRombel } from "~/controllers/mapel/crud/crud-mapelrombel-provider";
import { CrudTpFaseProvider } from "~/controllers/kurikulum/crud/crud-tp-fase-provider";
import AtpServiceImplements from "~/infrastructures/services/atp-service-implements";

import ElemenCpServiceImplements from "~/infrastructures/services/elemencp-service-implements";
import FaseTpServiceImplements from "~/infrastructures/services/fase-tp-service-implements";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import MapelRombelServiceImplements from "~/infrastructures/services/mapelrombel-service-implements";
import { SettingJadwalCrudProvider } from "~/controllers/jadwal_pelajaran/crud/crud-setting-jadwal-provider";
import SettingJadwalService from "~/infrastructures/services/setting-jadwal-service";
import { SebaranJadwalCrudProvider } from "~/controllers/jadwal_pelajaran/crud/crud-sebaran-jadwal-provider";
import JadwalMapelServiceImplements from "~/infrastructures/services/sebaran-jadwal-mapel";
import { CrudProtaProvider } from "~/controllers/prota/crud/crud-prota-provider";
import ProtaServiceImplements from "~/infrastructures/services/prota-service-implements";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";

export function clientLoader(){
    const page = getSessionApp();
    
    if(!page){
        throw redirect('/login');
    }
    return page;
}
export default function CrudKurikulumLayout() {
    const store = useAppStore();
    const user = useAppSelector(state => state.auth.user);
    const service = new MapelRombelServiceImplements();
    const serviceElemen = new ElemenCpServiceImplements();
    const serviceTpFase = new FaseTpServiceImplements();
    const serviceAtp = new AtpServiceImplements();
    const serviceSiswa = new KesiswaanServiceImplements();
    const serviceSettingJadwal = new SettingJadwalService();
    const serviceSebaranJadwal = new JadwalMapelServiceImplements();
    const serviceProta = new ProtaServiceImplements();

    useEffect(()=>{
        if(!user) return 
        
        const initRedux = new InitNeededSliceStore(store);
        initRedux.needSiswa(serviceSiswa);
        initRedux.needKurikulum(service); 
        
    },[user])
    
    return (
        <CrudMapelRombel service={service}>
            <CrudElemenCpProvider service={serviceElemen}>
                <CrudTpFaseProvider service={serviceTpFase}>
                    <CrudAtpProvider service={serviceAtp}>
                        <SettingJadwalCrudProvider service={serviceSettingJadwal}>
                            <SebaranJadwalCrudProvider service={serviceSebaranJadwal}>
                                <CrudProtaProvider service={serviceProta}>
                                    <Outlet />
                                </CrudProtaProvider>
                            </SebaranJadwalCrudProvider>
                        </SettingJadwalCrudProvider>
                    </CrudAtpProvider>
                </CrudTpFaseProvider>
            </CrudElemenCpProvider>
        </CrudMapelRombel>
    )
}