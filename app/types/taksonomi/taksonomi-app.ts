import type { CognitiveLevel, LkLevel } from "~/domain/taksonomi"

export interface TaksonomiAppType{
    idbaris: number,
    type: CognitiveLevel,
    nama_taksonomi: string,
    kko: string,
    /**
     * ///@deprecated
    levelkognitif: LkLevel,
     */

    LK:LkLevel
    levelkognitif_definisi: string,
}

export interface TaksonomiAppLevelingType {
    levelName:LkLevel,
    Cognitif:CognitifData[]
    levelDefinition:string;
}

export interface CognitifData{
    name: CognitiveLevel,
    description:string,
    kko: string[]
    source?:TaksonomiAppType[]
}