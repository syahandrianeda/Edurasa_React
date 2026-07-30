import { Outlet } from "react-router";
import AppSidebar from "~/components/ui_edura/app-sidebar";
import AppWorkplace from "~/components/workplace/app-workplace";
import SubToolbarLayout from "./sub-toolbar";
import { useMemo } from "react";
import { SampleKontenTtdType } from "~/components/toolbars/kop-ttd/default-ttd";
import { useAppSelector } from "~/context-reduct/hook";
import type { Route } from "./+types/sub-kaldik";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import PrintAreaWithKopTtd from "~/components/toolbars/kop-ttd/print-area-kopttd";
import ModalProvider from "~/components/modals/modal-provider";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import PermissionFeature from "~/lib/permission-feature";
import { SubfiturAdminsitrsiSurat } from "~/features/subfitur-administrasi-surat";
import ModalSurat from "~/controllers/surat/modals/modal-surat";
import ModalPraCetak from "~/controllers/modal-cetak/print-preview-modal";
import NextModalSurat from "~/controllers/surat/modals/next-modal-surat";


export default function SubAdministrasiSuratLayouts({matches, loaderData}:Route.ComponentProps) {
    const user = useAppSelector(state=> state.auth.user);
        const active = useAppSelector(state=>state.loadedApi.loaded);
        const user_permission = user?.permission;
        const result = PermissionFeature(user_permission ?? [], 'view administrasi surat', SubfiturAdminsitrsiSurat);
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
        <AppSidebar showExport={showExport} desktopHeader="relative" title={"Persuratan - "+ titleTambahan} controlKelas={controlKelas}>
        <TopProgressBarFetch active={active} /> 
        <AppWorkplace MainFitur={result}>
            <SubToolbarLayout filteringConfig={filteringConfig} toolbarTabs={toolbarTabs} >
                <PrintAreaWithKopTtd>
                    <ModalProvider>
                        <Outlet/>
                        <ModalSurat/>
                        <NextModalSurat/>
                        <ModalPraCetak/>
                    </ModalProvider>
                </PrintAreaWithKopTtd>
            </SubToolbarLayout>
        </AppWorkplace>
    </AppSidebar>
    )
}   