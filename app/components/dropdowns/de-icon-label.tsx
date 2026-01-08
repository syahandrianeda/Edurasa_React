import { Slot } from "@radix-ui/react-slot";
import type { ElementType, ReactNode } from "react";
import { cn } from "~/lib/utils";

type DEIconProps = { className?: string; asChild?: boolean; children?: ReactNode };

export default function DEIconLabel({ className, asChild, children }: DEIconProps) {
    const Comp: ElementType = asChild ? Slot : "span";
    return (
        <Comp className={cn(
            "absolute p-0 text-xs font-semibold left-3 opacity-0 group-hover:opacity-100 group-hover:blur-none transition-opacity duration-1000",
            "[--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden text-ellipsis text-nowrap",
            className
        )}>
            {children}
        </Comp>
    );
}