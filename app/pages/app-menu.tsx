import { useSidebar } from "~/components/ui/sidebar";
import IconMenu from "~/components/ui_edura/icon-menu";
import { DataMenu } from "~/configs/menu";
import { useAppSelector } from "~/context-reduct/hook";
import PermissionMenu from "~/lib/permission-menu";


export default function AppMenuPage() {
    const user = useAppSelector(state=> state.auth.user);
    
    const MenuPermission = PermissionMenu(user?.permission ??[], DataMenu)

    return(
        <>
            <div className="flex items-baseline backdrop-blur-lg shadow-lg inset-14 ring-0 border-0 outline-0 py-4 justify-center max-w-5xl md:min-w-6xl my-0 md:my-2 mx-auto md:h-[calc(100vh-5rem)] rounded-4xl overflow-y-scroll scrol-h-custom">
                <IconMenu menus={MenuPermission} />
            </div>
        </>
    )
}