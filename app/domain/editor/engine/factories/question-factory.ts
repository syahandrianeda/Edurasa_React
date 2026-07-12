// import { QuestionNode } from "../../document/QuestionNode";

import type { QuestionNode } from "../../document/question-node";

export class QuestionFactory {

    static create(): QuestionNode {
        return {
            id: crypto.randomUUID(),

            metadata: {},

            stimulus: undefined,

            pertanyaan: undefined,

            interaction: undefined,

            pembahasan: undefined,

            answer: undefined,

            entities: [],
        };
    }

}