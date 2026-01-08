import { cn } from "~/lib/utils"


export default function MyNav({className,  ...props}:React.ComponentProps<'nav'> ) {
   
    return (
        <nav
            data-slot="edurasa_nav"
            className={ cn("flex justify-between",
                className
            )}
            {...props}
        />
    )
}
export function MyNavItem({className,...props}:React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="edurasa_nav_item"
            className={ cn("flex self-center gap-4",
                className
            )}
            {...props}
        />
    )
}