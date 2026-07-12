import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface BubbleButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {

    icon?: ReactNode;

    children?: ReactNode;

    active?: boolean;

}

export function BubbleButton({

    icon,

    children,

    active = false,

    className,

    ...props

}: BubbleButtonProps) {

    return (

        <Button
            type="button"
            variant={
                active
                    ? "default"
                    : "ghost"
            }
            className={cn(

                "h-8",

                "justify-start",

                "gap-2",

                className,

            )}
            {...props}
        >

            {icon}

            {children}

        </Button>

    );

}