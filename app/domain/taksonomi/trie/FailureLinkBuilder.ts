import { TrieNode } from "./TrieNode";

export class FailureLinkBuilder {

    build(
        root: TrieNode,
    ): void {

        root.failure = root;

        const queue: TrieNode[] = [];

        // Level pertama
        for (const child of root.children.values()) {

            child.failure = root;

            queue.push(child);

        }

        while (queue.length > 0) {

            const current = queue.shift()!;

            for (const [char, child] of current.children) {

                let failure = current.failure ?? root;

                /**
                 * Naik terus sampai:
                 * - menemukan transisi
                 * - atau kembali ke root
                 */
                while (
                    failure !== root &&
                    failure.getChild(char) === undefined
                ) {

                    failure = failure.failure ?? root;

                }

                const transition =
                    failure.getChild(char);

                if (
                    transition !== undefined &&
                    transition !== child
                ) {

                    child.failure = transition;

                } else {

                    child.failure = root;

                }

                /**
                 * Wariskan seluruh output
                 * dari failure node.
                 */
                child.outputs.push(
                    ...child.failure.outputs,
                );

                queue.push(child);

            }

        }

    }

}