import type { InlineNode } from "./inline-node";

export interface EntityNode {

    type: "entity";

    entityType: string;

    metadata?: Record<string, unknown>;

    children: InlineNode[];
}