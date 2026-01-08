import { cn } from "~/lib/utils";
import logo from "../../images/lamaso.webp";

export default function EduraLogo({className, ...props}: React.ComponentProps<'div'>){
    return(
        <div className={cn("absolute rounded-2xl text-center -top-2 bottom-0 mb-1 border shadow-lg bg-white dark:bg-black l md:left-1/2 md:-translate-x-6 w-[50px] h-[50px] my-1", 
            className)
        }>
            <img src={logo} alt="edurasa publik" className='mx-auto'/>
            <span className='absolute bg-white truncate top-1/2 left-0 -rotate-15 font-extrabold text-red-600 -translate-y-2 translate-x-2 text-[10px] leading-none transition-all duration-1000 starting:opacity-0 starting:translate-x-10 starting:rotate-180'>New Edition</span>
        </div>
    )
}