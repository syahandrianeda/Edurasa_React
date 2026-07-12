import { TextNormalizer } from "../../text-matcher";

import type { Taksonomi } from "../entities/Taksonomi";
import type { MatchResult } from "../value-objects/MatchResult";

interface Pattern {

    readonly item: Taksonomi;

    readonly regex: RegExp;

}

export class TaksonomiMatcher {

    readonly #patterns: readonly Pattern[];

    readonly #normalizer = new TextNormalizer();

    constructor(
        data: readonly Taksonomi[],
    ) {

        this.#patterns = this.compilePatterns(data);

    }

    /**
     * Mengembalikan seluruh hasil pencarian.
     */
    findAll(
        text: string,
    ): readonly MatchResult[] {

        const normalized =
            this.#normalizer.normalize(text);

        const results: MatchResult[] = [];

        for (const pattern of this.#patterns) {

            const regex = new RegExp(
                pattern.regex.source,
                pattern.regex.flags + "g",
            );

            let match: RegExpExecArray | null;

            while ((match = regex.exec(normalized)) !== null) {

                const value = match[0].trim();

                const start =
                    match.index + match[0].indexOf(value);

                const end =
                    start + value.length;

                results.push({

                    item: pattern.item,

                    start,

                    end,

                    text: value,

                });

            }

        }

        return results.sort(
            (a, b) => a.start - b.start,
        );

    }

    /**
     * Mengembalikan hasil pertama.
     */
    find(
        text: string,
    ): Taksonomi | undefined {

        return this.findAll(text)[0]?.item;

    }

    private compilePatterns(
        data: readonly Taksonomi[],
    ): readonly Pattern[] {

        return [...data]

            .sort(
                (a, b) =>
                    b.kko.length - a.kko.length,
            )

            .map(item => ({

                item,

                regex: new RegExp(
                    `(^|\\W)${escapeRegex(
                        this.#normalizer.normalize(item.kko),
                    )}(?=\\W|$)`,
                    "i",
                ),

            }));

    }

}

function escapeRegex(
    text: string,
): string {

    return text.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&",
    );

}