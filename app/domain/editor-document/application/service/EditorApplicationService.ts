import type { EditorApplication }
from "../EditorApplication";

import type { EditorCommand }
from "../../engine/command/EditorCommand";

import type { EditorApplicationServiceResult }
from "./EditorApplicationServiceResult";

export interface EditorApplicationService{

    readonly application: EditorApplication;

    execute(

        command: EditorCommand

    ): EditorApplicationServiceResult;

}