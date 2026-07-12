import type { EditorHostRuntime }
from "../runtime/EditorHostRuntime";

import type { EditorHostLifecycle }
from "./EditorHostLifecycle";

import type { EditorHostLifecycleResult }
from "./EditorHostLifecycleResult";

export class EditorHostLifecycleBuilder{

    build(

        runtime:EditorHostRuntime

    ):EditorHostLifecycleResult{

        const lifecycle:EditorHostLifecycle={

            runtime,

            initialize:()=>{

                if(runtime.session.state!=="idle"){

                    return{

                        success:false,

                        message:"Host hanya dapat diinisialisasi dari state 'idle'."

                    };

                }

                return{

                    success:true

                };

            },

            activate:()=>{

                if(runtime.session.state!=="ready"){

                    return{

                        success:false,

                        message:"Host hanya dapat diaktifkan dari state 'ready'."

                    };

                }

                return{

                    success:true

                };

            },

            dispose:()=>{

                if(runtime.session.state==="disposed"){

                    return{

                        success:false,

                        message:"Host telah berada pada state 'disposed'."

                    };

                }

                return{

                    success:true

                };

            }

        };

        return{

            success:true,

            lifecycle

        };

    }

}