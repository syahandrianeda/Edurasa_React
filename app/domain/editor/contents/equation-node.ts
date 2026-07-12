import type { BaseNode } from "./base-node";

export interface EquationNode extends BaseNode {

    type: "equation";

    latex: string;

    assetId?: string;
}