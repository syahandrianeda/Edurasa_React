import type { EditorHostRuntime }
from "../runtime/EditorHostRuntime";

import type { EditorHostProvider }
from "./EditorHostProvider";

import type { EditorHostProviderResult }
from "./EditorHostProviderResult";

export class EditorHostProviderBuilder{

    build(

        runtime:EditorHostRuntime

    ):EditorHostProviderResult{

        const provider:EditorHostProvider={

            runtime

        };

        return{

            success:true,

            provider

        };

    }

}