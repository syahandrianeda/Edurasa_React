import { cn } from "~/lib/utils";

import type { WorkspaceProps }
from "./Workspace.types";

export function Workspace({

    children,

    className

}:WorkspaceProps){

    return(

        <main

            className={cn(

                "flex",

                "h-screen",

                "w-full",

                "overflow-hidden",

                "bg-background",

                "text-foreground",

                className

            )}

        >

            {children}

        </main>

    );

}