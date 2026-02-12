import { Link } from "react-router";
import { SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import type { NavItem, typeSidebarFiturKonten } from "~/types";
import { NavMainSidebar } from "./nav-main-sidebar";
import AppLogo from "../logos/app-logo";

export default function ContentSidebar({MainFitur=[],FooterFitur=[]}:{MainFitur:typeSidebarFiturKonten[], FooterFitur:NavItem[]}) {
    return(<>
       <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" className="hover:bg-linear-to-br hover:from-sky-300 hover:to-sky-200 dark:from-sky-800 dark:to-sky-700 transition-colors duration-300 ease-linear" asChild tooltip={'Buka Halaman Beranda'}>
                        <Link to='/' prefetch="none">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="scrol-h-custom shadow-lg">
            <NavMainSidebar items={MainFitur} />
        </SidebarContent>

        <SidebarFooter>
            
        </SidebarFooter>
    </>
    )
}   