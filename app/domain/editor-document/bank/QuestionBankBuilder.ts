import type { QuestionBankDocument } from "~/domain/editor/document/question-bank-document";
import type { QuestionCollectionAggregate } from "../aggregate/QuestionCollectionAggregate";
import type { QuestionBankBuildResult } from "./QuestionBankBuildResult";
import { QuestionBankBuildAggregator } from "./QuestionBankBuildAggregator";
import { QuestionBankValidator } from "./validation/QuestionBankValidator";
import { QuestionBankBuildStatusResolver } from "./status/QuestionBankBuildStatusResolver";
import { QuestionBankRecommendationResolver } from "./recommendation/QuestionBankRecommendationResolver";
import { QuestionBankBuildActionResolver } from "./action/QuestionBankBuildActionResolver";
import { QuestionBankBuildWorkflowBuilder } from "./workflow/QuestionBankBuildWorkflowBuilder";
import { QuestionBankBuildPipelineBuilder } from "./pipeline/QuestionBankBuildPipelineBuilder";

export class QuestionBankBuilder {
    //tambahkan dependency:
    constructor(
        private aggregator = new QuestionBankBuildAggregator(),
        private validator = new QuestionBankValidator(),
        private statusResolver = new QuestionBankBuildStatusResolver(),
        private recommendationResolver = new QuestionBankRecommendationResolver(),
        private actionResolver = new QuestionBankBuildActionResolver(),
        private workflowBuilder = new QuestionBankBuildWorkflowBuilder(),
        private pipelineBuilder = new QuestionBankBuildPipelineBuilder()

    ){}

    build(
        collection:
            QuestionCollectionAggregate,
            

    ): QuestionBankBuildResult {

        // document kode sebelum refactor
        const document: QuestionBankDocument = {

                version:
                    "1.0",

                mediaResources:
                    [],

                questions:
                    collection
                        .collection
                        .questions

            };
        
        
        //tambahan kode, error duplicate
        const buildAggregate = this.aggregator.aggregate( document );
        const validation = this.validator.validate( document );
        const status = this.statusResolver.resolve( validation );
        const recommendation = this.recommendationResolver.resolve( validation, status );
        const actions = this.actionResolver.resolve( status );
        const workflow = this.workflowBuilder .build( status );
        const pipeline = this.pipelineBuilder .build( validation, status, recommendation, actions, workflow );
        
        return {

            success:validation.valid,
            aggregate: buildAggregate,
            validation,
            status,
            recommendation,
            actions,
            workflow,
            pipeline

        };

    }

}