// import type { InlineSemanticReview } from "../InlineSemanticReview";
import type { InlineSemanticReview } from "~/domain/editor-document/inline-semantic/InlineSemanticReview";
import type { InlineSemanticValidationIssue } from "./InlineSemanticValidationIssue";
import type { InlineSemanticValidationResult } from "./InlineSemanticValidationResult";

export class InlineSemanticValidator {

    validate(

        review: InlineSemanticReview

    ): InlineSemanticValidationResult {

        const issues: InlineSemanticValidationIssue[] = [];

        this.validateEntities( review, issues );
        this.validateEquations( review, issues );

        return {
            valid: issues.length === 0,
            issues

        };

    }

    private validateEntities(

        review: InlineSemanticReview,
        issues: InlineSemanticValidationIssue[]

    ): void {

        const seen = new Set<string>();

        for ( const entity of review.entities ) {

            const text = String( entity.metadata?.text ?? "" ).trim();

            if ( text.length === 0 ) {

                issues.push({
                    code: "ENTITY_EMPTY",
                    message: "Entity tidak memiliki teks"
                });
                continue;
            }

            if ( seen.has( text ) ) {

                issues.push({
                    code: "ENTITY_DUPLICATE",
                    message: `Entity duplikat: ${text}`
                });
            }

            seen.add( text );
        }

    }

    private validateEquations( review: InlineSemanticReview, issues: InlineSemanticValidationIssue[] ): void {

        const seen =
            new Set<string>();

        for ( const equation of review.equations ) {

            const expression = equation .expression .trim();

            if ( expression.length === 0 ) {

                issues.push({
                    code: "EQUATION_EMPTY",
                    message: "Equation kosong"
                });

                continue;

            }

            if ( seen.has( expression ) ) {
                issues.push({
                    code: "EQUATION_DUPLICATE",
                    message: `Equation duplikat: ${expression}`
                });

            }

            seen.add( expression );
        }

    }

}