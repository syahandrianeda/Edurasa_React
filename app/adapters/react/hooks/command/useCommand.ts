import { useMemo }
from "react";

import { useEditor }
from "../editor/useEditor";

import type { CommandHook }
from "./CommandHook";

export function useCommand():CommandHook{

    const editor =

        useEditor();

    return useMemo(

        ()=>({

            execute:editor.execute

        }),

        [editor]

    );

}