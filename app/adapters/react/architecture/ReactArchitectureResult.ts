import type { ReactArchitecture }
from "./ReactArchitecture";

export interface ReactArchitectureResult{

    success:boolean;

    architecture?:ReactArchitecture;

    message?:string;

}