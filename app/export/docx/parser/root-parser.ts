import { parseImage, type ImageNode } from "./img-parser"
import type { ParsedNode } from "./node-parser-type"
import { parseTable } from "./table-parser"

export async function parseRoot(element: HTMLElement): Promise<ParsedNode[]> {
    const result: ParsedNode[] = [];

    async function walk(node: HTMLElement): Promise<void> {
        const tag = node.tagName;

        // --- TABLE ---
        if (tag === "TABLE") {
            const tableNode = await parseTable(node as HTMLTableElement);
            result.push(tableNode );
            return; // jangan lanjut ke children
        }

        // --- HEADING ---
        if (/^H[1-6]$/.test(tag)) {
            result.push({
                type: "heading",
                level: Number(tag[1]),
                text: node.textContent ?? "",
                classList: node.className ? node.className.split(" ") : []
            });
        }

        // --- IMAGE (bukan di dalam TD) ---
        if (
            tag === "IMG" &&
            !node.closest("td")
        ) {
            const imageNode = await parseImage(node as HTMLImageElement);
            result.push(imageNode as ImageNode);
        }

        // --- WALK CHILDREN (async-safe) ---
        for (const child of Array.from(node.children)) {
            await walk(child as HTMLElement);
        }
    }

    await walk(element);
    return result;
}
