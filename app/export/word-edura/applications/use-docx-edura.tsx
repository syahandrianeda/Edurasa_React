import { useCallback, useState } from "react";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { useAppDispatch } from "~/context-reduct/hook";
import ParsingPrintArea from "../parser/parsing-print-area";
import MapRootParsedDocx from "../mapper/map-root";
import { exportDocx } from "~/export/docx/application/docx-exporter";

type OptionsEduraWord = {
    fileName: string,
}
export type orientationWord = 'portrait'|'landscape';

/** Membersihkan nama file dari karakter yang tidak valid di Windows. */
export function sanitizeWordFileName(fileName: string) {
    const cleaned = fileName
        .replace(/[\\/:*?"<>|]/g, "-")
        .replace(/\s+/g, " ")
        .trim();

    if (!cleaned) return "document.docx";
    return /\.docx$/i.test(cleaned) ? cleaned : `${cleaned}.docx`;
}

export default function UseDocxEdura({fileName}:OptionsEduraWord){
    const dispatcher = useAppDispatch();
    const [orientation, setOrientation] = useState<orientationWord>('portrait');
    const [isExporting, setIsExporting] = useState(false);

    const _setOrientation = useCallback((v:orientationWord)=>{
        setOrientation(v);
    },[])

    const executeWord = useCallback(async(
        element: HTMLElement | null,
        orientation: orientationWord = 'portrait'
    ) => {
        if(!element || isExporting) return;

        _setOrientation(orientation);
        setIsExporting(true);

        try{
            dispatcher(setloadedApi({
                loaded:true, name:'loaded_animation'
            }));
            /** parsing element html ke data yang diinginkan */
            const parsedHtml = await ParsingPrintArea(element);

            const doc = await MapRootParsedDocx(parsedHtml,orientation);
            await exportDocx(doc, sanitizeWordFileName(fileName ?? "document.docx"));
        }finally{
            setIsExporting(false);
            dispatcher(setloadedApi({
                loaded:false, name:'loaded_animation'
            }));
        }
    }, [dispatcher, fileName, isExporting, _setOrientation])

    return {
        executeWord,
        setOrientation:_setOrientation,
        isExporting,
    }
}