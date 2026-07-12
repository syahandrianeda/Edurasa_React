export class ContentFactory {

    static paragraph() {
        return {
            id: crypto.randomUUID(),
            type: "paragraph",
            children: [],
        };
    }

    static image(assetId?: string) {
        return {
            id: crypto.randomUUID(),
            type: "image",
            assetId,
        };
    }

    static equation(latex: string) {
        return {
            id: crypto.randomUUID(),
            type: "equation",
            latex,
        };
    }

}