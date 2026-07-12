export type MediaResourceType =
    | "image"
    | "equation"
    | "audio"
    | "video"
    | "attachment";

export interface MediaResource {
    id: string;

    type: MediaResourceType;

    source: string;

    metadata?: Record<string, unknown>;
}
