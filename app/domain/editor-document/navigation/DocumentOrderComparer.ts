import type { EditorDocument }
from "../EditorDocument";

import { DocumentPositionResolver }
from "./DocumentPositionResolver";

export class DocumentOrderComparer {

    constructor(

        private resolver =
            new DocumentPositionResolver()

    ) {}

    isBefore(

        document:
            EditorDocument,

        leftNodeId:
            string,

        rightNodeId:
            string

    ): boolean {

        const left =

            this.resolver
                .resolve(
                    document,
                    leftNodeId
                );

        const right =

            this.resolver
                .resolve(
                    document,
                    rightNodeId
                );

        if (
            !left ||
            !right
        ) {

            return false;

        }

        return (
            left.index <
            right.index
        );

    }

}