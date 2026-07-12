import { TrieNode } from "./TrieNode";

export class FailureLinkBuilder {

    build(
        root: TrieNode,
    ): void {

        root.failure = root;

        const queue: TrieNode[] = [];

        /**
         * Semua child langsung dari root
         * failure -> root
         */
        for (const child of root.children.values()) {

            child.failure = root;

            queue.push(child);

        }

        /**
         * BFS
         */
        while (queue.length > 0) {

            const current = queue.shift()!;

            for (const [char, child] of current.children) {

                let failure = current.failure ?? root;

                while (
                    failure !== root &&
                    !failure.getChild(char)
                ) {

                    failure = failure.failure ?? root;

                }

                const next = failure.getChild(char);

                if (
                    next &&
                    next !== child
                ) {

                    child.failure = next;

                } else {

                    child.failure = root;

                }

                /**
                 * Output diwariskan
                 */
                child.outputs.push(
                    ...child.failure.outputs,
                );

                queue.push(child);

            }

        }

    }

}