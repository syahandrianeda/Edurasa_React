import type { JSONContent } from "@tiptap/react";
import { renderKatex, renderKatexToSvg } from "./renderKatex";
import ParagraphNode from "./nodes/ParagraphNode";
import { applyMarks } from "./renderMarks";
import type {JSX} from "react";
import NoImage from '../../../images/noImage.png'

interface Props {
    node: JSONContent;
}

export function NodeRenderer({
    node,
}: Props): React.ReactNode {

    switch (node.type) {

        case "paragraph":

            return (
                <p
                    style={{
                        textAlign: node.attrs?.textAlign,
                    }}
                >
                    {node.content?.map((child, index) => (
                        <NodeRenderer
                            key={index}
                            node={child}
                        />
                    ))}
                </p>
            );

        case "heading":  {
                const children = node.content?.map((child, index) => (
                    <NodeRenderer
                        key={index}
                        node={child}
                    />
                ));
                const level = node.attrs?.level ?? 1;
                const style: React.CSSProperties = { textAlign: node.attrs?.textAlign, };
                
                // switch (node.attrs?.level) {
                switch (level) {
                    case 1:
                        return ( <h1 style={style}> {children} </h1> );
                    case 2:
                        return ( <h2 style={style}> {children} </h2> );
                    case 3:
                        return ( <h3 style={style}> {children} </h3> );
                    case 4:
                        return ( <h4 style={style}> {children} </h4> );
                    case 5:
                        return ( <h5 style={style}> {children} </h5> );
                    case 6:
                    default:
                        return ( <h6 style={style}> {children} </h6> );
                }
            }

        case "text":
            return applyMarks(
                node,
                node.text ?? "",
            );

        case "hardBreak":
            return <br />;

        case "inlineMath":

            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: renderKatex(
                            node.attrs?.latex ?? "",
                            false,
                        ),
                    }}
                />
                // <img src={renderKatexToSvg(node.attrs?.latex ?? '')} className="inline-block" />
            );

        case "blockMath":

            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: renderKatex(
                            node.attrs?.latex ?? "",
                            true,
                        ),
                    }}
                />
            );
        
        case "bulletList": {
            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            return (
                <ul>
                    {children}
                </ul>
            );

        }

        case "orderedList": {
            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            return (
                <ol>
                    {children}
                </ol>
            );
        }

        case "listItem": {

            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            return (
                <li>
                    {children}
                </li>
            );

        }
        
        case 'image': {
            return ( <img
                    src={node.attrs?.src ?? NoImage}
                    alt={node.attrs?.alt ?? "edura_image"}
                    title={node.attrs?.title ??''}
                    width={node.attrs?.width ?? 'auto'}
                    height={node.attrs?.height ?? 'auto'}
                    className="inline-block align-middle"
                    data-word="image-soal"
                    referrerPolicy="no-referrer"
                    />
            )
        }
        case "table": {
            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            return (
                <table
                    style={{
                        width: node.attrs?.width,
                    }}
                >
                    <tbody>
                        {children}
                    </tbody>
                </table>
            );

        }
        case "tableRow": {

            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            return (
                <tr>
                    {children}
                </tr>
            );

        }
        case "tableHeader": {

            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            const width =
                Array.isArray(node.attrs?.colwidth)
                    ? node.attrs.colwidth[0]
                    : undefined;

            return (
                <th
                    colSpan={node.attrs?.colspan}
                    rowSpan={node.attrs?.rowspan}
                    style={{
                        width,
                    }}
                >
                    {children}
                </th>
            );

        }
        case "tableCell": {

            const children = node.content?.map((child, index) => (
                <NodeRenderer
                    key={index}
                    node={child}
                />
            ));

            const width =
                Array.isArray(node.attrs?.colwidth)
                    ? node.attrs.colwidth[0]
                    : undefined;
            const verticalAlign = node.attrs?.verticalAlign;
            return (
                <td
                    colSpan={node.attrs?.colspan}
                    rowSpan={node.attrs?.rowspan}
                    style={{
                        width,
                        verticalAlign
                    }}
                >
                    {children}
                </td>
            );

        }
        default:

            return null;
    }

}
