import type { ContentNode } from "../contents/base-node";
import type { SectionType } from "./section-soal-type";
import type { SectionVisibility } from "./section-visibility";

export interface SectionNode {

    id: string;

    type: SectionType;

    visibility: SectionVisibility;

    children: ContentNode[];
}