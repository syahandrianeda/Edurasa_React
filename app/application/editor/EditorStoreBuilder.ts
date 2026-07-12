import type { EditorContext }
from "~/domain/editor/runtime/editor-context";

import type { EditorStore }
from "./EditorStore";

import { EditorStoreFactory }
from "./EditorStoreFactory";

export class EditorStoreBuilder{

    build(

        context:EditorContext

    ):EditorStore{

        return EditorStoreFactory.create(

            context

        );

    }

}