import { cn }
from "~/lib/utils";

import type { EditorCanvasProps }
from "./EditorCanvas.types";

export function EditorCanvas({

    children,

    className

}:EditorCanvasProps){

    return(

        <div

            className={cn(

                "mx-auto",

                "flex",

                "min-h-full",

                "w-full",

                "max-w-4xl",

                "flex-col",

                "bg-background",

                className

            )}

        >

            {children}

        </div>

    );

}