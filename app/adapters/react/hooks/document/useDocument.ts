import { useSyncExternalStore } from "react";
import { useEditor } from "../editor/useEditor";

export function useDocument(){

    const facade = useEditor();

    return useSyncExternalStore(

        (listener)=>

            facade.store.subscribe(listener),

        ()=>facade.store.getDocument(),

        ()=>facade.store.getDocument()

    );

}