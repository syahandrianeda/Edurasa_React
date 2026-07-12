import { InteractionRegistry } from "./InteractionRegistry";

export function createDefaultInteractionRegistry() {
    const registry =
        new InteractionRegistry();

    registry.register({
        interactionType:
            "option-group",

        displayName:
            "Pilihan Ganda"
    });

    registry.register({
        interactionType:
            "true-false",

        displayName:
            "Benar Salah"
    });

    registry.register({
        interactionType:
            "matching",

        displayName:
            "Menjodohkan"
    });

    registry.register({
        interactionType:
            "response",

        displayName:
            "Isian/Uraian"
    });

    return registry;
}