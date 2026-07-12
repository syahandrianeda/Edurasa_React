import { describe, expect, it } from "vitest";
import { TrieNode } from "../domain/taksonomi/trie/TrieNode";



describe("TrieNode", () => {

    it("should create child node", () => {

        const root = new TrieNode();

        const child = root.getOrCreateChild("a");

        expect(child).toBeDefined();

        expect(root.getChild("a")).toBe(child);

    });

    it("should return existing child", () => {

        const root = new TrieNode();

        const first = root.getOrCreateChild("a");

        const second = root.getOrCreateChild("a");

        expect(first).toBe(second);

    });

    it("should return undefined when child does not exist", () => {

        const root = new TrieNode();

        expect(
            root.getChild("x"),
        ).toBeUndefined();

    });

});