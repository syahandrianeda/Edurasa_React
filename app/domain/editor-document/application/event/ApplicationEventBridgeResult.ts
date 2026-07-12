import type { ApplicationEventBridge }
from "./ApplicationEventBridge";

export interface ApplicationEventBridgeResult{

    success:boolean;

    bridge?:ApplicationEventBridge;

    message?:string;

}