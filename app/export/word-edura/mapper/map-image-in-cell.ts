import { ImageRun } from "docx";
import type { ImageNodeEdura } from "../parser/common-comps/type-comp";

export default function MapImageCell(element:ImageNodeEdura){
    
    
    return new ImageRun({
                type:'png',
                data: new Uint8Array(element.data),
                transformation:{
                    width:element.width*0.8,
                    height: element.height*0.8
                }
            })
        
}