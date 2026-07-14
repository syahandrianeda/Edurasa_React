
// import { useEffect } from "react";
import { Outlet} from "react-router";
// import InitNeededSliceStore from "~/context-reduct/bootstrap/init-needeed-store";
// import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import { AbsensiCrudProvider } from "~/controllers/absensi-controllers/crud-provider/absensi-crud-provider";
import { SiswaCrudProvider } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import { KaldikCrudProvider } from "~/controllers/kaldik-controller/crud-provider-controller/kaldik-crud-provider";
import AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import KaldikServiceImplements from "~/infrastructures/services/kaldik-service-implements";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";

export default function CrudAbsensiLayout() {
    // const store = useAppStore();
    // const user = useAppSelector(state => state.auth.user);
    // const rombel = useAppSelector(state=>state.fokusRombel.value);
    
    const service = new KesiswaanServiceImplements();
    const serviceKaldik = new KaldikServiceImplements();
    const serviceAbsensi = new AbsensiServiceImplements();
    
    // useEffect(()=>{
    //     if(!user) return 
        
    //     // const initRedux = new InitNeededSliceStore(store);
    //     // initRedux.needSiswa(service);
    //     // initRedux.needAbsensiAndKaldik(rombel??'1A',serviceAbsensi);
    // },[user, rombel])
    
    return (
        <SiswaCrudProvider service={service}>
            <KaldikCrudProvider service={serviceKaldik}>
                <AbsensiCrudProvider service={serviceAbsensi}>
                    <Outlet />
                </AbsensiCrudProvider>
            </KaldikCrudProvider>
        </SiswaCrudProvider>
    )
}