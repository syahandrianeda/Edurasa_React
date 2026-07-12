import type { QuestionNode } from "~/domain/editor/document/question-node";
import type { QuestionDraft } from "../draft/QuestionDraft";
import type { EditorDocument } from "../EditorDocument";
import type { QuestionDraftTransformResult } from "./QuestionDraftTransformResult";
import { SemanticMarkerResolver } from "../resolver/SemanticMarkerResolver";
import { InteractionBuilder } from "../interaction/InteractionBuilder";
import { AnswerBuilder } from "../answer/AnswerBuilder";
import { EntityResolver } from "../entity/EntityResolver";
import type { SemanticMarker } from "../semantic/SemanticMarker";

export class QuestionDraftTransformer {
    constructor(
        private resolver = new SemanticMarkerResolver(),
        private interactionBuilder = new InteractionBuilder(),
        private answerBuilder = new AnswerBuilder(),
        private entityResolver = new EntityResolver()
    ) {}

    transform( draft: QuestionDraft, document: EditorDocument ): QuestionDraftTransformResult {

        const pertanyaanResult = this.resolver .resolve( draft .structure .pertanyaan, document );

        if ( !pertanyaanResult.success || !pertanyaanResult.section ) {

            return {

                success:false,

                message:
                    "Gagal membangun section pertanyaan"

            };

        }

        let stimulus = undefined;

        if ( draft.structure .stimulus ) {

            const stimulusResult =

                this.resolver
                    .resolve(

                        draft.structure
                            .stimulus,

                        document

                    );

            if (

                stimulusResult.success

            ) {

                stimulus =
                    stimulusResult
                        .section;

            }

        }

        let pembahasan = undefined;

        if ( draft.structure .pembahasan ) {

            const pembahasanResult =

                this.resolver
                    .resolve(

                        draft.structure
                            .pembahasan,

                        document

                    );

            if (

                pembahasanResult.success

            ) {

                pembahasan =
                    pembahasanResult
                        .section;

            }

        }
        const entityMarkers =

    this.collectEntityMarkers(
        draft
    );

        const entityResult = this.entityResolver .resolve( entityMarkers, document );
        const answerResult = this.answerBuilder .build( draft.structure );
        const interactionResult = this.interactionBuilder .build( draft.structure, document );
        const question: QuestionNode = {
                    id: draft.id,
                    metadata:{},
                    stimulus,
                    pertanyaan: pertanyaanResult.section,
                    pembahasan,
                    interaction: interactionResult.interaction,
                    answer: answerResult .answer,
                    entities: entityResult .entities

                };

        return {
            success:true,
            question
        };
    }

    private collectEntityMarkers( draft: QuestionDraft ): SemanticMarker[] {
        const markers: SemanticMarker[] = [];
        const pushIfEntity = ( marker?: SemanticMarker ) => {
            if ( marker && marker.type === "entity" ) {
                markers.push(marker);
            }
        };

        pushIfEntity( draft.structure.stimulus );
        pushIfEntity( draft.structure.pertanyaan );
        pushIfEntity( draft.structure.pembahasan );
        for ( const opsi of draft.structure.opsi ) {
            pushIfEntity( opsi );
        }

        return markers;
    }

}