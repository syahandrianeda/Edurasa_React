import IconMenu from "~/components/ui_edura/icon-menu";
import { DataMenu } from "~/configs/menu";
import { useAppSelector } from "~/context-reduct/hook";
import PermissionMenu from "~/lib/permission-menu";
import type { UserSiswa } from "~/types/user-siswa";
import RingkasanInfoSiswa from "~/controllers/info-siswa/ringkasan-info-siswa";
import { InstanceDataTagihanPenilaianSector } from "~/context-reduct/selectores/daftar-tagihan-penilaian-selector";
import { useModal } from "~/components/modals/modal-provider";
import { OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector";


export default function AppMenuSiswaPage() {
    const user                          = useAppSelector(state=> state.auth.user) as unknown as  UserSiswa;
    const instancPaketSoal              = useAppSelector(InstanceDataTagihanPenilaianSector);
    const MenuPermission                = PermissionMenu(user?.permission ??[], DataMenu);
    const ormAbsen                      = useAppSelector(OrmAbsensiSelector);
    const {actions:modalActions}        = useModal();
    const ts = useAppSelector(s=>s.absensiSiswa.dataAbsensi);
    // console.log('state Redux ts', ts)
    /**
      const kehadiranSiswaHariIni = useMemo(()=>{
             
             return ormAbsen.dataAbsenToDay(value?.bulan||new Date(),isSabtuLibur).filter(s=>s.status === 'aktif');
             
         },[ormAbsen, value?.bulan, isSabtuLibur,rombel]);
     */
    // console.log(ormAbsen?.dataAbsenToDay(new Date(),false))
    return(
        <>
            <div className="flex flex-col items-center dark:text-black backdrop-blur-lg shadow-lg inset-14 ring-0 border-0 outline-0 py-4 justify-center my-0 md:my-2 mx-auto md:h-[calc(100vh-5rem)] rounded-4xl overflow-y-scroll scrol-h-custom">
               <div className="border-2 rounded-2xl bg-white  w-11/12 mx-auto p-2 mb-4 overflow-y-auto scrol-h-custom">
                    <h3 className='text-xl text-center'>Selamat Datang {user?.name} (Kelas {user.rombel})</h3>
                    {
                        (user && instancPaketSoal) && <RingkasanInfoSiswa 
                                                            instancPaketSoal={instancPaketSoal} 
                                                            user={user}
                                                            instanceAbsensi={ormAbsen}
                                                            actions={modalActions}
                                                            />
                    }
                </div>
                <IconMenu menus={MenuPermission} className="bg-white dark:bg-sky-600 border-sky-800 inner-shadow-sky-300 shadow-md shadow-sky-200 rounded-2xl px-2 py-4 mx-auto"/>
            </div>
        </>
    )
}