import type { EditorCommand }
from "../EditorCommand";

export class UpdateTextCommand
implements EditorCommand{

    readonly type = "update-text";

    constructor(

        public readonly nodeId:string,

        public readonly text:string

    ){}

}