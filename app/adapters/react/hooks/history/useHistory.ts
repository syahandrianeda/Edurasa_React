import { useMemo }
from "react";

import { useEditor }
from "../editor/useEditor";

import type { HistoryHook }
from "./HistoryHook";

export function useHistory<THistory = unknown>():HistoryHook<THistory>{

    useEditor();

    return useMemo(

        ()=>({

            value:null as THistory

        }),

        []

    );

}