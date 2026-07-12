import type { EditorApplication } from "../../editor-document/application/EditorApplication";
import type { EditorPresentationStore } from "../store/EditorPresentationStore";
import type { EditorPresentationStateSynchronizationResult } from "./EditorPresentationStateSynchronizationResult";

export interface EditorPresentationStateSynchronizer{

    readonly store:EditorPresentationStore;

    synchronize(

        application:EditorApplication

    ):EditorPresentationStateSynchronizationResult;

}