import type { EditorHostRuntime }
from "../runtime/EditorHostRuntime";

import type { EditorHostValidator }
from "./EditorHostValidator";

import type { EditorHostValidatorResult }
from "./EditorHostValidatorResult";

export class EditorHostValidatorBuilder{

    build(

        runtime:EditorHostRuntime

    ):EditorHostValidator{

        return{

            runtime,

            validate:()=>{

                if(!runtime.context){

                    return{

                        success:false,

                        message:"Host Context tidak tersedia."

                    };

                }

                if(!runtime.context.presentation){

                    return{

                        success:false,

                        message:"Presentation API tidak tersedia."

                    };

                }

                if(!runtime.session){

                    return{

                        success:false,

                        message:"Host Session tidak tersedia."

                    };

                }

                if(runtime.session.state==="disposed"){

                    return{

                        success:false,

                        message:"Host telah di-dispose."

                    };

                }

                return{

                    success:true

                };

            }

        };

    }

}