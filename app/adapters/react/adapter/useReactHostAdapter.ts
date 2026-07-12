import { useCallback }
from "react";

import { useReactEditorSession }
from "../session/useReactEditorSession";

import type { ReactHostAdapter }
from "./ReactHostAdapter";

import type { EditorCommand } from "~/domain/editor-document/engine/command/EditorCommand";

export function useReactHostAdapter():ReactHostAdapter{

    const session=

        useReactEditorSession();

    const execute=

        useCallback(

            (

                command:EditorCommand

            )=>{

                const result= session.platform.host.execute(command)

                    // session.host.execute(

                    //     command

                    // );

                return result.success;

            },

            [session]

        );

    return{

        // host:session.host,
        host:session.platform.host,

        execute

    };

}