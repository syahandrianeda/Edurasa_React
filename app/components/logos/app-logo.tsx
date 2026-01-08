import logo from "../../images/lamaso.webp";

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sky-200 dark:bg-sky-800 text-sidebar-primary-foreground">
                {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
                <img src={logo} alt="edurasa publik" className='mx-auto  dark:text-white text-black shadow-lg'/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Edurasa New Edition
                </span>
            </div>
        </>
    );
}
