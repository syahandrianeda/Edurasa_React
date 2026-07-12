import type { MatchResult } from "~/domain/taksonomi";

/**
 * Potongan teks hasil proses highlight.
 */
export interface HighlightSegment {

    /**
     * Potongan teks.
     */
    readonly text: string;

    /**
     * Menandakan apakah bagian ini merupakan highlight.
     */
    readonly highlight: boolean;

    /**
     * Seluruh MatchResult yang berkaitan
     * dengan segmen ini.
     */
    readonly matches: readonly MatchResult[];

}