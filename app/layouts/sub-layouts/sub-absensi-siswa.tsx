import { Outlet } from "react-router";
import AppSidebar from "~/components/ui_edura/app-sidebar";
import AppWorkplace from "~/components/workplace/app-workplace";
import { SubfiturAbsensiSiswa } from "~/features/subfitur-absensi-siswa";
import PermissionFeature from "~/lib/permission-feature";
import type { Route } from "./+types/sub-absensi-siswa";
import { useAppSelector } from "~/context-reduct/hook";
import { SampleKontenTtdType } from "~/components/toolbars/kop-ttd/default-ttd";
import { useMemo } from "react";
import type { ToolbarConfigProps } from "~/components/toolbars/config-default-toolbar";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";



export default function SubAbsensiSiswaLayout({matches}:Route.ComponentProps) {
    
    const user = useAppSelector(state=> state.auth.user);
    const user_permission = user?.permission;
    const result = PermissionFeature(user_permission ?? [], 'view absensi siswa', SubfiturAbsensiSiswa);
    const loaderDataKiriman = matches.at(-1)?.loaderData as { titleTambahan?: string, toolbarTabs?: ToolbarConfigProps, controlKelas:controlDropdownKelas } | undefined
    const toolbarTabs = loaderDataKiriman?.toolbarTabs ?? undefined; 
    const controlKelas = loaderDataKiriman?.controlKelas ?? undefined; 
    const titleTambahan = loaderDataKiriman?.titleTambahan ?? '';
    const role = user?.roles;
    const filteringConfig = useMemo(() => {
            if (!role) return [];
            return SampleKontenTtdType.filter(item =>
            item.forRole.includes(role)
            );
        }, []);
    
    return (
        <AppSidebar desktopHeader="relative" title={"Kehadiran - "+ titleTambahan} controlKelas={controlKelas}>
                <AppWorkplace MainFitur={result}>
            <Outlet/>
        </AppWorkplace>
    </AppSidebar>
    )
}   