
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useState, type PropsWithChildren, type ReactNode } from "react"
import { cn } from "~/lib/utils"
import { type ModalActions, type ModalState } from "./modal-provider"

export interface ModalEduraType{
    state:ModalState,
    actions: ModalActions,
    title?: ()=>string,
    description?: string,
    className?:string,
}

export function ModalEdura({
    state,
    actions,
    title,
    description,
    className,
    children  
}:PropsWithChildren<ModalEduraType>){
    
    const [shake, setShake] = useState("");
    // const titleString = title && title();
    return (
        <Dialog open={state.isOpen} onOpenChange={actions.close}>
            <DialogContent
            onPointerDownOutside={(e) => {
                        if (!state?.configModal?.closeOnOutsideClick) {
                            e.preventDefault();
                            setShake("scale-105");
                            setTimeout(() => setShake(""), 150)
                        }
                    }}
            onEscapeKeyDown={(e) => {
                        if (!state?.configModal?.closeOnOutsideClick) {
                            e.preventDefault()
                        }
                    }}
            // className={cn("p-0 flex flex-col gap-2 overflow-y-auto outline-0 ring-0 border-0 w-full min-h-[calc(100vh-72px)] translate-y-0 top-[5%] dark:bg-gray-600 transition-all duration-500", className, shake)}
            className={cn(`p-0 flex z-50 flex-col gap-2 overflow-y-auto outline-0 ring-0 border-0 md:w-10/12 h-10/12 w-full md:h-11/12 bg-linear-to-br from-sky-100 to-sky-50 scrol-h-custom translate-y-0 top-[5%] dark:bg-gray-600 transition-all duration-500`, className, shake)}
                    >
                <ModalHeaderEdura title={(title && title()) || 'Modal'} description={description}/>
                
                    {children}
                
               
            </DialogContent>
        </Dialog>
    )
}
export function ModalHeaderEdura({title="Title Modal", description=""}:{title?:string, description?:string}){
    return (
        <DialogHeader className="bg-linear-to-tr from-sky-600 to-sky-100 py-2 px-12 md:px-3 gap-0 min-h-16  dark:from-sky-800 dark:to-sky-400 justify-center">
            <DialogTitle className="truncate uppercase font-extrabold align-middle">{title}</DialogTitle>
            <DialogDescription className="text-sky-600 border-t-2 flex w-fit py-0">{description}</DialogDescription>
        </DialogHeader>
    )
}
export function ModalFooterEdura({children}:{children:ReactNode}){
    return (
        // <DialogFooter className="fixed bottom-0 w-full bg-linear-to-tr from-sky-600 to-sky-100/5 dark:from-sky-800 dark:to-sky-400 py-2 px-12 md:px-3 gap-2 min-h-16 flex sm:justify-center items-center inner-shadow-sky-800">
        <DialogFooter className="fixed bottom-0 z-50 w-full bg-linear-to-tr from-sky-600 to-sky-100/85 dark:from-sky-800 dark:to-sky-400 py-2 px-12 max-h-12 md:min-h-16 md:px-3 gap-2 flex sm:justify-center items-center inner-shadow-sky-800">
                    {children}
            </DialogFooter>
    )
}