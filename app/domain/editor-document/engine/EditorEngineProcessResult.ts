import type { EditorEngine } from "./EditorEngine";

export interface EditorEngineProcessResult{

    success:boolean;
    engine?: EditorEngine;
    message?:string;

}