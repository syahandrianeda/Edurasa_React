import type { SelectionOrder }
from "./SelectionOrder";

export class NodePositionResolver
implements SelectionOrder {

    constructor(

        private positions:
            Map<string, number>

    ) {}

    compare(
        nodeA: string,

        nodeB: string

    ): number {

        const a =
            this.positions.get(
                nodeA
            ) ?? 0;

        const b =
            this.positions.get(
                nodeB
            ) ?? 0;

        return a - b;

    }

}