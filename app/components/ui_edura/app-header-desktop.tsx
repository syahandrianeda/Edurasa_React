import { Link } from "react-router";
import MyHeader from "./my-header";
import MyNav, { MyNavItem } from "./my-nav";
import MyWrapperNav from "./my-wrapper-nav";
import type { NavItem, User } from "~/types";
import EduraLogo from "../logos/edura-logo";
import { currentTapel } from "~/lib/current-tapel";
import AppAuthDropdown from "./app-auth-dropdown";
import AppUserDropdown from "./app-user-dropdown";
import { useSidebar } from "../ui/sidebar";
import { useAppSelector } from "~/context-reduct/hook";

export default function AppHeaderDesktop({navItems, className}:{navItems:NavItem[], className:string}){
    // const {user} = useSidebar();
    const user = useAppSelector((state)=> state.auth.user);

    return (
        <MyHeader className={className}>
            <MyWrapperNav>
                <EduraLogo/>
                <MyNav>
                    <MyNavItem>
                        {className === 'fixed'? ( navItems.map((item)=>(
                                <Link 
                                    key={item.title}    
                                    to={item.href}>
                                    <span className={ item.isActive ? "text-blue-600 font-medium rounded-lg":"text-gray-700 hover:text-blue-600 rounded-lg"}>
                                        {item.title}
                                    </span>
                                    </Link>
                                    )  
                                )
                            ):(
                                <Link 
                                to='/'>
                                <span className="truncate font-medium rounded-lg">
                                    {currentTapel({variant:'long'})}
                                </span>
                                </Link>
                                )
                        }
                    </MyNavItem>
                    {/* <IconProfile/> */}
                    {user?(
                        <AppUserDropdown user={user}/>

                    ):(
                        <AppAuthDropdown/>
                    )}
                </MyNav>
            </MyWrapperNav>
        </MyHeader>
    )
}