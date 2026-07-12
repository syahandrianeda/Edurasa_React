import type { EditorHostIntegration }
from "./EditorHostIntegration";

export interface EditorHostIntegrationResult{

    success:boolean;

    integration?:EditorHostIntegration;

    message?:string;

}