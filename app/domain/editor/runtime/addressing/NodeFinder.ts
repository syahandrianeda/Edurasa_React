import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { NodePath } from "./NodePath";
import type { NodeReference } from "./NodeReference";
import { PathResolver } from "./PathResolver";

export class NodeFinder {

    constructor(
        private resolver =
            new PathResolver()
    ) {}

    find(
        document: QuestionBankDocument,
        path: NodePath
    ): NodeReference | null {

        const node =
            this.resolver.resolve(
                document,
                path
            );

        if (
            node === undefined
        ) {

            return null;

        }

        return {
            path,
            node
        };

    }

}