import { ConfigToolbarSinkronDapodik } from "~/controllers/data-siswa-controller/sinkron-dapodik/config-sinkron-dapodik";
import type { Route } from "./+types/sinkron-dapodik";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import DapodikServiceImplements from "~/infrastructures/services/dapodik-service-implements";
import { useFetcher, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { useEffect } from "react";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setSiswaDapodik } from "~/context-reduct/global-state/sheet-dapodik-slice";
import type { SiswaDapodikAppToSheet } from "~/types/siswa-dapodik";
import SinkronDapodikPage from "~/pages/sinkron-dapodik";
import { selectSiswaDapodikDTO } from "~/context-reduct/selectores/siswa-dapodik-selector";
import { sheetAkun_dapodik, sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";

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
   
    
    
    const settingRombel: controlDropdownKelas ={
        showControlKelas:true,
        title: 'Kelas',
        description:'Daftar Kelas',
        typeKelas:'rombel'
    }

    return {
            titleTambahan:'Sinkronisasi Dapodik',
            toolbarTabs: ConfigToolbarSinkronDapodik,
            controlKelas: settingRombel,
            showExport:true,
            pesanLoading:'Mempersiapkan Data Dapodik',
                    // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
                    sheetNeeded: [sheetAkun_dataSiswa, sheetAkun_dapodik]
            
        };
}
// export async function clientAction({ request }: Route.ActionArgs){
//     const instCall  = new DapodikServiceImplements();
//     const data = await instCall.loadAllDapodik();
//     return data;
// }
// export default  function SinkronDapodikRoute({actionData}:Route.ComponentProps) {
//     const fetcher = useFetcher<typeof clientAction>();
//     const dispatch = useAppDispatch();

//     const siswaDapodikExist = useAppSelector(selectSiswaDapodikDTO);
//     const hasData = siswaDapodikExist.length > 0;

//     // 1️⃣ trigger API SEKALI
//     useEffect(() => {
//         if (!hasData && fetcher.state === "idle" && fetcher.data == null) {
//             fetcher.submit(null, { method: "post" });
//             dispatch(setloadedApi({ loaded: true,name:'loaded_animation' }));
//         }
//     }, [hasData, fetcher.state]); // ❗ bukan fetcher

//     // 2️⃣ response API
//     useEffect(() => {
        
//         if (fetcher.data?.success) {
//             const data = fetcher.data?.data as unknown as SiswaDapodikAppToSheet[];
//             dispatch(
//                 setSiswaDapodik(data)
//                 // setSiswaDapodik({
//                 //     dapodik: fetcher.data?.data as unknown as SiswaDapodikAppToSheet[],
//                 // })
//             );
//             dispatch(setloadedApi({ loaded: false, name:'loaded_animation' }));
//         }
//     }, [fetcher.data]);
    
//     return (
//             <SinkronDapodikPage />
//         )
// }

export default  function SinkronDapodikRoute({actionData}:Route.ComponentProps) {
    
    return (
            <SinkronDapodikPage />
        )
}