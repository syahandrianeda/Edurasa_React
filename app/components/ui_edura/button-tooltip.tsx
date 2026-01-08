import { Slot } from "@radix-ui/react-slot";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "~/lib/utils";
import { sidebarMenuButtonVariants } from "../ui/sidebar";
import type { VariantProps } from "class-variance-authority";

export default function ButtonTooltip({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
    }: React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>){

    const Comp = asChild ? Slot : "button";

    const button = (
        <Comp
        data-slot="button-tooltip"
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
        />
    )

    if (!tooltip) {
        return button
    }

    if (typeof tooltip === "string") {
        tooltip = {
        children: tooltip,
        }
    }

    return (
        <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
            side="bottom"
            align="center"
            {...tooltip}
        />
        </Tooltip>
    )
}