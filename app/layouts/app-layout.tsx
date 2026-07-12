

import { Navigate, Outlet, redirect, useLocation } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar"
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { Route } from "./+types/app-layout";
import { ExportTargetProvider } from "./exports/export-target-provider";

export function clientLoader({}:Route.ComponentProps){
    const page = getSessionApp();
    // console.log('session:\r',page)
    if(!page){
            throw redirect('/login');
    }
    return page;
}

export default function AppLayout({loaderData}:Route.ComponentProps) {
    
    

    return (
        <ExportTargetProvider>
            <SidebarProvider defaultOpen={true} className="flex-col">
                <Outlet />
            {!loaderData && <Navigate to="/login" replace />}
            </SidebarProvider>
        </ExportTargetProvider>
    )
}