import { cn } from "~/lib/utils";

export default function PrintArea({className, ...props}:React.ComponentProps<'div'>){
    return(
        <div className={cn("w-full min-h-[calc(100vh-5rem)] my-2 p-4 bg-white shadow-lg print:bg-white print:shadow-none print:p-0",
            className)}
        {...props}
        />
    )   
}
