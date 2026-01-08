import type {UserPtk } from "~/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import UserInfo from "./user-info";
import { UserMenuContent } from "./user-menu-content";

export default function AppUserDropdown({user}:{user:UserPtk}){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex flex-row-reverse gap-2 align-content-center justify-center focus-visible:ring-0">
                    <UserInfo user={user} showEmail={false}/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                side='bottom'
                className="bg-linear-to-br from-sky-300 to-sky-100  dark:from-sky-900 dark:to-sky-600  outline-0 ring-0"
            >
                <UserMenuContent user={user} />
            </DropdownMenuContent>


        </DropdownMenu>
    )
}