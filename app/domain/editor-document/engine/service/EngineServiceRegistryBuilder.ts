import { EngineAnalyzerServiceBuilder } from "./EngineAnalyzerServiceBuilder";
import { EngineDraftProcessingServiceBuilder } from "./EngineDraftProcessingServiceBuilder";
import { EngineMutationServiceBuilder } from "./EngineMutationServiceBuilder";
import { EngineQuestionBankServiceBuilder } from "./EngineQuestionBankServiceBuilder";
import { EngineRecoveryServiceBuilder } from "./EngineRecoveryServiceBuilder";
import type { EngineServiceRegistry } from "./EngineServiceRegistry";
import type { EngineServiceRegistryResult } from "./EngineServiceRegistryResult";

export class EngineServiceRegistryBuilder{

    build():EngineServiceRegistryResult{
        const mutation = new EngineMutationServiceBuilder().build();
        const recovery = new EngineRecoveryServiceBuilder().build();
        const analyzer = new EngineAnalyzerServiceBuilder().build();
        const draftProcessing = new EngineDraftProcessingServiceBuilder().build();
        const questionBank = new EngineQuestionBankServiceBuilder().build();
        const registry:EngineServiceRegistry={
                        services:[
                            {
                                name: "mutation",
                                instance: mutation.service!
                            },
                            {
                                name: "recovery",
                                instance: recovery.service!
                            },
                            {
                                name:"analyzer",
                                instance: analyzer.service!
                            },
                            {
                                name:"draft-processing",
                                instance: draftProcessing.service!
                            },
                            {
                                name: "question-bank",
                                instance: questionBank.service!
                            }
                        ],
                    };
        return{
            success:true,
            registry
        };
    }

}