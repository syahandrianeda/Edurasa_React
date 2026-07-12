import type { QuestionBankDocument } from "../../document/question-bank-document";
import type { NodePath } from "./NodePath";

export class PathResolver {

    resolve(
        document: QuestionBankDocument,
        path: NodePath
    ): unknown {

        const normalized =
            path.replace(
                /\[(\d+)\]/g,
                ".$1"
            );

        const parts =
            normalized.split(".");

        let current:any =
            document;

        for (
            const part
            of parts
        ) {

            if (
                current === undefined ||
                current === null
            ) {

                return undefined;

            }

            current =
                current[part];

        }

        return current;

    }

}