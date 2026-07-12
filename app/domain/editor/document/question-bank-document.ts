import type { MediaResource } from "../resource/media-resource";
import type { QuestionNode } from "./question-node";

export interface QuestionBankDocument {
    version: string;
    mediaResources: MediaResource[];
    questions: QuestionNode[];
}