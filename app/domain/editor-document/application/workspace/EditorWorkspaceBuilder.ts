import type { EditorWorkspace }
from "./EditorWorkspace";

import type { EditorWorkspaceResult }
from "./EditorWorkspaceResult";

import { EditorDocumentBuilder }
from "../../EditorDocumentBuilder";

export class EditorWorkspaceBuilder{

    build():EditorWorkspaceResult{

        const document =
            new EditorDocumentBuilder()
                .build();

        if(
            !document.success ||
            !document.document
        ){

            return{

                success:false,

                message:"Editor Document gagal dibuat."

            };

        }

        const workspace:EditorWorkspace={

            document:document.document,

            state:"empty"

        };

        return{

            success:true,

            workspace

        };

    }

}