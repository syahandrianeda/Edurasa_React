import * as React from "react";
import { cn } from "~/lib/utils";

export function ToolbarContent({children, className}:{children:React.ReactNode, className?:string}){
    return (<div className={cn("w-full group-data-[state=open]:h-full group-data-[state=closed]:h-34  transition-transform duration-1000 ease-in bg-linear-to-tr from-sky-300 to-sky-200 dark:border-2  dark:border-sky-700 dark:from-sky-800 dark:to-sky-700 inner-shadow-sky-100 shadow-lg dark:rounded-md overflow-y-scroll scrol-h-custom", className)}>
        {children}
    </div>)
}
export default function Toolbar({children, className,open, setOpen}: {children: React.ReactNode, className?: string ,
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    
    function handleCollapse(){
        setOpen(!open)
        if(!open){

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth' // Optional: for a smooth animated scroll
                });
    
            };
        }
    

    return (
        <div
            data-slot="toolbar"
            data-state={open ? "open" : "closed"}
            className={cn("group sticky -top-30 z-15 w-full mt-2 shadow-md ps-0 pt-0 mb-6 data-[state=open]:translate-y-0 data-[state=closed]:translate-y-1",
                className
            )}
            >
                {children}
                <button className="absolute bottom-0 left-1/3 md:left-1/2 translate-y-4 mx-auto text-xs bg-linear-to-br from-sky-300 to-sky-200 dark:bg-linear-to-b dark:from-sky-700 dark:to-sky-600 px-4 py-0 rounded-b-3xl"
                        onClick={handleCollapse}
                    >{open ? "Hide" : "Show"} Toolbar</button>
                        
        </div>
    );
}