import type { HTMLContent, JSONContent } from "@tiptap/react";

export interface DocumentRendererProps {
    document: JSONContent | JSONContent[] | null;
}