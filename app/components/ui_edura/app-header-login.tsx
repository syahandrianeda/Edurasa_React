
import MyHeader from "./my-header";
import MyNav, { MyNavItem } from "./my-nav";
import MyWrapperNav from "./my-wrapper-nav";
import EduraLogo from "../logos/edura-logo";
import { Link } from "react-router";
import { currentTapel } from "~/lib/current-tapel";
import { Home } from "lucide-react";

export default function AppHeaderDesktopLogin({className}:{ className?:string}){
    
    return (
        <MyHeader className={className}>
            <MyWrapperNav>
                <EduraLogo/>
                <MyNav>
                    <MyNavItem className="ms-auto md:ms-1">
                        <Link 
                            to='/'
                        >
                            <span className="text-gray-700 hover:text-blue-600 rounded-lg">
                                {currentTapel({variant:'long'})}
                            </span>
                            </Link>
                    </MyNavItem>
                    <div className="flex gap-1 focus-visible:ring-0">
                        <span className="rounded-full w-8 h-8 align-center p-1 text-sm bg-sky-300 text-black dark:bg-neutral-700 dark:text-white">
                            <Home />
                        </span>

                    </div>
                </MyNav>
            </MyWrapperNav>
        </MyHeader>
    )
}