import type { EditorTransaction }
from "./EditorTransaction";

export interface EditorTransactionResult{

    success:boolean;

    transaction?:
        EditorTransaction;

    message?:string;

}