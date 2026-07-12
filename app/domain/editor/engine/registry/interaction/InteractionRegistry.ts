import type { InteractionDefinition } from "./InteractionDefinition";

export class InteractionRegistry {
    private definitions =
        new Map<
            string,
            InteractionDefinition
        >();

    register(
        definition:
            InteractionDefinition
    ):void {

        this.definitions.set(
            definition
                .interactionType,
            definition
        );

    }

    get(
        type:string
    )
    {
        return this.definitions.get(
            type
        );
    }

}