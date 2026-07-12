import { SelectionService } from "~/domain/editor-document/selection/SelectionService";
import { EditorProvider }
from "../provider/EditorProvider";

import { DocumentRenderer }
from "../renderer/DocumentRenderer";

import { createStore }
from "./create-store";
const store =
    createStore();

export function EditorSmokeTest()
{
    const service = new SelectionService();

    const selection = service.collapse({

            nodeId:"paragraph-1",

            offset:0

        });
    console.log(
        service.isCollapsed(
            selection
        )
    );

    return (
        
        <EditorProvider
            store={store}
        >

            <DocumentRenderer />

        </EditorProvider>

    );

}