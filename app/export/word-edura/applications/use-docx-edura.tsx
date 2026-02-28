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
type ExportWordEdura = {
    executeWord:void,
    setOrientation:()=>void
}
export default function UseDocxEdura({fileName}:OptionsEduraWord){
    const dispatcher = useAppDispatch();
    const [orientation, setOrientation] = useState<orientationWord>('portrait');
    
    const _setOrientation = useCallback((v:orientationWord)=>{
        return setOrientation(v);
    },[orientation])

    const executeWord = async(element: HTMLElement | null,orientation:orientationWord) =>{
        if(!element) return ;

        _setOrientation(orientation);

        try{
            dispatcher(setloadedApi({
                loaded:true
            }));
            /** parsing element html ke data yang diinginkan */
            const parsedHtml = await ParsingPrintArea(element);
            
            const doc = await MapRootParsedDocx(parsedHtml,orientation);
            await exportDocx(doc, fileName ?? "document.docx")
        }finally{
            dispatcher(setloadedApi({
                loaded:false
            }));
        }

    }
    return {
        executeWord,
        setOrientation:_setOrientation
    }
}