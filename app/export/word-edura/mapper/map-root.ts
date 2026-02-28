import { convertMillimetersToTwip, Document, Paragraph } from "docx";
import type { ParsedElementEdura } from "../parser/common-comps/type-parsed";
import MapHeadingDocx from "./map-heading";
import MapImageRoot from "./map-image";
import type { orientationWord } from "../applications/use-docx-edura";
import MapKopSurat from "./map-kop";
import MapTableCommon from "./map-table-common";
import MapTtd from "./map-kttd";

export default async function MapRootParsedDocx(parsed:ParsedElementEdura[], orientation:orientationWord){
    const children = parsed.map((parse:ParsedElementEdura)=>{
        if(parse.type === 'heading'){
            return MapHeadingDocx(parse)
        }
        if(parse.type === 'table-kop'){
            return MapKopSurat(parse);
        }
        if(parse.type === 'table-ttd'){
            return MapTtd(parse);
        }
        if(parse.type === 'table'){
            
            return MapTableCommon(parse);
        }
        if(parse.type === 'image'){
            return MapImageRoot(parse,orientation)
        }
        return new Paragraph('');
    }) 
    const orien = orientation==='portrait'?{
        // orientation: PageOrientation.PORTRAIT,
        width: convertMillimetersToTwip(210),//11906,
        height: convertMillimetersToTwip(297)//16838
    }:{
        
        // orientation: PageOrientation.LANDSCAPE,
        width: convertMillimetersToTwip(297),//11906,
        height: convertMillimetersToTwip(210)//16838
    }
    return new Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            ...orien
                        },
                        
                        margin: {
                            top: convertMillimetersToTwip(10),//1000,
                            bottom: convertMillimetersToTwip(10),//1000,
                            left: convertMillimetersToTwip(10),// 1000,
                            right: convertMillimetersToTwip(10),//1000
                        }
                    },
                    
                },
                children
            }
        ]
    })
}