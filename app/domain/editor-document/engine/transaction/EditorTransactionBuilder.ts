import type { EditorTransaction }
from "./EditorTransaction";

import type { EditorTransactionResult }
from "./EditorTransactionResult";

export class EditorTransactionBuilder{
    constructor(

        private readonly idGenerator: () => string =

            () => crypto.randomUUID()

    ){}
    build():EditorTransactionResult{

        const transaction:EditorTransaction={

            id: this.idGenerator(),

                // crypto.randomUUID(),

            state:

                "idle"

        };

        return{

            success:true,

            transaction

        };

    }

}