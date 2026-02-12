
import { SidebarProvider } from "~/components/ui/sidebar"
import AppContainer from "~/components/ui_edura/app-container"
import App from "~/root"
import type { Route } from "./+types/home-layout";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";

const navItems = [
    { title: "Beranda", href: "/", isActive: true },
    { title: "Tentang", href: "/about", isActive: false },
    { title: "Kontak", href: "/contact", isActive: false },
];



export function clientLoader(){
    const page = getSessionApp();
    
    return page
}

export default function HomeLayout({loaderData}:Route.ComponentProps){
    return (
        <SidebarProvider defaultOpen={true} >
            <AppContainer navItems={navItems}>
                <App/>
            </AppContainer>
        </SidebarProvider>
    )
}