import type { EditorDocument }
from "./EditorDocument";

export interface EditorDocumentResult{

    success:boolean;

    document?:EditorDocument;

    message?:string;

}