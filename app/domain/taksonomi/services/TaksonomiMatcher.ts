import type { CognitifData } from "~/types/taksonomi/taksonomi-app";
import { TextNormalizer } from "../../text-matcher";

import type { Taksonomi } from "../entities/Taksonomi";
import type { CognitiveLevel } from "../value-objects/CognitiveLevel";
import type { LkLevel } from "../value-objects/LkLevel";
import type { MatchResult } from "../value-objects/MatchResult";

interface Pattern {

    readonly item: Taksonomi;

    /**
     * Untuk pencarian tunggal.
     */
    readonly regex: RegExp;

    /**
     * Untuk pencarian seluruh hasil.
     */
    readonly globalRegex: RegExp;

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

            /**
             * Reset state RegExp global.
             */
            pattern.globalRegex.lastIndex = 0;

            let match: RegExpExecArray | null;

            while ((match = pattern.globalRegex.exec(normalized)) !== null) {

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

    /** findAllToCollection, method findAll, tapi dalam bentuk collection */
    findAllCollections(text: string,){
        const findAll = this.findAll(text);
        const dataMatcherTaksonomi = findAll.map(m=>m.item);
        const levelMap = new Map< LkLevel, { 
            levelDefinition: string; 
            cognitifMap: Map<CognitiveLevel, CognitifData>; } >();

        for (const item of dataMatcherTaksonomi) {

            // Buat group level jika belum ada
            if (!levelMap.has(item.LK)) {
                levelMap.set(item.LK, {
                    levelDefinition: item.levelkognitif_definisi,
                    cognitifMap: new Map(),
                });
            }

            const level = levelMap.get(item.LK)!;

            // Buat group cognitive jika belum ada
            if (!level.cognitifMap.has(item.type)) {
                level.cognitifMap.set(item.type, {
                    name: item.type,
                    description: item.nama_taksonomi,
                    kko: [],
                    source:[]
                });
            }

            // Tambahkan KKO
            level.cognitifMap.get(item.type)!.kko.push(item.kko);
            level.cognitifMap.get(item.type)!.source?.push(item);
        }

        return Array.from(levelMap.entries()).map(([levelName, value]) => ({
            levelName,
            levelDefinition: value.levelDefinition,
            Cognitif: Array.from(value.cognitifMap.values()),
        }));
    }

    /**
     * Mengembalikan hasil pertama.
     */
    find(
        text: string,
    ): Taksonomi | undefined {

        return this.findAll(text)[0]?.item;

    }

    /**
     * Mengecek apakah terdapat minimal satu KKO.
     */
    has(
        text: string,
    ): boolean {

        return this.find(text) !== undefined;

    }

    private compilePatterns(
        data: readonly Taksonomi[],
    ): readonly Pattern[] {

        return [...data]

            .sort(
                (a, b) =>
                    b.kko.length - a.kko.length,
            )

            .map(item => {

                const source =
                    `(^|\\W)${escapeRegex(
                        this.#normalizer.normalize(item.kko),
                    )}(?=\\W|$)`;

                return {

                    item,

                    regex: new RegExp(
                        source,
                        "i",
                    ),

                    globalRegex: new RegExp(
                        source,
                        "ig",
                    ),

                };

            });

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