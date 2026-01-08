import * as React from "react";
import { SidebarInset, useSidebar } from "../ui/sidebar";
import type { NavItem } from "~/types";
import AppHeaderDesktop from "./app-header-desktop";


interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
    navItems?: NavItem[]
    desktopHeader?: 'relative'|'fixed'
}

export default function AppContainerMenu({
    variant='sidebar',
    children, 
    navItems = [],
    desktopHeader = 'fixed',
    ...props
}:AppContentProps){
    const {isMobile} = useSidebar();
    if(isMobile){
        return(
            <>
                <AppHeaderDesktop navItems={navItems} className={desktopHeader}/>
                <SidebarInset {...props} className="bg-transparent pt-14">{children}</SidebarInset>
                
            </>
        )
    }
    //
    return (
        <>
            <AppHeaderDesktop navItems={navItems} className={desktopHeader}/>
            
            <SidebarInset className={`${(desktopHeader==='fixed')?'pt-14':''} bg-transparent`} {...props}>{children}</SidebarInset>
        </>
        
    )
}