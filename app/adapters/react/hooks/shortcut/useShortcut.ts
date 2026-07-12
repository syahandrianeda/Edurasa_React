import { useMemo }
from "react";

import { useCommand }
from "../command/useCommand";

import type { ShortcutHook }
from "./ShortcutHook";

export function useShortcut():ShortcutHook{

    const command=

        useCommand();

    return useMemo(

        ()=>({

            dispatch:command.execute

        }),

        [command]

    );

}