import type { BaseNode } from "./base-node";

export interface ImageNode extends BaseNode {

    type: "image";

    assetId?: string;

    snapshot?: {
        source: string;
    };

    width?: number;

    height?: number;
}