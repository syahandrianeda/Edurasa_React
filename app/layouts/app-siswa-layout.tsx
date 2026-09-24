import { Navigate, Outlet, redirect, useLocation } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar"
import { getSessionApp } from "~/infrastructures/session-storage/app-session";

import { ExportTargetProvider } from "./exports/export-target-provider";
import type { Route } from "./+types/app-siswa-layout";

export function clientLoader({}:Route.ComponentProps){
    const page = getSessionApp();
    // console.log('session:\r',page)
    if(!page){
            throw redirect('/');
    }
    return page;
}

export default function AppSiswaLayout({loaderData, matches}:Route.ComponentProps) {
    

    return (
        <ExportTargetProvider>
            <SidebarProvider defaultOpen={true} className="flex-col">
                <Outlet />
            {!loaderData && <Navigate to="/" replace />}
            </SidebarProvider>
        </ExportTargetProvider>
    )
}