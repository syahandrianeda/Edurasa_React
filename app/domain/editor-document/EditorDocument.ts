// import type { ContentNode }
// from "../editor/content/BaseNode";

import type { ContentNode } from "../editor/contents/base-node";
import type { DocumentMetadata } from "./DocumentMetadata";


export interface EditorDocument {

    version: string;

    metadata: DocumentMetadata;

    children: ContentNode[];

}