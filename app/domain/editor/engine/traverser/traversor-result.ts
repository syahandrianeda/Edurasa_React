export interface TraversedNode<T = unknown> {

    path: string;

    node: T;

}

export interface TraverserResult<T = unknown> {

    items: TraversedNode<T>[];

}