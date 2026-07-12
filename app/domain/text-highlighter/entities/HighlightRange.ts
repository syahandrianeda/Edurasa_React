import type { MatchResult } from "../../taksonomi";
// import type { MatchResult } from "~/domain/taksonomi/services/MatchResult";

/**
 * Range yang akan digunakan untuk proses highlight.
 *
 * Satu range dapat memiliki satu atau lebih MatchResult
 * apabila terjadi overlap.
 */
export interface HighlightRange {

    /**
     * Posisi awal.
     */
    readonly start: number;

    /**
     * Posisi akhir (exclusive).
     */
    readonly end: number;

    /**
     * Seluruh MatchResult yang berada
     * pada range ini.
     */
    readonly matches: readonly MatchResult[];

}