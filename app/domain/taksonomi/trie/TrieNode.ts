import type { Taksonomi } from "../entities/Taksonomi";
import type { TrieOutput } from "./TrieOutput";
/**
 * Node pada Trie yang digunakan oleh engine Aho-Corasick.
 *
 * Node ini hanya menyimpan struktur data.
 * Belum memiliki business logic pencarian.
 */
export class TrieNode {

    /**
     * Transisi karakter berikutnya.
     */
    readonly children = new Map<string, TrieNode>();

    /**
     * Failure link.
     *
     * Akan diisi pada Step 3.
     */
    failure: TrieNode | null = null;

    /**
     * Semua Taksonomi yang selesai pada node ini.
     *
     * Satu node dapat memiliki lebih dari satu output.
     */
    // readonly outputs: Taksonomi[] = [];
    readonly outputs: TrieOutput[] = [];

    /**
     * Menambahkan child jika belum ada.
     */
    getOrCreateChild(
        char: string,
    ): TrieNode {

        let child = this.children.get(char);

        if (!child) {

            child = new TrieNode();

            this.children.set(char, child);

        }

        return child;

    }

    /**
     * Mengambil child.
     */
    getChild(
        char: string,
    ): TrieNode | undefined {

        return this.children.get(char);

    }

    /**
     * Menambahkan output.
     */
    // addOutput(
    //     item: Taksonomi,
    // ): void {

    //     this.outputs.push(item);

    // }
    addOutput(
        item: Taksonomi,
        length: number,
    ): void {

        this.outputs.push({

            item,

            length,

        });

    }

}