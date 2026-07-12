import type { JSONContent } from "@tiptap/react";
import type { DocumentRendererProps } from "./types";
import { NodeRenderer } from "./NodeRenderer";

export function DocumentRenderer({
    document,
}: DocumentRendererProps) {

    if (!document) {
        return null;
    }

    if (Array.isArray(document)) {
        return (
            <>
                {document.map((node, index) => (
                    <NodeRenderer
                        key={index}
                        node={node}
                    />
                ))}
            </>
        );
    }

    return (
        <>
            {document.content?.map((node, index) => (
                <NodeRenderer
                    key={index}
                    node={node}
                />
            ))}
        </>
    );
}