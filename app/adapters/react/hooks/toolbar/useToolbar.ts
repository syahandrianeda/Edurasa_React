import { useMemo }
from "react";

import { useSelection }
from "../selection/useSelection";

import { useHistory }
from "../history/useHistory";

import { useClipboard }
from "../clipboard/useClipboard";

import type { ToolbarHook }
from "./ToolbarHook";

export function useToolbar():ToolbarHook{

    const selection=

        useSelection();

    const history=

        useHistory();

    const clipboard=

        useClipboard();

    return useMemo(

        ()=>({

            canUndo:false,

            canRedo:false,

            hasSelection:

                selection.value!=null,

            hasClipboard:

                clipboard.value!=null

        }),

        [

            selection,

            history,

            clipboard

        ]

    );

}