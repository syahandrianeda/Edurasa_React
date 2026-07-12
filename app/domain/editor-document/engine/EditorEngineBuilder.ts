import { EditorCommandBus } from "./command/EditorCommandBus";
import { EditorContextBuilder } from "./context/EditorContextBuilder";
import type { EditorEngine }
from "./EditorEngine";

import type { EditorEngineResult }
from "./EditorEngineResult";
import { EditorEventDispatcher } from "./event/EditorEventDispatcher";
import { EditorTransactionBuilder } from "./transaction/EditorTransactionBuilder";
import { UpdateTextCommandHandler } from "./command/text/UpdateTextCommandHandler";

export class EditorEngineBuilder{

    build():EditorEngineResult{

        const context = new EditorContextBuilder().build(); 
        const transaction = new EditorTransactionBuilder().build();
        const commandBus = new EditorCommandBus();
        
        const engine:EditorEngine={ 
            state:"ready", 
            lifecycle:{ current:"ready" }, 
            context: context.context!, 
            transaction: transaction.transaction!,
            commandBus: commandBus, 
            eventDispatcher: new EditorEventDispatcher() 
        };

        // Register command handlers
        commandBus.register("update-text", new UpdateTextCommandHandler(engine));

        return{

            success:true,

            engine

        };

    }
    

}
