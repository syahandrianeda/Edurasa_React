import type { Taksonomi } from "../entities/Taksonomi";

/**
 * Pattern yang selesai pada suatu TrieNode.
 */
export interface TrieOutput {

    /**
     * Data domain.
     */
    readonly item: Taksonomi;

    /**
     * Panjang keyword yang telah dinormalisasi.
     */
    readonly length: number;

}