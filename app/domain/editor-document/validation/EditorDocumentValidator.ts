// domain/editor-document/validation/
import type { EditorDocument } from "../EditorDocument";
import type { ValidationResult } from "./ValidationResult";
import type { ValidationError } from "./ValidationError";

export class EditorDocumentValidator {

    validate(
        document: EditorDocument
    ): ValidationResult {

        const errors:
            ValidationError[] = [];

        if (
            !document.version
        ) {

            errors.push({

                path: "version",

                message:
                    "Document version is required"

            });

        }

        if (
            !Array.isArray(
                document.children
            )
        ) {

            errors.push({

                path: "children",

                message:
                    "Document children must be array"

            });

        }

        this.validateNodes(
            document.children,
            "children",
            errors
        );

        return {

            valid:
                errors.length === 0,

            errors

        };

    }

    private validateNodes(
        nodes: unknown[],
        path: string,
        errors: ValidationError[]
    ): void {

        for (
            let index = 0;
            index < nodes.length;
            index++
        ) {

            const node =
                nodes[index] as Record<
                    string,
                    unknown
                >;

            const nodePath =
                `${path}[${index}]`;

            if (
                !node.id
            ) {

                errors.push({

                    path: nodePath,

                    message:
                        "Node id is required"

                });

            }

            if (
                !node.type
            ) {

                errors.push({

                    path: nodePath,

                    message:
                        "Node type is required"

                });

            }

        }

    }

}