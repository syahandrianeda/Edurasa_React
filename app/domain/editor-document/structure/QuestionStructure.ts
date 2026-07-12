import type { SemanticMarker } from "../semantic/SemanticMarker";

export interface QuestionStructure {

    stimulus?:
        SemanticMarker;

    pertanyaan:
        SemanticMarker;

    opsi:
        SemanticMarker[];

    pembahasan?:
        SemanticMarker;

}