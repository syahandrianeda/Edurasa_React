import { cn }
from "~/lib/utils";

import type { WorkspaceThemeProps }
from "./WorkspaceTheme.types";

export function WorkspaceTheme({

    children,

    className

}:WorkspaceThemeProps){

    return(

        <div

            className={cn(

                "bg-background",

                "text-foreground",

                className

            )}

        >

            {children}

        </div>

    );

}