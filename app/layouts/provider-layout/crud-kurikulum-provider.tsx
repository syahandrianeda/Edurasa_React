import { useEffect } from "react";
import { Outlet } from "react-router";
import InitNeededSliceStore from "~/context-reduct/bootstrap/init-needeed-store";
import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import { CrudAtpProvider } from "~/controllers/kurikulum/crud/crud-atp-provider";
import { CrudElemenCpProvider } from "~/controllers/kurikulum/crud/crud-elemen-cp-provider";
import { CrudTpFaseProvider } from "~/controllers/kurikulum/crud/crud-tp-fase-provider";
import AtpServiceImplements from "~/infrastructures/services/atp-service-implements";

import ElemenCpServiceImplements from "~/infrastructures/services/elemencp-service-implements";
import FaseTpServiceImplements from "~/infrastructures/services/fase-tp-service-implements";

export default function CrudKurikulumLayout() {
    const store = useAppStore();
    const user = useAppSelector(state => state.auth.user);
    console.log('kenali siapa user', user);
    // const service = new KesiswaanServiceImplements();
    const service = new ElemenCpServiceImplements();
    const serviceTpFase = new FaseTpServiceImplements();
    const serviceAtp = new AtpServiceImplements();
    useEffect(()=>{
        if(!user) return 
        
        const initRedux = new InitNeededSliceStore(store);
        initRedux.needKurikulum(service);
    },[user])
    
    return (
        <CrudElemenCpProvider service={service}>
            <CrudTpFaseProvider service={serviceTpFase}>
                <CrudAtpProvider service={serviceAtp}>
                    <Outlet />
                </CrudAtpProvider>
            </CrudTpFaseProvider>
        </CrudElemenCpProvider>
    )
}