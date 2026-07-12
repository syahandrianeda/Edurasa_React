import { useMemo }
from "react";

import { useReactHostAdapter }
from "../adapter/useReactHostAdapter";

import type { ReactEditorApi }
from "./ReactEditorApi";

export function useReactEditorApi():ReactEditorApi{

    const adapter=

        useReactHostAdapter();

    return useMemo(

        ()=>({

            execute:adapter.execute

        }),

        [adapter]

    );

}