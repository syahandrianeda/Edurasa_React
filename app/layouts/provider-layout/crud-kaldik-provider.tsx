
import { useEffect } from "react";
import { Outlet} from "react-router";
import InitNeededSliceStore from "~/context-reduct/bootstrap/init-needeed-store";
import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import { KaldikCrudProvider } from "~/controllers/kaldik-controller/crud-provider-controller/kaldik-crud-provider";
import KaldikServiceImplements from "~/infrastructures/services/kaldik-service-implements";

export default function CrudKaldikLayout() {
    const store = useAppStore();
    const user = useAppSelector(state => state.auth.user);
    
    const service = new KaldikServiceImplements();
    useEffect(()=>{
        if(!user) return 
        
        const initRedux = new InitNeededSliceStore(store);
        initRedux.needKaldik(service);
    },[user])
    
    return (
        <KaldikCrudProvider service={service}>
            <Outlet />
        </KaldikCrudProvider>
    )
}