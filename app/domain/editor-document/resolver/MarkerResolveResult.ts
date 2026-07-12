import type { SectionNode } from "~/domain/editor/sections/section-node";

export interface MarkerResolveResult {

    success:boolean;

    section?:SectionNode;

    message?:string;

}