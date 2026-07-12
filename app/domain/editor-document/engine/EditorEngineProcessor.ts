import type { EditorCommandResult } from "./command/EditorCommandResult";
import type { EditorCommandContext }
from "./context/EditorCommandContext";

import type { EditorEngineProcessResult }
from "./EditorEngineProcessResult";
import type { EditorEvent } from "./event/EditorEvent";

import { EditorLifecycleManager }
from "./lifecycle/EditorLifecycleManager";

import { EditorTransactionManager }
from "./transaction/EditorTransactionManager";

export class EditorEngineProcessor{

    constructor(
        private lifecycleManager = new EditorLifecycleManager(),
        private transactionManager = new EditorTransactionManager()
    ){}

    process( context: EditorCommandContext ):EditorEngineProcessResult{

        const engine = context.engine;
        const lifecycle = this.lifecycleManager.transition( engine.lifecycle, "processing" );
        
        if( !lifecycle.success || !lifecycle.lifecycle ){

            return{
                success:false,
                message: "Lifecycle gagal diproses"
            };
        }

        const transaction = this.transactionManager.begin( engine.transaction );

        if( !transaction.success || !transaction.transaction ){

            return{
                success:false,
                message: transaction.message
            };

        }

        /**
         * Milestone berikutnya:
         *
         * commandBus.dispatch()
         *
         * eventDispatcher.dispatch()
         */
        const command: EditorCommandResult = engine.commandBus.dispatch( context.command );

        if( !command.success ){

            const rollback = this.transactionManager.rollback( transaction.transaction );

            return{
                success:false,
                message: command.message, engine:{
                    ...engine,
                    transaction: rollback.transaction ?? transaction.transaction,
                    lifecycle: lifecycle.lifecycle,
                    state: lifecycle.lifecycle.current
                }
            };

        }
        
        const mutation = context
                    .engine 
                    .context 
                    .resolver 
                    .resolve(   
                                context
                                .engine 
                                .context 
                                .registry, 
                            "mutation" 
                        );
        if( mutation.success ){
            const service = mutation.service!.instance as import("./service/EngineMutationService").EngineMutationService; 
            service.mutate();
        }
        const recovery = context.engine
                    .context
                    .resolver
                    .resolve(
                        context.engine
                            .context
                            .registry,
                        "recovery"
                    );

        if( recovery.success ){
            const service = recovery.service!
                    .instance as import("./service/EngineRecoveryService").EngineRecoveryService;
            service.recover();

        }

        const analyzer = context.engine
                    .context
                    .resolver
                    .resolve(
                        context.engine
                            .context
                            .registry,
                        "analyzer"
                    );
        if( analyzer.success ){
            const service = analyzer.service!
                    .instance as import("./service/EngineAnalyzerService").EngineAnalyzerService;
            service.execute();
        }
        const draftProcessing = context.engine
                .context
                .resolver
                .resolve(
                    context.engine
                        .context
                        .registry,
                    "draft-processing"
                );

        if( draftProcessing.success ){
            const service = draftProcessing.service! .instance as
                        import("./service/EngineDraftProcessingService").EngineDraftProcessingService;
            service.execute();
        }
        const questionBank = context.engine
                .context
                .resolver
                .resolve(
                    context.engine
                        .context
                        .registry,
                    "question-bank"
                );

        if( questionBank.success ){
            const service = questionBank.service!
                    .instance as import("./service/EngineQuestionBankService").EngineQuestionBankService;
            service.execute();
        }

        const committed = this.transactionManager.commit( transaction.transaction );

        if( !committed.success || !committed.transaction ){

            return{
                success:false,
                message: committed.message
            };
        }
        const event: EditorEvent = {
                type: context.command.type,
                source: "command"
            };

        engine.eventDispatcher.dispatch( event );

        const ready = this.lifecycleManager.transition( lifecycle.lifecycle, "ready" );

        if( !ready.success || !ready.lifecycle ){

            return{
                success:false,
                message: "Lifecycle gagal dipulihkan" 
            };
        }

        return{
            success:true,
            engine:{
                ...engine,
                lifecycle: ready.lifecycle,
                state: ready.lifecycle.current,
                transaction: committed.transaction
            }

        };

    }

}