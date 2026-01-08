import { Link, useLocation } from "react-router";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { Fragment } from "react/jsx-runtime";
import { resolveUrl } from "~/lib/utils";
import type { typeSidebarFiturKonten } from "~/types";


export function NavMainSidebar({ items = [] }: { items: typeSidebarFiturKonten[] }) {
    const page = useLocation();
    const {isMobile, toggleSidebar} = useSidebar()
    return (
        <SidebarGroup className="py-2">
            {items.map(({groupTitle, breadCrumbs},index)=>(
                <Fragment key={index}>
                    <SidebarGroupLabel className='rounded-t-xl rounded-b-none bg-linear-to-tl from-sky-600 to-sky-100 font-medium dark:text-sky-900'>{groupTitle}</SidebarGroupLabel>
                    <SidebarMenu className='gap-0 mb-3 border-s-2 md:border-none ps-1 pe-2 border-sky-600/50 bg-radial from-sky-100 to-sky-600 group-data-[collapsible=icon]:rounded-xl rounded-b-xl pt-0 pb-2'>
                        {breadCrumbs.map((item) => (
                            <SidebarMenuItem key={item.title} className='py-0'>
                                <SidebarMenuButton
                                    asChild
                                    isActive={page.pathname.startsWith(
                                        resolveUrl(item.href),
                                    )}
                                    tooltip={{ children: item.title + ` (${item.description})` }}
                                    onClick={()=>isMobile ? toggleSidebar(): null}
                                    className='mb-0 shadow-lg h-fit data-[active=true]:bg-linear-to-l data-[active=true]:from-sky-500 data-[active=true]:to-rose-200 data-[active=true]:hover:bg-linear-to-tr'
                                >
                                    <Link to={{pathname:`${item.href}`}} className={`w-full bg-linear-to-l from-sky-500 to-[#F5F1DC]  hover:bg-linear-to-tr my-1 transition-colors duration-1000 dark:text-sky-900 ${isMobile && '[&>svg]:size-8 py-3 my-1'}`}>
                                        {isMobile?(
                                            <>
                                                {item.icon && <item.icon className='p-0 text-sky-700'/>}
                                                <div className='flex flex-col gap-0'>
                                                    <span className='truncate font-medium mb-0'>{item.title}</span>
                                                    <span className='truncate font-[8px]'>{item.description}</span>
                                                </div>
                                            </>
                                        ):(
                                            <>
                                                {item.icon && <item.icon />}
                                                <span className='truncate text-sm'>{item.title}</span>
                                            </>
                                            
                                        )}
                                            
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </Fragment>
            ))

            }
        </SidebarGroup>
    );
}
