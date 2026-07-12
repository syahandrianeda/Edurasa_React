import type { EditorPresentationIntegration }
from "./EditorPresentationIntegration";

export interface EditorPresentationIntegrationResult{

    success:boolean;

    integration?:EditorPresentationIntegration;

    message?:string;

}