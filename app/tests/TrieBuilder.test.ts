import { describe, expect, it } from "vitest";

import { TrieBuilder } from "../domain/taksonomi/trie/TrieBuilder";
import type { CognitiveLevel } from "../domain/taksonomi/value-objects/CognitiveLevel";
import type { Taksonomi } from "../domain/taksonomi/entities/Taksonomi";

describe("TrieBuilder", () => {

    it("should build trie from single keyword", () => {

        const builder = new TrieBuilder();

        const root = builder.build([
            {
                kko: "abc",
                type: "C1",
                LK: "LK1",
            },
        ]);

        expect(
            root.getChild("a")
        ).toBeDefined();

    });

    it("should store output at terminal node", () => {

        const builder = new TrieBuilder();

        const data = {
            kko: "abc",
            type: "C1",
            LK: "LK1",
        }satisfies Taksonomi;

        const root = builder.build([data]);

        const node =
            root
                .getChild("a")
                ?.getChild("b")
                ?.getChild("c");

        expect(node).toBeDefined();

        // expect(
        //     node?.outputs[0]
        // ).toEqual(data);
        expect(
            node?.outputs[0].item
        ).toEqual(data);

        expect(
            node?.outputs[0].length
        ).toBe(3);

    });

    it("should share common prefix", () => {

        const builder = new TrieBuilder();

        const root = builder.build([
            {
                kko: "abc",
                type: "C1",
                LK: "LK1",
            },
            {
                kko: "abd",
                type: "C2",
                LK: "LK2",
            },
        ]);

        const a = root.getChild("a");

        const b = a?.getChild("b");

        expect(a).toBeDefined();

        expect(b).toBeDefined();

        expect(
            b?.getChild("c")
        ).toBeDefined();

        expect(
            b?.getChild("d")
        ).toBeDefined();

    });

});