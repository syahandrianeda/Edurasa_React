import { AtSignIcon, LogIn } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link } from "react-router";
import { Separator } from "../ui/separator";


export default function AppAuthDropdown(){

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex gap-1 focus-visible:ring-0">
                    <span className="self-center">Gabung</span>
                    <span className="rounded-full w-8 h-8 align-center p-1 -rotate-15 text-sm bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        yuk!
                    </span>

                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                    align="end"
                    side='bottom'
                    className="bg-linear-to-bl from-sky-600 to-sky-300"
                >
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link className="block w-full" to='/login' role="button">
                            <LogIn className="mr-2"/>
                            Login
                        </Link>
                    </DropdownMenuItem>
                    <Separator/>
                    <DropdownMenuItem asChild>
                        <Link className="block w-full focus-visible:ring-0" to='/register' role="button">
                            <AtSignIcon className="mr-2"/>
                            Register
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}