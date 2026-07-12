import type { EditorTransaction }
from "./EditorTransaction";

import type { EditorTransactionResult }
from "./EditorTransactionResult";

export class EditorTransactionManager{

    begin(

        transaction:
            EditorTransaction

    ):EditorTransactionResult{

        if(

            transaction.state === "running"

        ){

            return{

                success:false,

                message:

                    "Transaction sedang berjalan"

            };

        }

        return{

            success:true,

            transaction:{

                ...transaction,

                state:"running"

            }

        };

    }

    commit(

        transaction:
            EditorTransaction

    ):EditorTransactionResult{

        if(

            transaction.state !== "running"

        ){

            return{

                success:false,

                message:

                    "Transaction belum berjalan"

            };

        }

        return{

            success:true,

            transaction:{

                ...transaction,

                state:"completed"

            }

        };

    }

    rollback(

        transaction:
            EditorTransaction

    ):EditorTransactionResult{

        if(

            transaction.state !== "running"

        ){

            return{

                success:false,

                message:

                    "Transaction belum berjalan"

            };

        }

        return{

            success:true,

            transaction:{

                ...transaction,

                state:"cancelled"

            }

        };

    }

}