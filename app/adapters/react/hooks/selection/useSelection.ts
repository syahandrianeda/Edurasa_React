import { useMemo }
from "react";

import { useDocument }
from "../document/useDocument";

import type { SelectionHook }
from "./SelectionHook";

export function useSelection<TSelection = unknown>():SelectionHook<TSelection>{

    useDocument();

    return useMemo(

        ()=>({

            value:null as TSelection

        }),

        []

    );

}