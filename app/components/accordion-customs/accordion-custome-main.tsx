import { cn } from "~/lib/utils";
import { Accordion, AccordionTrigger } from "../ui/accordion";
import { Accordion as AccordionPrimitive } from "radix-ui";

export function AccordionCustomeMain({className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>
){
    return (
        <Accordion 
            className={cn("bg-sky-200 rounded-2xl", className)}
            {...props}
        />
    )
}

export function AccordionCustomeTrigger({label, classNameLabel, className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
    classNameLabel?:string,
    label:string
}){
    return (
        <AccordionTrigger 
            className={cn("pt-1 pb-0 relative hover:no-underline rounded-tl-none bg-transparent rounded-b-none [&[data-state=closed]>div]:after:content-['↓'] [&[data-state=closed]>div]:after:left-1/2 [&[data-state=closed]>div]:after:absolute ", className)} 
            {...props}
            >
                <div className="border md:w-2/3 ps-1 bg-white text-xs rounded-tr-2xl mb-0 outline-none" title="buka/tutup">
                {label}

                </div>
            </AccordionTrigger>

    )
}