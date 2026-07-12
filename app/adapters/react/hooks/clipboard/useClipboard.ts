import { useMemo }
from "react";

import { useEditor }
from "../editor/useEditor";

import type { ClipboardHook }
from "./ClipboardHook";

export function useClipboard<TClipboard = unknown>():ClipboardHook<TClipboard>{

    useEditor();

    return useMemo(

        ()=>({

            value:null as TClipboard

        }),

        []

    );

}