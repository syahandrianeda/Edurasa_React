import { useState, useEffect } from "react";
import TipTapEditor from "./editor-tip-tap";
import katex from "katex";
import "katex/dist/katex.min.css";
// import TipTapEditor from "@/components/editor/TipTapEditor";

export default function FormPageTiptap() {
    const [content, setContent] = useState<string>("");
    const [previewHtml, setPreviewHtml] = useState<string>("");

    useEffect(() => {
        if (!content) {
            setPreviewHtml("");
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');

            const mathEls = doc.querySelectorAll('[data-type="math"], [data-type="math-inline"]');
            mathEls.forEach((el) => {
                const formula = el.getAttribute('formula');
                if (formula) {
                    try {
                        const rendered = katex.renderToString(formula, { throwOnError: false });
                        el.innerHTML = rendered;
                    } catch (err) {
                        el.textContent = formula;
                    }
                }
            });

            doc.querySelectorAll('img').forEach((img) => {
                const wrapper = img.parentElement;
                const wrapperStyle = wrapper?.getAttribute('style') || '';
                const wrapperWidth = wrapperStyle.match(/width:\s*([^;]+)/i)?.[1]?.trim() || '';
                const wrapperHeight = wrapperStyle.match(/height:\s*([^;]+)/i)?.[1]?.trim() || '';
                const imageWidth = img.getAttribute('width') || img.getAttribute('style')?.match(/width:\s*([^;]+)/i)?.[1]?.trim() || wrapperWidth;
                const imageHeight = img.getAttribute('height') || img.getAttribute('style')?.match(/height:\s*([^;]+)/i)?.[1]?.trim() || wrapperHeight;

                const existingStyle = img.getAttribute('style') || '';
                const styleParts = existingStyle
                    .split(';')
                    .map((part) => part.trim())
                    .filter(Boolean);

                const setOrReplace = (declaration: string) => {
                    const [prop] = declaration.split(':');
                    const normalizedProp = prop.trim().toLowerCase();
                    const filtered = styleParts.filter((part) => !part.toLowerCase().startsWith(`${normalizedProp}:`));
                    filtered.push(declaration);
                    return filtered;
                };

                let normalizedStyleParts = [...styleParts];
                normalizedStyleParts = setOrReplace('display:inline-block');
                normalizedStyleParts = setOrReplace('max-width:100%');
                normalizedStyleParts = setOrReplace('vertical-align:middle');

                if (imageWidth && imageWidth !== 'auto') {
                    normalizedStyleParts = setOrReplace(`width:${imageWidth}`);
                }
                if (imageHeight && imageHeight !== 'auto') {
                    normalizedStyleParts = setOrReplace(`height:${imageHeight}`);
                }

                const normalizedStyle = Array.from(new Set(normalizedStyleParts)).join('; ');
                img.setAttribute('style', normalizedStyle);
                img.setAttribute('referrerpolicy', 'no-referrer');
                img.setAttribute('crossorigin', 'anonymous');
                img.setAttribute('loading', 'lazy');
                img.setAttribute('class', `${img.getAttribute('class') || ''} tiptap-inline-image`.trim());
            });

            setPreviewHtml(doc.body.innerHTML);
        } catch (err) {
            setPreviewHtml(content);
        }
    }, [content]);
    return (
        <div className="p-4">
        <h1>Form Editor</h1>

        <TipTapEditor value={content} onChange={setContent} />

        <div className="mt-4 text-wrap border" dangerouslySetInnerHTML={{__html: previewHtml}} />
        </div>
        
    );
}