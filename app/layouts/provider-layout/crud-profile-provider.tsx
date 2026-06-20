import { useEffect } from "react";
import { Outlet } from "react-router";
import InitNeededSliceStore from "~/context-reduct/bootstrap/init-needeed-store";
import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import { CrudMapelRombel } from "~/controllers/mapel/crud/crud-mapelrombel-provider";
import MapelRombelServiceImplements from "~/infrastructures/services/mapelrombel-service-implements"

export default function CrudProfileLayout() {
    const store = useAppStore();
    const user = useAppSelector(state => state.auth.user);
    const service = new MapelRombelServiceImplements();
    

    useEffect(()=>{
        if(!user) return 
        
        const initRedux = new InitNeededSliceStore(store);
        // initRedux.needSiswa(serviceSiswa);
        // initRedux.needKurikulum(service);
    },[user])
    
    return (
        <CrudMapelRombel service={service}>
            <Outlet />
        </CrudMapelRombel>
    )
}