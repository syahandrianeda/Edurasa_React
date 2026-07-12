import type { MutationTarget }
from "./MutationTarget";

export interface MutationTargetResult {

    success:boolean;

    target?:
        MutationTarget;

    message?:string;

}