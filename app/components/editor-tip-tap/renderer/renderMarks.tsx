import type { JSONContent } from "@tiptap/react";
import type { ReactNode } from "react";

export function applyMarks(
    node: JSONContent,
    children: ReactNode,
): ReactNode {

    if (!node.marks?.length) {
        return children;
    }

    return node.marks.reduce<ReactNode>((content, mark, index) => {

        switch (mark.type) {

            case "bold":
                return (
                    <strong key={index}>
                        {content}
                    </strong>
                );

            case "italic":
                return (
                    <em key={index}>
                        {content}
                    </em>
                );

            case "underline":
                return (
                    <u key={index}>
                        {content}
                    </u>
                );

            case "strike":
                return (
                    <s key={index}>
                        {content}
                    </s>
                );

            case "code":
                return (
                    <code key={index}>
                        {content}
                    </code>
                );

            default:
                return content;

        }

    }, children);

}