// import { SectionNode } from "../../section/SectionNode";

import type { SectionNode } from "../../sections/section-node";

export class SectionFactory {

    static createStimulus(): SectionNode {
        return {
            id: crypto.randomUUID(),
            type: "stimulus",
            visibility: "public",
            children: [],
        };
    }

    static createPertanyaan(): SectionNode {
        return {
            id: crypto.randomUUID(),
            type: "pertanyaan",
            visibility: "public",
            children: [],
        };
    }

    static createPembahasan(): SectionNode {
        return {
            id: crypto.randomUUID(),
            type: "pembahasan",
            visibility: "teacher",
            children: [],
        };
    }

}