import type { EditorPresentationController }
from "./EditorPresentationController";

export interface EditorPresentationControllerResult{

    success:boolean;

    controller?:EditorPresentationController;

    message?:string;

}