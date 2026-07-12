import { cn } from "~/lib/utils";

import type { WorkspaceSurfaceProps } from "./WorkspaceSurface.types";

export function WorkspaceSurface({

    children,

    className

}:WorkspaceSurfaceProps){

    return(

        <div

            className={cn(

                "relative",

                "flex",

                "h-full",

                "w-full",

                "overflow-hidden",

                "border",

                "bg-background",

                className

            )}

        >

            {children}

        </div>

    );

}