import { useMemo }
from "react";

import { useReactIntegration }
from "../integration/useReactIntegration";

import type { ReactValidation }
from "./ReactValidation";

export function useReactValidation():ReactValidation{

    useReactIntegration();

    return useMemo(

        ()=>({

            valid:true

        }),

        []

    );

}