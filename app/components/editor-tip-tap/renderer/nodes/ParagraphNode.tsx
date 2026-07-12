import { NodeRenderer } from "../NodeRenderer";
import type { JSONContent } from "@tiptap/react";

export default function ParagraphNode({node}: {node:JSONContent}){
    return (
                <p>
                    {node.content?.map((child, index) => (
                        <NodeRenderer
                            key={index}
                            node={child}
                        />
                    ))}
                </p>
            );
}