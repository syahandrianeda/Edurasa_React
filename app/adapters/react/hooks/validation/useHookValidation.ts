import { useMemo }
from "react";

import { useShortcut }
from "../shortcut/useShortcut";

import type { HookValidation }
from "./HookValidation";

export function useHookValidation():HookValidation{

    useShortcut();

    return useMemo(

        ()=>({

            valid:true

        }),

        []

    );

}