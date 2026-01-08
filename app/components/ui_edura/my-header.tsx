import { cn } from "~/lib/utils";


export default function MyHeader({className,...props}:React.ComponentProps<'header'>) {
    return (
        <header
            data-slot="edurasa_header"
            className={ cn("w-full p-1 select-none bg-sky-300 shadow-lg rounded-b-2xl",
                "top-0 left-0 right-0 z-50",
                className
            )}
            {...props}
        />
    )
}