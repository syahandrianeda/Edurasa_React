import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { OrmPromesResult } from "~/types/prota_prosem/prosem-types";

export default function TabelSebaranProta({data}:{data: OrmPromesResult|undefined}){
    if(!data || !data.table_prosem) return null;
    const { headers, rows } = data.table_prosem;
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    {headers.top.map((h, i)=> (
                        <ThEdura key={i} colSpan={h.colSpan} rowSpan={h.rowSpan} className="text-center">{h.label}</ThEdura>
                    ))}
                </TRowEdura>
                <TRowEdura>
                    {headers.sub.map((s, i)=> (
                        <ThEdura key={i} className="text-center">{s.label}</ThEdura>
                    ))}
                </TRowEdura>
            </thead>
            <tbody>
                {rows.map((r,ri)=> (
                    <TRowEdura key={ri}>
                        <TdEdura className="align-middle text-center">{ri+1}</TdEdura>
                        <TdEdura className="align-middle">{r.item.atp_as_tp_description}</TdEdura>
                        {r.cells.map((cell,ci)=> (
                            <TdEdura key={ci} className="align-middle text-center">
                                {cell.length===0? null : cell.map((p,pi)=> (
                                    <div key={pi}>{p.tgl}/{p.monthIndex+1}</div>
                                ))}
                            </TdEdura>
                        ))}
                    </TRowEdura>
                ))}
            </tbody>
        </TableWithScrolling>
    )
}
