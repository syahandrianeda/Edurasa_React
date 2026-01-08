import { cn } from "~/lib/utils";

export function AppFloatingTopBar({className,...props}:React.ComponentProps<'div'>){
    return(
        <div className={cn("sticky top-0 left-0 w-full  p-2 mt-0 z-20 bg-linear-to-b from-sky-200 to-sky-300 dark:bg-linear-to-b dark:from-sky-800 shadow-lg dark:to-sky-700 rounded-b-md transition-all duration-300",
            "overflow-x-hidden",
            className
        )}
        {...props}
        />
    )
}   
