import type { MatchResult } from "~/domain/taksonomi";
import type { HighlightRange } from "../entities/HighlightRange";
import type { HighlightSegment } from "../entities/HighlightSegment";

export class TextHighlighter {

    /**
     * Mengubah MatchResult menjadi HighlightRange.
     */
    buildHighlightRanges(
        matches: readonly MatchResult[],
    ): HighlightRange[] {

        return matches.map((match) => ({

            start: match.start,

            end: match.end,

            matches: [match],

        }));

    }

    /**
     * Menggabungkan HighlightRange yang saling overlap.
     */
    mergeOverlap(
        ranges: readonly HighlightRange[],
    ): HighlightRange[] {

        if (ranges.length === 0) {
            return [];
        }

        const sorted = [...ranges].sort(
            (a, b) => a.start - b.start,
        );

        const merged: HighlightRange[] = [];

        let current: HighlightRange = {

            start: sorted[0].start,

            end: sorted[0].end,

            matches: [...sorted[0].matches],

        };

        for (let i = 1; i < sorted.length; i++) {

            const next = sorted[i];

            if (next.start < current.end) {

                current = {

                    start: current.start,

                    end: Math.max(
                        current.end,
                        next.end,
                    ),

                    matches: [

                        ...current.matches,

                        ...next.matches,

                    ],

                };

                continue;

            }

            merged.push(current);

            current = {

                start: next.start,

                end: next.end,

                matches: [...next.matches],

            };

        }

        merged.push(current);

        return merged;

    }

    /**
     * Memecah text menjadi beberapa segmen
     * berdasarkan HighlightRange.
     */
    buildSegments(
        text: string,
        ranges: readonly HighlightRange[],
    ): HighlightSegment[] {

        if (ranges.length === 0) {

            return [

                {

                    text,

                    highlight: false,

                    matches: [],

                },

            ];

        }

        const segments: HighlightSegment[] = [];

        let cursor = 0;

        for (const range of ranges) {

            /**
             * Plain text sebelum highlight.
             */
            if (cursor < range.start) {

                segments.push({

                    text: text.slice(
                        cursor,
                        range.start,
                    ),

                    highlight: false,

                    matches: [],

                });

            }

            /**
             * Highlight.
             */
            segments.push({

                text: text.slice(
                    range.start,
                    range.end,
                ),

                highlight: true,

                matches: range.matches,

            });

            cursor = range.end;

        }

        /**
         * Sisa text.
         */
        if (cursor < text.length) {

            segments.push({

                text: text.slice(cursor),

                highlight: false,

                matches: [],

            });

        }

        return segments;

    }

}