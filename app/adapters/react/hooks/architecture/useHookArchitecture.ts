import { useMemo }
from "react";

import { useHookValidation }
from "../validation/useHookValidation";

import type { HookArchitecture }
from "./HookArchitecture";

export function useHookArchitecture():HookArchitecture{

    useHookValidation();

    return useMemo(

        ()=>({

            locked:true

        }),

        []

    );

}