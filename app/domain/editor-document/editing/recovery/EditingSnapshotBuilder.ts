import type { QuestionBankDocument }
from "~/domain/editor/document/question-bank-document";

import type { EditingSnapshot }
from "./EditingSnapshot";

import type { EditingSnapshotResult }
from "./EditingSnapshotResult";

export class EditingSnapshotBuilder {

    build(

        document:
            QuestionBankDocument

    ): EditingSnapshotResult{

        const snapshot: EditingSnapshot = {

            id:
                crypto.randomUUID(),

            createdAt:
                new Date(),

            document

        };

        return{

            success:true,

            snapshot,

            summary:{

                snapshotId:
                    snapshot.id,

                createdAt:
                    snapshot.createdAt

            }

        };

    }

}