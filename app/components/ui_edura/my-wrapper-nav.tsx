import { cn } from "~/lib/utils";


export default function MyWrapperNav({className,...props}:React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="edurasa_wrapper_nav" 
            className={cn("relative max-w-5xl mx-auto shadow-lg  bg-sky-100/50  dark:bg-sky-600/50 rounded-3xl p-2",
                className
                )
            }
            {...props}
            />
    );
}