import type { EditorTransactionState }
from "./EditorTransactionState";

export interface EditorTransaction{

    id:string;

    state:
        EditorTransactionState;

}