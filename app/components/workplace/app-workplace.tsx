import type { typeSidebarFiturKonten } from "~/types";
import { Sidebar, SidebarRail } from "../ui/sidebar";
import ContentSidebar from "../ui_edura/content-sidebar";

interface AppWorkplaceProps {
    children: React.ReactNode;
    MainFitur: typeSidebarFiturKonten[];
}   
export default function AppWorkplace({children, MainFitur}:AppWorkplaceProps){
    return(
        <div className="flex relative">
            <Sidebar side="top" variant="floating" collapsible="icon" className="inset-y-14 mt-2 ms-2 sticky top-12 h-[calc(100vh-3.5rem)] me-1 rounded-md shadow-md">
                <ContentSidebar MainFitur={MainFitur} FooterFitur={[]}/>
                <SidebarRail></SidebarRail>
            </Sidebar>
                {children}
        </div>
            
            

    )
}   