import type { NodePath } from "./NodePath";


export interface NodeAddress {

    questionIndex:number;

    section?:
        "stimulus"
        | "pertanyaan"
        | "interaction"
        | "pembahasan";

    path:NodePath;

}