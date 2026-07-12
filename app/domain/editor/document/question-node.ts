import type { Answer } from "../answers/answer";
import type { EntityNode } from "../inlines/entities-node";
import type { InteractionNode } from "../interactions/base-node-interaction";
import type { QuestionMetadata } from "../metadata/question-meta-data";
import type { SectionNode } from "../sections/section-node";

export interface QuestionNode {

    // id: string;

    // metadata: QuestionMetadata;

    // sections: SectionNode[];

    // answer?: Answer;
    

    id:string;

    metadata:QuestionMetadata;

    stimulus?:SectionNode;

    pertanyaan?:SectionNode;

    interaction?:InteractionNode;

    pembahasan?:SectionNode;

    answer?:Answer;

    entities?:EntityNode[];

}