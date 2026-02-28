import { VerticalAlign } from "docx"

export default function VerticalAlignMapper(align:'top'|'center'|'bottom'|'middle'){
    switch(align){
        case 'top':
            return VerticalAlign.TOP
        case 'middle':
            return VerticalAlign.CENTER
        case 'center':
            return VerticalAlign.CENTER
        case 'bottom':
            return VerticalAlign.BOTTOM
        default:
            return VerticalAlign.TOP
    }
}