import { useMemo }
from "react";

import { useReactValidation }
from "../validation/useReactValidation";

import type { ReactArchitecture }
from "./ReactArchitecture";

export function useReactArchitecture():ReactArchitecture{

    useReactValidation();

    return useMemo(

        ()=>({

            locked:true

        }),

        []

    );

}
