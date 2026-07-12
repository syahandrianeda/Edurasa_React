import type { OptionGroupNode } from "~/domain/editor/interactions/base-node-interaction";
import { BaseInteractionValidator } from "./base-validator-interaction";
import type { ValidationError } from "../type/validation-error";

export class OptionGroupValidator
extends BaseInteractionValidator<OptionGroupNode>
{
    interactionType="option-group";

    validate(
        interaction:OptionGroupNode,
        path:string
    ):ValidationError[]
    {
        const errors:ValidationError[]=[];

        if(interaction.options.length<2)
        {
            errors.push({
                path,
                code:"OPTION_MINIMUM",
                message:"OptionGroup minimal memiliki 2 opsi"
            });
        }

        return errors;
    }
}