import type { EditingSnapshot }
from "./EditingSnapshot";

import type { SnapshotCollection }
from "./SnapshotCollection";

import type { SnapshotManagerResult }
from "./SnapshotManagerResult";

export class SnapshotManager {

    private readonly snapshots:
        EditingSnapshot[] = [];

    add(

        snapshot:
            EditingSnapshot

    ): SnapshotManagerResult{

        this.snapshots.push(

            snapshot

        );

        return this.result();

    }

    all():
        SnapshotManagerResult{

        return this.result();

    }

    clear():
        SnapshotManagerResult{

        this.snapshots.length = 0;

        return this.result();

    }

    private result():
        SnapshotManagerResult{

        const collection: SnapshotCollection = {

            snapshots:

                [

                    ...this.snapshots

                ]

        };

        return{

            success:true,

            collection,

            summary:{

                totalSnapshots:

                    collection
                        .snapshots
                        .length

            }

        };

    }

}