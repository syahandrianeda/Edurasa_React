import { Outlet } from "react-router";
import AppSidebar from "~/components/ui_edura/app-sidebar";
import AppWorkplace from "~/components/workplace/app-workplace";
import { SubfiturKaldik } from "~/features/subfitur-kaldik";


export default function SubKaldikLayout() {
    return (
        <AppSidebar desktopHeader="relative" title="Kalendar Pendidikan">
        <AppWorkplace MainFitur={SubfiturKaldik}>
            <Outlet/>
        </AppWorkplace>
    </AppSidebar>
    )
}   