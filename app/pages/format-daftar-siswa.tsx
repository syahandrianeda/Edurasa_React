import { useMemo } from "react";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import { RenderEditorBlock } from "~/components/toolbars/state-toolbar/comp-text-editor-toolbar";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { SiswaType } from "~/types/siswa";

export default function FormatDaftarSiswaPage(){
    const { value } = useFilterContext<SiswaType>();
    const editor = value.editorFormat;
    const data = value?.dataFilterToolbar ??[];
    const header = value?.desainFormatheader;
    const keyColum = value?.designKeyDataColumn;
    const judulList = useMemo(() => {
        return editor?.judul?.filter(j => j.text.trim() !== '') ?? []
    }, [editor?.judul])

    const paragrafAtas = useMemo(() => {
        return editor?.paragrafAtas && editor.paragrafAtas.text.trim() !== ''
        ? editor.paragrafAtas
        : null
    }, [editor?.paragrafAtas])

    const paragrafBawah = useMemo(() => {
        return editor?.paragrafBawah && editor.paragrafBawah.text.trim() !== ''
        ? editor.paragrafBawah
        : null
    }, [editor?.paragrafBawah]);
    
    return (
        <div className="p-1">
            {
                judulList.map((item, i) => (
                    <RenderEditorBlock key={`judul-${item.type}-${i}`} data={item} />
                ))
            }
            {
                paragrafAtas && (
                    <RenderEditorBlock data={paragrafAtas} />
                )
            }
            {
                
                (header && keyColum) && (
                    <TableWithScrolling>
                                <HeadingTableEduraWithSort<SiswaType> dataHead={[{columns:header}]} data={data} dataKey={keyColum}/>
                            </TableWithScrolling>
                )
            }
            {
                paragrafBawah && (
                        <RenderEditorBlock data={paragrafBawah} />
                    )
            }
        </div>
    )
}