import type { HTMLAttributes } from "react";

import { cn } from "~/lib/utils";

import { BubbleGroupScope } from "./BubbleGroupScope";

interface BubbleToolbarProps
    extends HTMLAttributes<HTMLDivElement> {

    children?: React.ReactNode;

}

export function BubbleToolbar({

    children,

    className,

    ...props

}: BubbleToolbarProps) {

    return (

        <BubbleGroupScope>

            <div
                className={cn(

                    "flex",

                    "flex-col",

                    "gap-1",

                    "rounded-md",

                    "border",

                    "bg-background",

                    "p-1",

                    "shadow-lg",

                    className,

                )}
                {...props}
            >

                {children}

            </div>

        </BubbleGroupScope>

    );

}