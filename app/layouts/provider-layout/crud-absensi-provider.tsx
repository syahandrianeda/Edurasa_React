
import { Outlet} from "react-router";
import { AbsensiCrudProvider } from "~/controllers/absensi-controllers/crud-provider/absensi-crud-provider";
import { SiswaCrudProvider } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import { KaldikCrudProvider } from "~/controllers/kaldik-controller/crud-provider-controller/kaldik-crud-provider";
import AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import KaldikServiceImplements from "~/infrastructures/services/kaldik-service-implements";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";

export default function CrudAbsensiLayout() {
    const service = new KesiswaanServiceImplements();
    const serviceKaldik = new KaldikServiceImplements();
    const serviceAbsensi = new AbsensiServiceImplements();

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