import type { CognitifData, TaksonomiAppLevelingType, TaksonomiAppType } from "~/types/taksonomi/taksonomi-app";
import { resolveEnum, resolveNumber, resolveString } from "./_resolver";
import  { type CognitiveLevel, type LkLevel, type MatchResult } from "~/domain/taksonomi";
import type { TaksonomiSheetType } from "~/types/taksonomi/taksonomi-sheet";

export default class DtoTaksonomi{
    constructor(private items:TaksonomiSheetType[]){}
    
    static fromSheet(data:Record<string, any>):TaksonomiAppType{
        return {
            idbaris: resolveNumber(data.idbaris),
            type: DtoTaksonomi.resolveCognitiveType(data.tipe),
            nama_taksonomi: resolveString(data.nama_taksonomi),
            kko: resolveString(data.kko),
            // levelkognitif: DtoTaksonomi.resolveLkLevelType(data.levelkognitif),
            LK: DtoTaksonomi.resolveLkLevelType(data.levelkognitif),
            levelkognitif_definisi: resolveString(data.levelkognitif_definisi),
        }
    }
    
    static arrayFromSheet(data:Record<string, any>):TaksonomiAppType[]{
        return data.map(this.fromSheet);
    }

    get Level():TaksonomiAppLevelingType[]{
        return DtoTaksonomi.taksonomiAppLevel(this.items);
    }
    get data():TaksonomiAppType[]{
        return DtoTaksonomi.arrayFromSheet(this.items)
    }
    
    /** ganti sumber
     * 
    static taksonomiAppLevel(data:TaksonomiSheetType[]):TaksonomiAppLevelingType[]{
        const dataTaksonomiApp = this.arrayFromSheet(data);

        const levelMap = new Map<LkLevel, Map<CognitiveLevel, {
            name: CognitiveLevel;
            description: string;
            kko: string[];
        }>>();

        for (const item of dataTaksonomiApp) {

            // pastikan level sudah ada
            if (!levelMap.has(item.LK)) {
                levelMap.set(item.LK, new Map());
            }

            const cognitiveMap = levelMap.get(item.LK)!;

            // pastikan cognitive sudah ada
            if (!cognitiveMap.has(item.type)) {
                cognitiveMap.set(item.type, {
                    name: item.type,
                    description: item.nama_taksonomi,
                    kko: [],
                });
            }

            cognitiveMap.get(item.type)!.kko.push(item.kko);
        }

        return Array.from(levelMap.entries()).map(([levelName, cognitiveMap]) => ({
            levelName,
            Cognitif: Array.from(cognitiveMap.values()),
        }));
    }
     */
    static taksonomiAppLevel(
        data: Record<string, any>[]
    ): TaksonomiAppLevelingType[] {

        const items = this.arrayFromSheet(data);

        const levelMap = new Map<
            LkLevel,
            {
                levelDefinition: string;
                cognitifMap: Map<CognitiveLevel, CognitifData>;
            }
        >();

        for (const item of items) {

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

    static resolveLkLevelType(type:string):LkLevel{
        switch(type){
            case 'LK1':
                return 'LK1';
            case 'LK2':
                return 'LK2';
            case 'LK3':
                return 'LK3';
            default:
                return 'LK2' ;
        }
    }
    static resolveCognitiveType(type:string):CognitiveLevel{
        switch(type){
            case 'C1':
                return 'C1';
            case 'C2':
                return 'C2';
            case 'C3':
                return 'C3';
            case 'C4':
                return 'C4';
            case 'C5':
                return 'C5';
            case 'C6':
                return 'C6';
            default:
                return 'C1' ;
        }
    }

    collectionMatcher(matcher: readonly MatchResult[]){
        const dataTaksonomiApp = this.data;
        const dataMatcherTaksonomi = matcher.map(m=>m.item);

        const levelMap = new Map<LkLevel, Map<CognitiveLevel, {
            name: CognitiveLevel;
            description: string;
            kko: string[];
        }>>();

        for (const item of dataMatcherTaksonomi) {

            // pastikan level sudah ada
            if (!levelMap.has(item.LK)) {
                levelMap.set(item.LK, new Map());
            }

            const cognitiveMap = levelMap.get(item.LK)!;

            // pastikan cognitive sudah ada
            if (!cognitiveMap.has(item.type)) {
                cognitiveMap.set(item.type, {
                    name: item.type,
                    description: item.nama_taksonomi,
                    kko: [],
                });
            }

            cognitiveMap.get(item.type)!.kko.push(item.kko);
        }

        return Array.from(levelMap.entries()).map(([levelName, cognitiveMap]) => ({
            levelName,
            Cognitif: Array.from(cognitiveMap.values()),
            countKko:  Array.from(cognitiveMap.values()).length
        }));
    }
}