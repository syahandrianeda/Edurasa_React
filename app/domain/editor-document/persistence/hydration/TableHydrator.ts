//domain/editor-document/persistence/hydration/TableHydrator.ts
import type { TableNode } from "~/domain/editor/contents/table-node";

import type { ContentNode } from "~/domain/editor/contents/base-node";

import type { NodeHydrator } from "./NodeHydrator";

export class TableHydrator implements NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode {

        return payload as TableNode;

    }

}