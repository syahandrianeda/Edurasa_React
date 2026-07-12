import { describe, expect, it } from "vitest";
import type { MatchResult } from "~/domain/taksonomi";

import { TextHighlighter } from "~/domain/text-highlighter/services/TextHighlighter";


describe("TextHighlighter", () => {

    const highlighter = new TextHighlighter();

    it("should create one highlight range", () => {

        const matches: MatchResult[] = [
            {
                start: 12,
                end: 27,
                text: "mengidentifikasi",
                item: {
                    kko: "mengidentifikasi",
                    type: "C2",
                    LK: "LK2",
                },
            },
        ];

        const result =
            highlighter.buildHighlightRanges(matches);

        expect(result).toHaveLength(1);

        expect(result[0]).toEqual({
            start: 12,
            end: 27,
            matches: [matches[0]],
        });

    });

    it("should create multiple highlight ranges", () => {

        const matches: MatchResult[] = [
            {
                start: 0,
                end: 5,
                text: "Siswa",
                item: {
                    kko: "Siswa",
                    type: "C1",
                    LK: "LK1",
                },
            },
            {
                start: 12,
                end: 27,
                text: "mengidentifikasi",
                item: {
                    kko: "mengidentifikasi",
                    type: "C2",
                    LK: "LK2",
                },
            },
        ];

        const result =
            highlighter.buildHighlightRanges(matches);

        expect(result).toHaveLength(2);

    });

    it("should return empty when no matches", () => {

        const result =
            highlighter.buildHighlightRanges([]);

        expect(result).toEqual([]);

    });
    it("should merge overlapped ranges", () => {

        const ranges = highlighter.mergeOverlap([
            {
                start: 10,
                end: 20,
                matches: [
                    {
                        start: 10,
                        end: 20,
                        text: "mengidentifikasi",
                        item: {
                            kko: "mengidentifikasi",
                            type: "C2",
                            LK: "LK2",
                        },
                    },
                ],
            },
            {
                start: 15,
                end: 25,
                matches: [
                    {
                        start: 15,
                        end: 25,
                        text: "identifikasi",
                        item: {
                            kko: "identifikasi",
                            type: "C1",
                            LK: "LK1",
                        },
                    },
                ],
            },
        ]);

        expect(ranges).toHaveLength(1);

        expect(ranges[0].start).toBe(10);

        expect(ranges[0].end).toBe(25);

        expect(ranges[0].matches).toHaveLength(2);

    });
    
    it("should not merge separated ranges", () => {

        const ranges = highlighter.mergeOverlap([
            {
                start: 0,
                end: 5,
                matches: [],
            },
            {
                start: 10,
                end: 15,
                matches: [],
            },
        ]);

        expect(ranges).toHaveLength(2);

    });

    it("should merge chained overlap", () => {

        const ranges = highlighter.mergeOverlap([
            {
                start: 0,
                end: 5,
                matches: [],
            },
            {
                start: 4,
                end: 8,
                matches: [],
            },
            {
                start: 7,
                end: 12,
                matches: [],
            },
        ]);

        expect(ranges).toHaveLength(1);

        expect(ranges[0].start).toBe(0);

        expect(ranges[0].end).toBe(12);

    }); 

    it("should return empty", () => {

        expect(
            highlighter.mergeOverlap([])
        ).toEqual([]);

    });  

    it("should build multiple highlighted segments", () => {

        const segments = highlighter.buildSegments(

            "ABC123XYZ",

            [

                {

                    start: 0,

                    end: 3,

                    matches: [],

                },

                {

                    start: 6,

                    end: 9,

                    matches: [],

                },

            ],

        );

        expect(segments).toHaveLength(3);

        expect(segments[0].highlight).toBe(true);

        expect(segments[1].highlight).toBe(false);

        expect(segments[2].highlight).toBe(true);

    });   
    it("should return plain segment when no ranges", () => {

        const segments = highlighter.buildSegments(

            "Hello World",

            [],

        );

        expect(segments).toEqual([

            {

                text: "Hello World",

                highlight: false,

                matches: [],

            },

        ]);

    });
    
    it("should build one highlighted segment", () => {

        const segments = highlighter.buildSegments(

            "Siswa dapat mengidentifikasi",

            [

                {

                    start: 12,

                    end: 30,

                    matches: [],

                },

            ],

        );

        expect(segments).toHaveLength(2);

        expect(segments[0].highlight).toBe(false);

        expect(segments[1].highlight).toBe(true);

        expect(segments[1].text)
            .toBe("mengidentifikasi");

    });

});