import type { EditorPresentationStore }
from "../store/EditorPresentationStore";

import type { EditorPresentationStateSynchronizer }
from "./EditorPresentationStateSynchronizer";

import type { EditorPresentationStateSynchronizerResult }
from "./EditorPresentationStateSynchronizerResult";

export class EditorPresentationStateSynchronizerBuilder{

    build(

        store:EditorPresentationStore

    ):EditorPresentationStateSynchronizerResult{

        const synchronizer:EditorPresentationStateSynchronizer={

            store,

            synchronize:(application)=>{

                /**
                 * Untuk milestone ini Synchronizer hanya
                 * menjadi titik sinkronisasi.
                 *
                 * Implementasi perubahan state akan
                 * dilakukan ketika Presentation Runtime
                 * telah selesai dibangun.
                 */

                void application;

                return{

                    success:true

                };

            }

        };

        return{

            success:true,

            synchronizer

        };

    }

}