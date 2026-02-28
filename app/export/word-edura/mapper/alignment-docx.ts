import { AlignmentType } from "docx"

export default function AlignMapper(align:string){
    switch(align){
    //     readonly START: "start";
        case "start":
            return AlignmentType.START
        case "center":
            return AlignmentType.CENTER
        case "end":
            return AlignmentType.END
            
        default:
            return AlignmentType.LEFT
    }
}
