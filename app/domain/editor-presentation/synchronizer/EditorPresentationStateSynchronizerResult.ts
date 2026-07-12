import type { EditorPresentationStateSynchronizer }
from "./EditorPresentationStateSynchronizer";

export interface EditorPresentationStateSynchronizerResult{

    success:boolean;

    synchronizer?:EditorPresentationStateSynchronizer;

    message?:string;

}