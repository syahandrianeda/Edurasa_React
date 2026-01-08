

import { Outlet, redirect } from "react-router";
import { SidebarProvider } from "~/components/ui/sidebar"
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { Route } from "./+types/app-layout";

import { ExportTargetProvider } from "./exports/export-target-provider";
import { useAppSelector } from "~/context-reduct/hook";

export function clientLoader(){
    const page = getSessionApp();
    
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
                </SidebarProvider>
        </ExportTargetProvider>
    )
}