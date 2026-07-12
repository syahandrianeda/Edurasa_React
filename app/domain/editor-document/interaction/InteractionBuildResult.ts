import type { InteractionNode } from "~/domain/editor/interactions/base-node-interaction";

export interface InteractionBuildResult {

    success:boolean;

    interaction?:InteractionNode;

    message?:string;

}