export interface SerializedEditorDocument {

    version: string;

    metadata: Record<string, unknown>;

    children: unknown[];

}