import type { EditorDocument }
from "../../EditorDocument";

export interface EditorPersistenceResult{

    success:boolean;

    document?:EditorDocument;

    message?:string;

}