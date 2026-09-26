import IconMenu from "~/components/ui_edura/icon-menu";
import { DataMenu } from "~/configs/menu";
import { useAppSelector } from "~/context-reduct/hook";
import PermissionMenu from "~/lib/permission-menu";
import InfoSiswa from "./siswa/info-menu-siswa";


export default function AppMenuSiswaPage() {
    const user = useAppSelector(state=> state.auth.user);
    
    const MenuPermission = PermissionMenu(user?.permission ??[], DataMenu)
    
    return(
        <>
            <div className="flex flex-col items-center dark:text-black backdrop-blur-lg shadow-lg inset-14 ring-0 border-0 outline-0 py-4 justify-center my-0 md:my-2 mx-auto md:h-[calc(100vh-5rem)] rounded-4xl overflow-y-scroll scrol-h-custom">
                {
                    user?.jabatan === 'Siswa' && <InfoSiswa/>
                }
                <IconMenu menus={MenuPermission} className="bg-white dark:bg-sky-600 border-sky-800 inner-shadow-sky-300 shadow-md shadow-sky-200 rounded-2xl px-2 py-4 mx-auto"/>
            </div>
        </>
    )
}