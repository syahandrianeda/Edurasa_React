import { Outlet, redirect } from "react-router"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import AppHeaderDesktopLogin from "~/components/ui_edura/app-header-login"

import { getSessionApp } from "~/infrastructures/session-storage/app-session";



export function clientLoader(){
    const page = getSessionApp();
    
    if(page){
        throw redirect('/menu');
    }
    return null;
}


export default function AuthLayout() {
    
    return (
        <SidebarProvider defaultOpen={true}  className="flex-col">
            <AppHeaderDesktopLogin className="fixed"/>
            <SidebarInset className="bg-transparent">
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}