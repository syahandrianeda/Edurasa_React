import { cn } from "~/lib/utils";

import { Separator }
from "~/components/ui/separator";

import type { EditorToolbarProps }
from "./EditorToolbar.types";

export function EditorToolbar({

    children,

    className

}:EditorToolbarProps){

    return(

        <div

            className={cn(

                "flex",

                "items-center",

                "gap-1",

                "border-b",

                "bg-background",

                "px-2",

                "py-1",

                className

            )}

        >

            {children}

            <Separator

                orientation="vertical"

                className="mx-1 h-5"

            />

        </div>

    );

}