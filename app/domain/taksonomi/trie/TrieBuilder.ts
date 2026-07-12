import { TextNormalizer } from "../../text-matcher";

import type { Taksonomi } from "../entities/Taksonomi";
import { TrieNode } from "./TrieNode";

export class TrieBuilder {

    readonly #normalizer = new TextNormalizer();

    build(
        items: readonly Taksonomi[],
    ): TrieNode {

        const root = new TrieNode();

        for (const item of items) {

            this.insert(
                root,
                item,
            );

        }

        return root;

    }

    private insert(
        root: TrieNode,
        item: Taksonomi,
    ): void {

        const keyword =
            this.#normalizer.normalize(item.kko);

        let node = root;

        for (const char of keyword) {

            node =
                node.getOrCreateChild(char);

        }

        // node.addOutput(item);
        node.addOutput( item, keyword.length, ); }
}