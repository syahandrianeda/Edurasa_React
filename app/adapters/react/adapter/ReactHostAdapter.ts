import type { EditorCommand } from "~/domain/editor-document/engine/command/EditorCommand";
import type { EditorHostApi } from "../../../domain/editor-host/public-api/EditorHostApi";

// import type { EditorCommand }
// from "../../../domain/editor/engine/command/EditorCommand";

export interface ReactHostAdapter{

    readonly host:EditorHostApi;

    execute(

        command:EditorCommand

    ):boolean;

}