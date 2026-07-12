import type { ValidationError } from "../type/validation-error";

export abstract class BaseInteractionValidator<T>
{
    abstract interactionType:string;

    abstract validate(
        interaction:T,
        path:string
    ):ValidationError[];
}