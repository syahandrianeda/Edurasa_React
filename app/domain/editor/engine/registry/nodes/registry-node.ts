import type { NodeDefinition } from "./node-definitions";

export class NodeRegistry {

    private definitions =
        new Map<
            string,
            NodeDefinition
        >();

    register(
        definition:NodeDefinition
    ):void {

        this.definitions.set(
            definition.type,
            definition
        );

    }

    get(
        type:string
    ):NodeDefinition|undefined {

        return this.definitions.get(
            type
        );

    }

    getAll():
        NodeDefinition[]
    {

        return [
            ...this.definitions.values()
        ];

    }

}