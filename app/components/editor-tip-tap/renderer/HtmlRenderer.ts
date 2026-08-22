import type { DocumentRendererProps } from "./types";
import { renderNodeHtml } from "./NodeHtmlRenderer";
import { isEmptyTiptapContent } from "./isEmptyKontenTiptap";

export function HtmlRenderer({
    document,
}: DocumentRendererProps): string {
    if (isEmptyTiptapContent(document)) {
        return "";
    }

    if (Array.isArray(document)) {
        return document
            .map(node => renderNodeHtml(node))
            .join("");
    }

    return (document?.content ?? [])
        .map(node => renderNodeHtml(node))
        .join("");
    // if (!document) {
    //     return "";
    // }
    // if (isEmptyTiptapContent(document)) {
    //     return "";
    // }


    // if (Array.isArray(document)) {
    //     return document
    //         .map(node => renderNodeHtml(node))
    //         .join("");
    // }

    // return (document.content ?? [])
    //     .map(node => renderNodeHtml(node))
    //     .join("");
}