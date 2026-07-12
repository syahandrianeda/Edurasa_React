import type { EditorApplicationIntegration }
from "./EditorApplicationIntegration";

export interface EditorApplicationIntegrationResult{

    success:boolean;

    integration?:EditorApplicationIntegration;

    message?:string;

}