import type { ReactLifecycle }
from "./ReactLifecycle";

export interface ReactLifecycleResult{

    success:boolean;

    lifecycle?:ReactLifecycle;

    message?:string;

}