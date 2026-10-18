export function prepareHtmlImages(html: string): string {
    if (!html || typeof html !== "string") return html;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    doc.querySelectorAll<HTMLImageElement>("img[src]").forEach((img) => {
        const src = img.getAttribute("src")?.trim();

        if (!src) return;

        img.setAttribute("data-file-preview", "true");
        img.setAttribute("title", "Klik untuk membuka preview");
        img.style.cursor = "pointer";
    });

    return doc.body.innerHTML;
}
