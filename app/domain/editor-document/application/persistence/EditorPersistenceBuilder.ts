import type { EditorPersistencePort }
from "./EditorPersistencePort";

import type { EditorPersistenceResult }
from "./EditorPersistenceResult";

export class EditorPersistenceBuilder{

    build():EditorPersistencePort{

        return{

            save(document){

                return{

                    success:true,

                    document

                };

            },

            load(){

                return{

                    success:false,

                    message:"Persistence belum diimplementasikan."

                };

            }

        };

    }

}