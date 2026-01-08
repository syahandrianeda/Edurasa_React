
import { useEffect } from "react";
import { Outlet} from "react-router";
import InitNeededSliceStore from "~/context-reduct/bootstrap/init-needeed-store";
import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import { SiswaCrudProvider } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";

export default function CrudSiswaLayout() {
    const store = useAppStore();
    const user = useAppSelector(state => state.auth.user);
    
    const service = new KesiswaanServiceImplements();
    useEffect(()=>{
        
        const initRedux = new InitNeededSliceStore(store);
        initRedux.needSiswa(service);
        
    },[user])
    
    return (
        <SiswaCrudProvider service={service}>
            <Outlet />
        </SiswaCrudProvider>
    )
}