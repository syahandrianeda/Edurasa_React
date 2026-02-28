import { HeadingLevel, Paragraph, TextRun } from "docx";
import type { headingComp } from "../parser/common-comps/type-comp";
import AlignMapper from "./alignment-docx";
import { pxToTwip } from "~/export/docx/converter/px-to-twip";

export default function MapHeadingDocx(parse:headingComp){
    return new Paragraph({
        //text:parse.text,
        heading:headingMapperLevel(parse.level),
        alignment:AlignMapper(parse.align),
        spacing:{
            before:parse.marginTop,
            after:parse.marginBottom,
            line: pxToTwip(parse.lineHeight),//convertMillimetersToTwip(parse.lineHeight),
            // line:120, // Default line spacing in twips (120 twips = 12 pt)
            lineRule:'exact'
        },
        
        children:[
            new TextRun({
                text:parse.text,
                bold:parse.isBold,
                color:'000000',
                size: parse.fontSize,
                font:parse.fontFamily,
                // underline:{
                //   border:'none'
                // },
                allCaps:parse.isUppercase,
                italics:parse.isItalic,
            })
        ]
    })
}
function headingMapperLevel(level:number){
    switch (level) {
        case 1:
          return HeadingLevel.HEADING_1;
        case 2:
          return HeadingLevel.HEADING_2;
        case 3:
          return HeadingLevel.HEADING_3;
        case 4:
          return HeadingLevel.HEADING_4;
        case 5:
          return HeadingLevel.HEADING_5;
        case 6:
          return HeadingLevel.HEADING_6;
        default:
          return HeadingLevel.HEADING_1;
      }
}