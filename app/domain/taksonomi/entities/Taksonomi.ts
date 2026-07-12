import type { CognitiveLevel } from "../value-objects/CognitiveLevel";
import type { LkLevel } from "../value-objects/LkLevel";

export interface Taksonomi {

    /**
     * Kata Kerja Operasional
     */
    readonly kko: string;

    /**
     * Tingkat kognitif
     */
    readonly type: CognitiveLevel;

    /**
     * Level Literasi/Kompleksitas
     */
    readonly LK: LkLevel;

    /** addtional */
    readonly idbaris: number,
    
    readonly nama_taksonomi: string,
    
    readonly levelkognitif_definisi: string,

}