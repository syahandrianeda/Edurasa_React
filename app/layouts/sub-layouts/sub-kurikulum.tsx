import { useAppSelector } from "~/context-reduct/hook";
import type { Route } from "./+types/sub-kurikulum";
import PermissionFeature from "~/lib/permission-feature";
import { SubfiturKurikulum } from "~/features/subfitur-kurikulum";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { useMemo } from "react";
import { SampleKontenTtdType } from "~/components/toolbars/kop-ttd/default-ttd";
import AppSidebar from "~/components/ui_edura/app-sidebar";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import AppWorkplace from "~/components/workplace/app-workplace";
import { ToolbarFilterProvider } from "~/components/toolbars/state-toolbar/state-toolbar";
import { ToolbarKopTtdProvider } from "~/components/toolbars/kop-ttd/kop-ttd";
import ToolbarLayout from "./toolbar-layout";
import PrintAreaWithKopTtd from "~/components/toolbars/kop-ttd/print-area-kopttd";
import ModalProvider from "~/components/modals/modal-provider";
import { Outlet } from "react-router";

export default function SubKurikulumLayout({matches}:Route.ComponentProps) {
    
    const user = useAppSelector(state=> state.auth.user);
    const active = useAppSelector(state=>state.loadedApi.loaded);
    const user_permission = user?.permission;
    const result = PermissionFeature(user_permission ?? [], 'view kurikulum', SubfiturKurikulum);
    const loaderDataKiriman = matches.at(-1)?.loaderData as { titleTambahan?: string, toolbarTabs?: TabsConfigProps, controlKelas:controlDropdownKelas, showExport?:boolean } | undefined
    const toolbarTabs = loaderDataKiriman?.toolbarTabs ?? undefined; 
    const controlKelas = loaderDataKiriman?.controlKelas ?? undefined; 
    const titleTambahan = loaderDataKiriman?.titleTambahan ?? '';
    const showExport = loaderDataKiriman?.showExport ?? true;
    const role = user?.roles;
    const filteringConfig = useMemo(() => {
            if (!role) return [];
            return SampleKontenTtdType.filter(item =>
            item.forRole.includes(role)
            );
        }, []);
    
    return (
        <AppSidebar showExport={showExport} desktopHeader="relative" title={"Absensi - "+ titleTambahan} controlKelas={controlKelas}>
            <TopProgressBarFetch active={active} /> 
            <AppWorkplace MainFitur={result}>
                <ToolbarFilterProvider>
                    <ToolbarKopTtdProvider configTtd={filteringConfig}>
                        <ToolbarLayout configToolbar={toolbarTabs}>
                            <PrintAreaWithKopTtd>
                                <ModalProvider>
                                    <Outlet/>
                                    {/* <ModalFiturAbsen/> */}
                                </ModalProvider>
                            </PrintAreaWithKopTtd>
                        </ToolbarLayout>
                    </ToolbarKopTtdProvider>
                </ToolbarFilterProvider>
            </AppWorkplace>
        </AppSidebar>
    )
}   