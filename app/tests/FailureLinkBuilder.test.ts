import { describe, expect, it } from "vitest";

import { TrieBuilder } from "../domain/taksonomi/trie/TrieBuilder";
import { FailureLinkBuilder } from "../domain/taksonomi/trie/FailureLinkBuilder";

describe("FailureLinkBuilder", () => {

    it("should assign root as failure for first level", () => {

        const root = new TrieBuilder().build([ { kko: "abc", type: "C1", LK: "LK1", }, ]);

        new FailureLinkBuilder().build(root);

        expect(
            root.getChild("a")?.failure,
        ).toBe(root);

    });

    it("should inherit outputs through failure links", () => {

        const root =
            new TrieBuilder().build([
                {
                    kko: "he",
                    type: "C1",
                    LK: "LK1",
                },
                {
                    kko: "she",
                    type: "C2",
                    LK: "LK2",
                },
            ]);

        new FailureLinkBuilder().build(root);

        const node =
            root
                .getChild("s")
                ?.getChild("h")
                ?.getChild("e");

        expect(node).toBeDefined();

        expect(node!.outputs).toHaveLength(2);
        expect(node!.outputs[0].item.kko).toBe("she");
        expect(node!.outputs[1].item.kko).toBe("he");

    });
    
    it("should follow longest available failure path", () => {

        const root = new TrieBuilder().build([
            {
                kko: "abcd",
                type: "C1",
                LK: "LK1",
            },
            {
                kko: "bcd",
                type: "C2",
                LK: "LK2",
            },
        ]);

        new FailureLinkBuilder().build(root);

        const node =
            root
                .getChild("a")
                ?.getChild("b")
                ?.getChild("c")
                ?.getChild("d");

        expect(node).toBeDefined();

        expect(node!.failure).not.toBe(root);
        

    });
});