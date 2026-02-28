import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import ExportDropdown from "../dropdowns/export-dropdown";
import RombelDropdown, { type controlDropdownKelas } from "../dropdowns/rombel-dropdown";

export default function AppFiturFloat({
    title, 
    controlKelas , 
    showExport = true
}: {
    title: string,
    controlKelas?: controlDropdownKelas,
    showExport?: boolean
}) {
    const { toggleSidebar} = useSidebar();
    return (
        <div className="flex justify-between w-full">
                <div className="flex space-x-2 items-center w-2/3 md:w-full">
                    <SidebarMenuButton asChild className="h-8 w-8" tooltip={{ children:'Buka/Tutup Sidebar dengan CTRL + B', side:'left' }}>
                        <Button  
                            className="rounded-xl size-9 cursor-pointer bg-radial from-sky-400 to-[#F7EEDD] dark:bg-linear-to-b dark:from-sky-800 shadow-sm dark:to-sky-700 hover:bg-zinc-600 hover:text-blue-600 transition-colors duration-300 p-2 dark:hover:text-blue-100 shadow-[#129cb4]"
                            onClick={(event) => {
                                toggleSidebar()
                            }}
                        >
                            <Menu className="w-5 h-5 text-sky-600 font-medium" />
                            <span className="sr-only">Button Toogle Sidebar</span>
                        </Button>
                    </SidebarMenuButton>
                    <span className="font-medium truncate">{title || 'Menu'}</span>
                </div>
                <div className="flex gap-1 justify-between">
                    {/* {showControlKelas && <MenuSelectRombelKelas title="Kelas"/>}
                    {showPrintable && <ControlDropdownExport/>} */} 
                    {/* {controlKelas && <RombelDropdown {...controlKelas}/>} */}
                    {/* <RombelDropdown {...controlKelas}/> */}
                    <RombelDropdown {...controlKelas} />
                    {showExport && <ExportDropdown title={title}/>}
                </div>
            </div>
    );
}