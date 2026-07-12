import "@tiptap/core";

declare module "@tiptap/core" {

    interface Commands<ReturnType> {

        tableCell: {

            setCellVerticalAlign: (
                value: "top" | "middle" | "bottom",
            ) => ReturnType;

        };

    }

}