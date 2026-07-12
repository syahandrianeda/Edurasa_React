import type { EditorHostLifecycle }
from "./EditorHostLifecycle";

export interface EditorHostLifecycleResult{

    success:boolean;

    lifecycle?:EditorHostLifecycle;

    message?:string;

}