import { ChevronDown, ChevronUp, Grip, LogOut, Settings, SunMoon } from 'lucide-react';
import * as React from 'react';
import { useInitials } from '~/hooks/use-initials';
import { cn, isSameUrl } from '~/lib/utils';
import { useSidebar } from '../ui/sidebar';
import { Link, useLocation, useNavigate } from 'react-router';
import IconMenu from '../ui_edura/icon-menu';
import { DataMenu } from '~/configs/menu';
import MobileLogo from '../logos/mobile-logo';
import PermissionMenu from '~/lib/permission-menu';
import { useAppDispatch, useAppSelector } from '~/context-reduct/hook';
import AppearanceToggleTab from '../ui_edura/appearance-tabs';
import UserInfo from '../ui_edura/user-info';
import type { UserPtk } from '~/types';
import { useMobileNavigation } from '~/hooks/use-mobile-navigation';
import { clearSessionApp } from '~/infrastructures/session-storage/app-session';
import { setCredentials } from '~/context-reduct/global-state/auth-slice';
import { setFokusRombel } from '~/context-reduct/global-state/fokus-rombel-slice';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { resetSiswa } from '~/context-reduct/global-state/siswa-slice';

export default function FooterMenuEdura(){
    const url = useLocation();
    const user = useAppSelector(s=>s.auth.user) as UserPtk;
    const [hidden, setHidden] =  React.useState(false);
    const [activeLayer, setActiveLayer] = React.useState<'menu' | 'profile' | null>(null);
    const isOpen = activeLayer !== null;
    const getInitials = useInitials();
    const {openMobile, setOpenMobile} = useSidebar();
    const cleanup = useMobileNavigation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleLogout =  () => {
        cleanup();
        // router.flushAll();
        clearSessionApp();
        localStorage.clear(); // kalau memang mau bersih total
        dispatch(
            setCredentials(
                {user:null,name:'auth',loaded:false}
            ),
        )
        dispatch(
            setFokusRombel(
                {value:undefined,name:'fokusRombel',loaded:false}
            )
        )
        dispatch(
            resetSiswa()
        )

        //  const indB = new EduraIndexDB('datasiswa')
        //         await indB.destroy();
        indexedDB.deleteDatabase("edurasa-db")
        navigate("/", {
        replace: true,
        });
    };

    function handleToggle(type: "menu" | "profile") {
        setActiveLayer(prev => (prev === type ? null : type));
        if(openMobile) setOpenMobile(!openMobile);
    }
    const MenuPermission = PermissionMenu(user?.permission ??[], DataMenu)


    return(
        <>
            <button
                onClick={() => setHidden(!hidden)}
                className={cn("fixed bottom-8 z-30 left-1/2 w-24 h-8 -translate-x-1/2 bg-sky-300 dark:bg-sky-700 text-white px-1 pt-0 rounded-t-full shadow-lg flex justify-center",
                    hidden ? "transition-transform duration-300 translate-y-12" : "transition-transform duration-300 -translate-y-4"
                )}
                aria-label="Toggle bottom navigation"
                >
                {hidden ? <ChevronUp size={26} /> : <ChevronDown size={26} />}
            </button>

            <footer
                data-slot="edurasa_footer"
                className={cn("fixed bottom-0 left-0 right-0 z-30 bg-sky-300 dark:bg-sky-700 text-center p-2 mt-8 rounded-t-2xl",
                    hidden ? "translate-y-full transition-transform duration-300" : "translate-y-0 transition-transform duration-300",
                )}
            >
                
                <div className= "flex justify-around md:justify-between items-center max-w-3xl mx-auto rounded-2xl dark:text-white">
                    <div className="border flex m-0 text-sm rounded-2xl">   
                        <Link to='/'>
                            <MobileLogo/>
                        </Link>
                    </div>
                    {!user ? (
                        <>
                            <div className="flex gap-1 text-sm focus-visible:ring-0 flex-col">
                                <button onClick={()=>handleToggle('profile')}  aria-label="Toggle profile">
                                    <span className="self-center">Gabung</span>
                                    <span className="rounded-full w-8 h-8 align-center p-1 rotate-145 text-sm bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        yuk!
                                    </span>
                                </button>
                            </div>
                        </>
                    ):(
                        <>
                        {!isSameUrl(url,'/menu') && (
                            <div className="border dark:border-white flex justify-center w-1/2 ms-5 items-center rounded-2xl">
                                <button onClick={()=>handleToggle('menu')} aria-label="Toggle menu">
                                    <Grip className="text-blue-600 dark:text-white h-8 w-8"/>
                                </button>
                            </div>
                        )}
                            
                            <div className="border flex p-1 text-sm rounded-2xl">
                                <button onClick={()=>handleToggle('profile')}  aria-label="Toggle profile">
                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                        {user.avatar?(
                                                <img src={user.avatar} className="aspect-square size-full bg-radial from-sky-400 to-20% shadow-lg shadow-sky-700" alt="profile poto" referrerPolicy="no-referrer"/>
                                            ):(
                                                <AvatarImage src={user.avatar} alt={user.name} referrerPolicy="no-referrer"/>
                                            )   
                                        }
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </div>
                        </>
                    )
                    }
                    
                </div>
            </footer>
            
            <div
                className={cn("fixed w-full h-4/5 z-20 left-0 bottom-0 px-4 pt-4 pb-0 bg-linear-to-t from-green-400 dark:from-black ",
                (activeLayer === 'menu') ? "transition-all duration-300 ease-out translate-y-0" : "translate-y-full transition-all duration-300 ease-in"
            )}>
                <div
                    onClick={e => e.stopPropagation()}
                    className="h-full bg-[#ACE2E1] dark:bg-linear-to-bl dark:from-sky-900 dark:to-sky-500 mt-4 px-4 pt-4 pb-18 rounded-t-4xl overflow-y-scroll"
                >
                    <h2 className="text-lg font-bold text-black">Menu</h2>
                    <IconMenu menus={MenuPermission} />
                </div>
            </div>
            <div className={cn("fixed w-full h-3/5 z-20 left-0 bottom-0 bg-linear-to-t from-green-400 dark:from-black",
                (activeLayer === 'profile') ? "transition-all duration-300 translate-y-0 ease-out" : "translate-y-full transition-all duration-300 ease-in"
            )}>
                <div onClick={e => e.stopPropagation()} className="text-white p-4 bg-linear-to-br from-sky-600 to-sky-100 dark:from-sky-800 dark:to-sky-700 shadow-sky-300 inner-shadow-sky-700 h-full mx-1">
                    <div className='flex-col space-y-2 w-full pt-2 pb-4 bg-linear-to-tr from-sky-500 to-sky-200 rounded-t-2xl px-2 overflow-hidden'>
                        {
                            user?(
                                <>
                                    <div className="flex flex-row gap-8 py-2 ps-2 text-sky-100 font-extrabold rounded-t-xl align-content-center justify-center focus-visible:ring-0  bg-linear-to-tr from-sky-600">
                                        <UserInfo user={user} showEmail={true}/>
                                    </div>
                                    <div className='flex gap-4 rounded-xl py-2 bg-linear-to-tr from-sky-600 to-sky-100'>
                                        <div className='flex justify-center items-center shadow-lg ms-1 shrink-0 overflow-hidden rounded-xl p-2'>
                                            <SunMoon className="h-8 w-8 text-sky-200 mx-auto"/>
                                        </div>
                                        <AppearanceToggleTab className='bg-linear-to-br from-sky-300 to-sky-100  dark:from-sky-900 dark:to-sky-600 outline-0 ring-0'/>
                                    </div>
                                    <div className='flex gap-4 rounded-xl py-2 bg-linear-to-tr from-sky-600 to-sky-100'>
                                        <div className='flex justify-center items-center shadow-lg ms-1 shrink-0 overflow-hidden rounded-xl p-2'>
                                            <Settings className="h-8 w-8 text-sky-200 mx-auto"/>
                                        </div>
                                        <Link to='/profile' className="w-full flex justify-center items-center border text-black dark:text-white bg-linear-to-tl from-sky-600 to-sky-100 dark:to-sky-300 border-sky-600 rounded-xl inner-shadow-sky-500 shadow-md" role="button">
                                            Edit Profil
                                        </Link>
                                    </div>
                                    <div className='flex gap-4 rounded-xl py-2 bg-linear-to-tr from-sky-600 to-sky-100'>
                                        <div className='flex justify-center items-center shadow-lg ms-1 shrink-0 overflow-hidden rounded-xl p-2'>
                                            <LogOut className="h-8 w-8 text-sky-200 mx-auto"/>
                                        </div>
                                        <button className="block w-full border text-black dark:text-white bg-linear-to-tl from-sky-600 to-sky-100 dark:to-sky-300 border-sky-600 rounded-xl inner-shadow-sky-500 shadow-md" role="button" onClick={handleLogout}>
                                            Log out
                                        </button>
                                    </div>
                                </>
                            ):(
                                <>
                                <div className='text-2xl font-bold'>Yuk Login</div>
                                <Link to='/login' className='items-center justify-center gap-[0.5em] rounded-full bg-sky-700 px-[2em] py-0 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]'>Ke Login</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div> 
            <div
                onClick={() => setActiveLayer(null)}
                className={cn(
                    "fixed inset-0 bg-black/40 transition-opacity duration-300 z-10",
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            />

        </>
    )
}

