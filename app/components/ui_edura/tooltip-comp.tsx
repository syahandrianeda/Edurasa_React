import type { ReactNode } from "react";
import { Tooltip, TooltipTrigger,  TooltipContent } from "../ui/tooltip";

export default function TooltipComp({
    children,
    content}:{children:ReactNode,
    content:string | React.ComponentProps<typeof TooltipContent>
}){
    if (!content) {
        return <>{children}</>
    }   
    let tooltipContent:React.ComponentProps<typeof TooltipContent>;
    if (typeof content === "string") {
        tooltipContent = {
            children: content,
        }
    } else {
        tooltipContent = content
    }   
    return (
        <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
            side="top"      
            align="center"
            {...tooltipContent}
        />
        </Tooltip>
    )
}