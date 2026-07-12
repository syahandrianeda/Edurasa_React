import type { PropsWithChildren } from "react";
import type { EditorPlatform } from "~/application/editor/bootstrap/EditorPlatform";

export interface EditorProviderProps
    extends PropsWithChildren{

    platform:EditorPlatform;

}


// import type { ReactNode }
// from "react";

// import type { EditorHostApi }
// from "../../../domain/editor-host/public-api/EditorHostApi";

// export interface EditorProviderProps{

//     readonly host:EditorHostApi;

//     readonly children:ReactNode;

// }