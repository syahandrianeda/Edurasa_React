import type { EditorRuntime } from "../EditorRuntime";
import type { RuntimeTickResult } from "./RuntimeTickResult";

export interface RuntimeEventLoop{

    tick(

        runtime:EditorRuntime

    ):RuntimeTickResult;

}