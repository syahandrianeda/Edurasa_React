import { cn } from "~/lib/utils";
import logo from "../../images/lamaso.webp";
export default function MobileLogo({className, ...props}: React.ComponentProps<'div'>){
    return(
        <div className={cn("relative rounded-2xl text-center border shadow-lg bg-white dark:bg-black w-[30px] h-[30px] my-1", 
            className)
        }>
            <img src={logo} alt="edurasa publik" className='mx-auto align-self-center'/>
        </div>
    )
}