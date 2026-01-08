import * as React from "react";
import {SidebarInset,useSidebar } from "../ui/sidebar";
import type { NavItem } from "~/types";
import AppHeaderDesktop from "./app-header-desktop";
import { AppFloatingTopBar } from "../workplace/app-floating-bar";
import AppFiturFloat from "./app-fitur-float";
import FooterMenuEdura from "../footer-menu/footer-menu";
import type { controlDropdownKelas } from "../dropdowns/rombel-dropdown";



interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
    navItems?: NavItem[]
    desktopHeader?: 'relative'|'fixed',
    title: string,
    controlKelas?: controlDropdownKelas,
    showExport?: boolean,
}

export default function AppSidebar({
    variant='sidebar',
    children, 
    navItems = [],
    desktopHeader = 'fixed',
    title,
    controlKelas,
    showExport,
    ...props
}:AppContentProps ){
    const {isMobile} = useSidebar();
    if(isMobile){
        return(
            <>
                <AppFloatingTopBar>
                    <AppFiturFloat title={title}  controlKelas={controlKelas} showExport={showExport}/>
                </AppFloatingTopBar>
                
                <SidebarInset {...props} className="bg-transparent">
                    {children}
                </SidebarInset>
                <FooterMenuEdura/>
            </>
        )
    }
    //
    return (
        <>
            <AppHeaderDesktop navItems={navItems} className={desktopHeader}/>
            <SidebarInset className={`${(desktopHeader==='fixed')?'pt-14':'max-w-6xl mx-auto  bg-white/70 dark:bg-zinc-600/50'}`} {...props}>
                <AppFloatingTopBar>
                    <AppFiturFloat title={title}  controlKelas={controlKelas} showExport={showExport}/>
                </AppFloatingTopBar>
                {children}
            </SidebarInset>
        </>
        
    )
}