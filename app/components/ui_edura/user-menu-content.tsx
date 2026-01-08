import { useMobileNavigation } from "~/hooks/use-mobile-navigation";
import type { User } from "~/types";
import UserInfo from "./user-info";
import { Grid, Home, LogOut, Settings, SunMoon } from "lucide-react";
import { Link,  Navigate,  redirect,  useLocation, useNavigate } from "react-router";
import { isSameUrl } from "~/lib/utils";
import AppearanceToggleTab from "./appearance-tabs";
import { 
    DropdownMenuGroup, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuSub, 
    DropdownMenuSubContent, 
    DropdownMenuSubTrigger 
} from "../ui/dropdown-menu";
import { clearSessionApp } from "~/infrastructures/session-storage/app-session";
import { Button } from "../ui/button";
import { useAppDispatch } from "~/context-reduct/hook";
import { logout, setCredentials } from "~/context-reduct/global-state/auth-slice";
import { setFokusRombel } from "~/context-reduct/global-state/fokus-rombel-slice";
import EduraIndexDB from "~/infrastructures/indexDb/indexdb-class";
import { resetSiswa } from "~/context-reduct/global-state/siswa-slice";

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const url = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        cleanup();
        // router.flushAll();
        clearSessionApp();
        localStorage.clear(); // kalau memang mau bersih total
        dispatch(
            setCredentials(
                {user:null}
            ),
        )
        dispatch(
            setFokusRombel(
                {value:null}
            )
        )
        dispatch(
            resetSiswa()
        )
        const indB = new EduraIndexDB('datasiswa')
        await indB.destroy();

        navigate("/", {
        replace: true,
        });
    };

    return (
        <>
        <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className='relative flex items-center gap-2 rounded-sm px-2 py-1.5 outline-hidden'>
                            <SunMoon className="h-4 w-4"/>
                            <span className="ml-1.5 text-sm">Mode</span>
                        </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className='bg-linear-to-br from-sky-400 to-sky-200 dark:from-sky-900 dark:to-sky-600 outline-0 ring-0'>
                        <DropdownMenuItem asChild variant='destructive'>
                            <AppearanceToggleTab className='flex-col bg-linear-to-br from-sky-300 to-sky-100  dark:from-sky-900 dark:to-sky-600 outline-0 ring-0'/>

                        </DropdownMenuItem>

                    </DropdownMenuSubContent>
                </DropdownMenuSub>

            <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" to='/profile' role="button" onClick={cleanup}>
                        <Settings className="mr-2" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>

                    {isSameUrl(url.pathname,'/menu')?(
                        <Link className="block w-full" to='/' role="button" onClick={cleanup}>
                            <Home className="mr-2" />
                            Beranda
                        </Link>
                    ):(

                        <Link className="block w-full" to='/menu' role="button" onClick={cleanup}>
                            <Grid className="mr-2" />
                            Menu
                        </Link>
                    )}
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <button className="block w-full" role="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </button>
            </DropdownMenuItem>
            
        </>
    );
}
