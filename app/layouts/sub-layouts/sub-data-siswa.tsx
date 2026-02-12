import type { Route } from "./+types/sub-data-siswa";
import { Outlet} from "react-router";
import AppSidebar from "~/components/ui_edura/app-sidebar";
import AppWorkplace from "~/components/workplace/app-workplace";
import { SubfiturKesiswaan } from "~/features/data-siswa";
import PermissionFeature from "~/lib/permission-feature";
import { useAppSelector } from "~/context-reduct/hook";
import { ToolbarKopTtdProvider } from "~/components/toolbars/kop-ttd/kop-ttd";
import {useMemo } from "react";
import { SampleKontenTtdType } from "~/components/toolbars/kop-ttd/default-ttd";
import PrintAreaWithKopTtd from "~/components/toolbars/kop-ttd/print-area-kopttd";
import ToolbarLayout from "./toolbar-layout";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import  ModalProvider  from "~/components/modals/modal-provider";
import ModalDataSiswa from "~/controllers/data-siswa-controller/modal-data-siswa";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { ToolbarFilterProvider } from "~/components/toolbars/state-toolbar/state-toolbar";


export default function SubDataSiswaLayout({matches, loaderData}:Route.ComponentProps) {
    // const store = useAppStore()    
    const user = useAppSelector(state=> state.auth.user);
    const active = useAppSelector(state=>state.loadedApi.loaded);
    const user_permission = user?.permission;
    const result = PermissionFeature(user_permission ?? [], 'view data-siswa', SubfiturKesiswaan);
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
        <AppSidebar showExport={showExport} desktopHeader="relative" title={"Kesiswaan - "+ titleTambahan} controlKelas={controlKelas}>
            <TopProgressBarFetch active={active} /> 
            <AppWorkplace MainFitur={result}>
                <ToolbarFilterProvider>
                    <ToolbarKopTtdProvider configTtd={filteringConfig}>
                        <ToolbarLayout configToolbar={toolbarTabs}>
                            <PrintAreaWithKopTtd>
                                <ModalProvider>
                                    <Outlet/>
                                    <ModalDataSiswa/>
                                </ModalProvider>
                            </PrintAreaWithKopTtd>
                        </ToolbarLayout>
                    </ToolbarKopTtdProvider>
                </ToolbarFilterProvider>
            </AppWorkplace>
        </AppSidebar>
)
}   