import type { JSONContent } from "@tiptap/react";

import { renderKatex } from "./renderKatex";

export function renderNodeHtml(
    node: JSONContent,
): string {

    switch (node.type) {

        case "paragraph": {

            return `<p style="${renderTextAlign(node)}" ${renderClass(node)}>${renderChildren(node)}</p>`;
        }

        case "heading": {

            const level = node.attrs?.level ?? 1;

            return `<h${level} style="${renderTextAlign(node)}">${renderChildren(node)}</h${level}>`;
        }

        case "text":

            return applyMarks(
                node,
                node.text ?? "",
            );

        case "hardBreak":

            return "<br />";

        case "inlineMath":

            return renderKatex(
                node.attrs?.latex ?? "",
                false,
            );

        case "blockMath":

            return renderKatex(
                node.attrs?.latex ?? "",
                true,
            );

        case "bulletList":

            return `<ul>${renderChildren(node)}</ul>`;

        case "orderedList":

            return `<ol>${renderChildren(node)}</ol>`;

        case "listItem":

            return `<li>${renderChildren(node)}</li>`;

        case "image": {

            const src = node.attrs?.src ?? "";
            const alt = node.attrs?.alt ?? "";
            const title = node.attrs?.title ?? "";
            const h = node.attrs?.height??'auto';
            const w = node.attrs?.width??'auto';
/** 
 * src={node.attrs?.src ?? NoImage}
                    alt={node.attrs?.alt ?? "edura_image"}
                    title={node.attrs?.title ??''}
                    width={node.attrs?.width ?? 'auto'}
                    height={node.attrs?.height ?? 'auto'}
                    className="inline-block align-middle"
                    data-word="image-soal"
                    referrerPolicy="no-referrer"
 */
            return `<img src="${src}" alt="${alt}" title="${title}" height="${h}" width="${w}" data-word="image-soal" referrerPolicy="no-referrer" class="inline-block align-middle" />`;
        }

        case "table":

            return `<table><tbody>${renderChildren(node)}</tbody></table>`;

        case "tableRow":

            return `<tr>${renderChildren(node)}</tr>`;

        case "tableHeader": {

            const colspan = node.attrs?.colspan ?? 1;
            const rowspan = node.attrs?.rowspan ?? 1;

            const width = Array.isArray(node.attrs?.colwidth) ? node.attrs.colwidth[0] : undefined;
            const verticalAlign = node.attrs?.verticalAlign??'top';
            let st = `vertical-align:${verticalAlign};`
            const w = width ? `width:${width}px;` : "";
            st+=w;
            const widthStyle =` style="${st}"`;

            return `<th colspan="${colspan}" rowspan="${rowspan}"${widthStyle}>${renderChildren(node)}</th>`;
        }

        case "tableCell": {

            const colspan = node.attrs?.colspan ?? 1;
            const rowspan = node.attrs?.rowspan ?? 1;

            const width = Array.isArray(node.attrs?.colwidth) ? node.attrs.colwidth[0] : undefined;

            const verticalAlign = node.attrs?.verticalAlign??'top';
            let st = `vertical-align:${verticalAlign};`
            const w = width ? `width:${width}px;` : "";
            st+=w;
            const widthStyle =` style="${st}"`;
            return `<td colspan="${colspan}" rowspan="${rowspan}"${widthStyle}>${renderChildren(node)}</td>`;
        }

        default:

            return "";
    }

}

/**
 * Render seluruh child node.
 */
function renderChildren(
    node: JSONContent,
): string {

    return (node.content ?? [])
        .map(child => renderNodeHtml(child))
        .join("");

}

function renderClass(node:JSONContent):string|undefined{
    const className = node.attrs?.class
    if(!className) return ''
    if(className){
        return `class:"${className}"`
    }

}
/**
 * Render text-align.
 */
function renderTextAlign(
    node: JSONContent,
): string {

    const textAlign = node.attrs?.textAlign;

    if (!textAlign) {
        return "text-align:left";
    }

    return `text-align:${textAlign};`;

}

/**
 * Render seluruh marks.
 */
function applyMarks(
    node: JSONContent,
    text: string,
): string {

    let result = text;

    for (const mark of node.marks ?? []) {

        switch (mark.type) {

            case "bold":
                result = `<strong>${result}</strong>`;
                break;

            case "italic":
                result = `<em>${result}</em>`;
                break;

            case "underline":
                result = `<u>${result}</u>`;
                break;

            case "strike":
                result = `<s>${result}</s>`;
                break;

            case "code":
                result = `<code>${result}</code>`;
                break;

        }

    }

    return result;

}