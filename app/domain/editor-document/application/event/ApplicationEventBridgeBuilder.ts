import type { ApplicationEventBridge }
from "./ApplicationEventBridge";

import type { ApplicationEventBridgeResult }
from "./ApplicationEventBridgeResult";

export class ApplicationEventBridgeBuilder{

    build():ApplicationEventBridgeResult{

        const bridge:ApplicationEventBridge={

            dispatch(){

                /**
                 * Default Bridge.
                 *
                 * Infrastructure akan melakukan override.
                 */

            }

        };

        return{

            success:true,

            bridge

        };

    }

}