import type { ReactIntegration }
from "./ReactIntegration";

export interface ReactIntegrationResult{

    success:boolean;

    integration?:ReactIntegration;

    message?:string;

}