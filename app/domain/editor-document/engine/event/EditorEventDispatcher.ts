import type { EditorEvent }
from "./EditorEvent";

import type { EditorEventListener }
from "./EditorEventListener";

export class EditorEventDispatcher{

    private listeners =

        new Map<

            string,

            EditorEventListener[]

        >();

    register(

        type:string,

        listener:
            EditorEventListener

    ):void{

        const handlers =

            this.listeners.get(

                type

            ) ?? [];

        handlers.push(

            listener

        );

        this.listeners.set(

            type,

            handlers

        );

    }

    dispatch(

        event:
            EditorEvent

    ):void{

        const handlers =

            this.listeners.get(

                event.type

            ) ?? [];

        handlers.forEach(

            listener =>

                listener.handle(

                    event

                )

        );

    }

}