import type { EditorFacade } from "./EditorFacade";

export interface EditorFacadeResult{

    readonly success:boolean;

    readonly facade?:EditorFacade;

    readonly message?:string;

}