import type { NodeHydrator }
from "./NodeHydrator";

export class NodeHydrationRegistry {

    private hydrators =
        new Map<
            string,
            NodeHydrator
        >();

    register(
        type: string,
        hydrator: NodeHydrator
    ): void {

        this.hydrators.set(
            type,
            hydrator
        );

    }

    get(
        type: string
    ): NodeHydrator {

        const hydrator =
            this.hydrators.get(
                type
            );

        if (
            !hydrator
        ) {

            throw new Error(
                `Hydrator not found for ${type}`
            );

        }

        return hydrator;

    }

}