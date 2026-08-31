import type { HTMLContent, JSONContent } from "@tiptap/core";

export function isEmptyTiptapContent(
    document: JSONContent | JSONContent[] | null | undefined
): boolean {

    if (!document) {
        return true;
    }

    const nodes = Array.isArray(document)
        ? document
        : document.content ?? [];

    if (nodes.length === 0) {
        return true;
    }

    return nodes.every(node => {

        if (node.type !== "paragraph") {
            return false;
        }

        return !node.content?.some(child => {

            if (child.type === "text") {
                return Boolean(
                    child.text?.trim()
                );
            }

            /*
             * Semua non-text inline/block node
             * dianggap sebagai content.
             */
            return true;

        });

    });
}