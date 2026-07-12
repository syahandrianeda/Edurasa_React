import type { HookArchitecture }
from "./HookArchitecture";

export interface HookArchitectureResult{

    success:boolean;

    architecture?:HookArchitecture;

    message?:string;

}