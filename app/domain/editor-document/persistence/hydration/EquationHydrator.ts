//domain/editor-document/persistence/hydration/EquationHydrator.ts
import type { EquationNode } from "~/domain/editor/contents/equation-node";
import type { ContentNode } from "~/domain/editor/contents/base-node";
import type { NodeHydrator } from "./NodeHydrator";

export class EquationHydrator implements NodeHydrator {

    hydrate(
        payload: unknown
    ): ContentNode {

        return payload as EquationNode;

    }

}