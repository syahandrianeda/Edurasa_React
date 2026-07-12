import type { EditorApplicationProcessor }
from "../EditorApplicationProcessor";

export interface ApplicationPipeline{

    readonly processor: EditorApplicationProcessor;

}