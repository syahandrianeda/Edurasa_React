import { type LucideIcon } from "lucide-react";

export type GroupToolbarTiptap =
    |'huruf'
    |'paragraf'
    |'lampiran'
    /** table */
    | "rows-columns" 
    | "merge" 
    | "header" 
    // | "table" //<-- ini tidak perlu 
    | 'cell-size' //<--biarkan ini tetap ada 
    |'cell-alignment'
    
export interface GroupSectionsMenu{
    groupName: GroupToolbarTiptap,
    sectionName?: string,
    options: OptionsMenu[]
} 
export interface GroupSectionsMenuBubble{
    groupName: GroupToolbarTiptap,
    sectionName?: string,
    options: ButtonMenuTiptap[]
}
export interface ButtonMenuTiptap{
    id:string
    icon:LucideIcon,
    isShow:boolean,
    onClick: () => void,
    group?:GroupToolbarTiptap
}
export interface OptionsMenu{
    id:string
    icon:LucideIcon,
    onClick: () => void,
    group?:GroupToolbarTiptap
    pressed: boolean,
    
}
export interface CollectionButtonBubbleTable{ 
    collections: ButtonMenuTiptap[] 
}
export interface PecahanBiasa{
    numerator:number, 
    denominator:number
}

export interface PecahanCampuran extends PecahanBiasa{
    satuan:number, 
}

export interface RootMath {
    degree: number;
    value: number;
}

export interface SquareRoot {
    value: number;
}
export interface CubeRoot {
    value: number;
}


