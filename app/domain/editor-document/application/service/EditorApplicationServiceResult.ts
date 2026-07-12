// import type { EditorApplication }
// from "../EditorApplication";
import type { EditorApplicationService } from "./EditorApplicationService";
export interface EditorApplicationServiceResult{

    success:boolean;

    service?:EditorApplicationService;

    message?:string;

}
// export interface EditorApplicationServiceResult{

//     success:boolean;

//     application?:EditorApplication;

//     message?:string;

// }