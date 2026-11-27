import { useAppSelector } from "~/context-reduct/hook";
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
import { Outlet, redirect } from "react-router";
import ModalFiturKurikulum from "~/controllers/kurikulum/modals/modal-kurikulum";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { Route } from "./+types/sub-buku-raport";
import { subFiturBukuRaport } from "~/features/subfitur-raport";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import { currentTapelProperties } from "~/lib/current-tapel";
import { subFiturIjazah } from "~/features/subfitur-ijazah";
export function clientLoader(){
    const page = getSessionApp();
    
    if(!page){
        throw redirect('/login');
    }
    return page;
}
export default function SubBukuRaportLayout({matches}:Route.ComponentProps) {
    
    const user = useAppSelector(state=> state.auth.user);
    const active = useAppSelector(state=>state.loadedApi.loaded);
    const user_permission = user?.permission;
    const rombel = getSessionRombel();
    const jenjang = getNumberFromString(rombel);
    const semester = currentTapelProperties({variant:'getSemester', tgl:new Date()})
    const isKelas6SemesterGenap = (jenjang === 6 && semester == 2 );
    const subFiturRaport = isKelas6SemesterGenap?subFiturIjazah:subFiturBukuRaport;
    const result = PermissionFeature(user_permission ?? [], 'view raport', subFiturRaport);
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
        <AppSidebar showExport={showExport} desktopHeader="relative" title={"Raport - "+ titleTambahan} controlKelas={controlKelas}>
            <TopProgressBarFetch active={active} /> 
            <AppWorkplace MainFitur={result}>
                <ToolbarFilterProvider>
                    <ToolbarKopTtdProvider configTtd={filteringConfig}>
                        <ToolbarLayout configToolbar={toolbarTabs}>
                            <PrintAreaWithKopTtd>
                                <ModalProvider>
                                    <Outlet/>
                                    {/* <ModalFiturKurikulum/> */}
                                </ModalProvider>
                            </PrintAreaWithKopTtd>
                        </ToolbarLayout>
                    </ToolbarKopTtdProvider>
                </ToolbarFilterProvider>
            </AppWorkplace>
        </AppSidebar>
    )
}   