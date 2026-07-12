import type { RuntimeEventLoop }
from "./RuntimeEventLoop";

export interface RuntimeEventLoopResult{

    success:boolean;

    eventLoop?:RuntimeEventLoop;

    message?:string;

}