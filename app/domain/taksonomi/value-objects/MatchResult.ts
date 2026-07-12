import type { Taksonomi } from "../entities/Taksonomi";

export interface MatchResult {

    /**
     * Data Taksonomi yang ditemukan.
     */
    readonly item: Taksonomi;

    /**
     * Posisi awal hasil pencarian.
     */
    readonly start: number;

    /**
     * Posisi akhir (exclusive).
     */
    readonly end: number;

    /**
     * Teks yang cocok.
     */
    readonly text: string;

}