
import { Outlet, redirect } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar"
import AppContainerMenu from "~/components/ui_edura/app-container-menu"
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { currentTapel } from "~/lib/current-tapel";
import type { Route } from "./+types/menu-siswa-layout";
import type { UserSiswa } from "~/types/user-siswa";
import type { UserPtk } from "~/types";
import { ExportTargetProvider } from "./exports/export-target-provider";
import ModalProvider from "~/components/modals/modal-provider";
import ModalBankSoal from "~/controllers/bank-soal/modal/modal-bank-soal";
import NextModalPaketSoal from "~/controllers/paket-soal/modal/next-modal-paket";
import ModalResponTagihanSiswa from "~/controllers/respon-tagihan-siswa/modal/modal-utama";
import ModalBantuResponseSiswa from "~/controllers/respon-tagihan-siswa/modal/modal-pembantu";

export function clientLoader(){
    const page = getSessionApp<UserSiswa|UserPtk>();
    
    if(!page){
        // throw redirect('/login');
        throw redirect('/');
    }
    if(page){
            if(page.roles !== 'Siswa'){
                throw redirect('/menu')
            }
        }
    return page;
}

export default function AppSiswaLayout({loaderData}:Route.ComponentProps){
     
const navItems = [
    { title: currentTapel({variant:'long'}), href: "/", isActive: false }, 
    
];

    return (
        // <ExportTargetProvider>
            <ModalProvider>
                {/* <SidebarProvider defaultOpen={true}  className="flex-col"> */}
                    <AppContainerMenu desktopHeader="fixed" navItems={navItems}>
                        <Outlet/>
                    </AppContainerMenu>
                {/* </SidebarProvider> */}
                {/* <Outlet/> */}
                <ModalResponTagihanSiswa/>
                <ModalBantuResponseSiswa/>
            </ModalProvider>
        // </ExportTargetProvider>
    )
}