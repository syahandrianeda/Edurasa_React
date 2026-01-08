import { Slot } from "@radix-ui/react-slot"
import { useSidebar } from "../ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cn } from "~/lib/utils"

export default function CompTooltip({
    asChild = false,
    isActive = false,
    tooltip,
    sideTooltip = "bottom",
    className,
    ...props
}: React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
    sideTooltip?: "top" | "right" | "bottom" | "left"
} ) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="button tooltip"
      className={cn("border-0", className)}
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
        side={sideTooltip}
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}
