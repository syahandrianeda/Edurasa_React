import type { NodePath } from "./NodePath";


export interface NodeReference<T = unknown> {

    path: NodePath;

    node: T;

}
