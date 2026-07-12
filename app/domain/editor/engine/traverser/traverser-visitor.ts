export interface TraverserVisitor {

    visit(
        node: unknown,
        path: string
    ): void;

}