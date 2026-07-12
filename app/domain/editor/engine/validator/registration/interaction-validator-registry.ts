import type { BaseInteractionValidator } from "../interaction/base-validator-interaction";

export class InteractionValidatorRegistry
{
    private validators=
        new Map<string,BaseInteractionValidator<any>>();

    register(
        validator:BaseInteractionValidator<any>
    )
    {
        this.validators.set(
            validator.interactionType,
            validator
        );
    }

    get(type:string)
    {
        return this.validators.get(type);
    }
}