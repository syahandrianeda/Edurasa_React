import type { DocumentRendererProps } from "./types";
import { renderNodeHtml } from "./NodeHtmlRenderer";

export function HtmlRenderer({
    document,
}: DocumentRendererProps): string {

    if (!document) {
        return "";
    }

    if (Array.isArray(document)) {
        return document
            .map(node => renderNodeHtml(node))
            .join("");
    }

    return (document.content ?? [])
        .map(node => renderNodeHtml(node))
        .join("");
}