import { NAMA_APLIKASI_VERSION } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import logo from "../../images/lamaso.webp";

export default function AppLogo() {

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sky-200 dark:bg-sky-800 text-sidebar-primary-foreground">
                <img src={logo} alt={NAMA_APLIKASI_VERSION} className='mx-auto  dark:text-white text-black shadow-lg'/>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {NAMA_APLIKASI_VERSION}
                </span>
            </div>
        </>
    );
}
