import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "~/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-0.75",
        "rounded-none h-auto border-zync-200 mb-0 p-0 bg-zinc-400/80 rounded-se-xl overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-white inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "rounded-none my-0 py-1 text-sm h-auto px-3 w-auto dark:data-[state=active]:border-none data-[state=active]:bg-radial dark:data-[state=active]:text-sky-900 data-[state=active]:from-sky-100 data-[state=active]:to-sky-300 data-[state=active]:rounded-se-xl data-[state=inactive]:bg-zinc-400 ",
        "dark:focus-visible:outline-0 dark:focus-visible:border-0 dark:focus-visible:ring-0 dark:data-[state=active]:shadow-none ",
        "dark:data-[state=active]:ring-0",
        "relative [&:not(:first-child)[data-state=active]]:after:absolute [&:not(:first-child)[data-state=active]]:after:w-2 [&:not(:first-child)[data-state=active]]:after:h-[calc(100%+2px)] [&:not(:first-child)[data-state=active]]:after:border-b-2 [&:not(:first-child)[data-state=active]]:after:border-zinc-400  [&:not(:first-child)[data-state=active]]:after:bg-zinc-400 [&:not(:first-child)[data-state=active]]:after:top-0 [&:not(:first-child)[data-state=active]]:after:-left-[0.9px] [&:not(:first-child)[data-state=active]]:after:rounded-se-full",
        
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
