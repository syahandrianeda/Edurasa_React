import type { QuestionStructure }
from "../structure/QuestionStructure";

import type { DraftStatus }
from "./DraftStatus";

export interface QuestionDraft {

    id:string;

    structure:
        QuestionStructure;

    status:
        DraftStatus;

}