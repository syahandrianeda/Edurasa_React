import { ScrollArea }
from "~/components/ui/scroll-area";

import { cn }
from "~/lib/utils";

import type { WorkspaceViewportProps }
from "./WorkspaceViewport.types";

export function WorkspaceViewport({

    children,

    className

}:WorkspaceViewportProps){

    return(

        <ScrollArea

            className={cn(

                "h-full",

                "w-full",

                className

            )}

        >

            <div

                className="flex min-h-full min-w-full"

            >

                {children}

            </div>

        </ScrollArea>

    );

}