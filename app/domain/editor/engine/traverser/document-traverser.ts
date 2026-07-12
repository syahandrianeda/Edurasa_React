import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { TraversedNode, TraverserResult } from "./traversor-result";

export class DocumentTraverser {

    traverse(
        document: QuestionBankDocument,
        callback: (
            node: unknown,
            path: string
        ) => void
    ): void {

        this.walk(
            document,
            "document",
            callback
        );

    }

    private walk(
        current: unknown,
        path: string,
        callback: (
            node: unknown,
            path: string
        ) => void
    ): void {

        callback(
            current,
            path
        );

        if (
            current === null ||
            current === undefined
        ) {
            return;
        }

        if (
            typeof current !== "object"
        ) {
            return;
        }

        if (
            Array.isArray(current)
        ) {

            current.forEach(
                (
                    item,
                    index
                ) => {

                    this.walk(
                        item,
                        `${path}[${index}]`,
                        callback
                    );

                }
            );

            return;
        }

        Object.entries(current)
            .forEach(
                ([key, value]) => {

                    this.walk(
                        value,
                        `${path}.${key}`,
                        callback
                    );

                }
            );

    }

    find(
            document: QuestionBankDocument,
            predicate: (
                node: unknown
            ) => boolean
        ): TraverserResult {

            const items:TraversedNode[] = [];

            this.traverse(
                document,
                (
                    node,
                    path
                ) => {

                    if (
                        predicate(node)
                    ) {

                        items.push({
                            node,
                            path
                        });

                    }

                }
            );

            return {
                items
            };

        }
    findByType(
            document: QuestionBankDocument,
            type: string
        ): TraverserResult {

            return this.find(
                document,
                (node) => {

                    if (
                        typeof node !== "object" ||
                        node === null
                    ) {
                        return false;
                    }

                    return (
                        "type" in node &&
                        (node as any).type === type
                    );

                }
            );

        }
}