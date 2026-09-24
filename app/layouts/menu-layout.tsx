
import { redirect } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar"
import AppContainerMenu from "~/components/ui_edura/app-container-menu"
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import App from "~/root"
import type { Route } from "./+types/menu-layout";
import { currentTapel } from "~/lib/current-tapel";

export function clientLoader(){
    const page = getSessionApp();
    
    if(!page){
        // throw redirect('/login');
        throw redirect('/');
    }
    return page;
}

export default function AppLayout({loaderData}:Route.ComponentProps){
    
const navItems = [
    { title: currentTapel({variant:'long'}), href: "/", isActive: false },
    
];

    return (
        <SidebarProvider defaultOpen={true}  className="flex-col">
            <AppContainerMenu desktopHeader="fixed" navItems={navItems}>
                <App/>
            </AppContainerMenu>
        </SidebarProvider>
    )
}