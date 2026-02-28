import { ImageRun, Paragraph } from "docx";
import type { ImageNodeEdura } from "../parser/common-comps/type-comp";
import type { orientationWord } from "../applications/use-docx-edura";

export default function MapImageRoot(element:ImageNodeEdura,type:orientationWord){
    
    const w = type === 'portrait'?710:1020;
    const ratio = element.height / element.width;
    const newHeight = Math.round(w * ratio);
    
    return new Paragraph({
        children:[
            new ImageRun({
                type:'png',
                data: new Uint8Array(element.data),
                transformation:{
                    width:w,
                    height: newHeight
                }
            })
        ]
    })
}