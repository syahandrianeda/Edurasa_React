import type { EditorPresentationStore }
from "./EditorPresentationStore";

export interface EditorPresentationStoreResult{

    success:boolean;

    store?:EditorPresentationStore;

    message?:string;

}