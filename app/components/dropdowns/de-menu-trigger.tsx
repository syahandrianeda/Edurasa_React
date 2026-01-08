import { cn } from "~/lib/utils";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function DEMenuTrigger({children}:{children?: React.ReactNode}){
    return(
        <DropdownMenuTrigger
                className="group relative cursor-pointer h-8 w-8 right-1 mx-auto hover:w-32.5! transition-all duration-[0.75s] outline-hidden border-none rounded-full flex flex-row items-center justify-center shadow-sm shadow-[#129cb4] data-[state=open]:w-32.5!">
                {children}
            </DropdownMenuTrigger>
    )
}
