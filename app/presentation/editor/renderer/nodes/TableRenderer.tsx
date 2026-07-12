// import type {
//     TableNode
// }
// from "../../../../domain/editor/content/table-node";

import type { TableNode } from "~/domain/editor/contents/table-node";
import { NodeRenderer }
from "../NodeRenderer";

interface Props {

    node: TableNode;

}

export function TableRenderer({

    node

}: Props)
{

    return (

        <table>

            <tbody>

                {

                    node.rows.map(

                        (
                            row,
                            rowIndex
                        ) => (

                            <tr
                                key={
                                    rowIndex
                                }
                            >

                                {

                                    row.cells.map(

                                        (
                                            cell,
                                            cellIndex
                                        ) => (

                                            <td
                                                key={
                                                    cellIndex
                                                }
                                            >

                                                {

                                                    cell.children.map(

                                                        (
                                                            child,
                                                            childIndex
                                                        ) => (

                                                            <NodeRenderer

                                                                key={
                                                                    childIndex
                                                                }

                                                                node={
                                                                    child
                                                                }

                                                            />

                                                        )

                                                    )

                                                }

                                            </td>

                                        )

                                    )

                                }

                            </tr>

                        )

                    )

                }

            </tbody>

        </table>

    );

}