export class InlineFactory {

    static text(text: string) {
        return {
            type: "text",
            text,
            marks: [],
        };
    }

}