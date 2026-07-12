import { useMemo }
from "react";

import { useReactEditorApi }
from "../public-api/useReactEditorApi";

import type { ReactIntegration }
from "./ReactIntegration";

export function useReactIntegration():ReactIntegration{

    const api=

        useReactEditorApi();

    return useMemo(

        ()=>({

            api

        }),

        [api]

    );

}