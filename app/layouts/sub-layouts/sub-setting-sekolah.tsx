import { Outlet } from "react-router";
import AppSidebar from "~/components/ui_edura/app-sidebar";
import AppWorkplace from "~/components/workplace/app-workplace";
import { SubfiturSettingSekolah } from "~/features/data-sekolah";
import type { Route } from "./+types/sub-setting-sekolah";


export default function SubSettingSekolahLayout({matches}:Route.ComponentProps) {
    
    const titleTambahan = (
                matches.at(-1)?.loaderData as { titleTambahan?: string } | undefined
                )?.titleTambahan ?? '';
    return (
        <AppSidebar desktopHeader="relative" title={"Data Sekolah - "+titleTambahan}>
        <AppWorkplace MainFitur={SubfiturSettingSekolah}>
            <Outlet/>
        </AppWorkplace>
    </AppSidebar>
    )
}   