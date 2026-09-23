import { createContext, useCallback, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react"
import type { SiswaType } from "~/types/siswa"
import type { ModalType } from "./modal-type"



export interface ConfigModelType{
    closeOnOutsideClick: boolean,
    backToModalType?:ModalState
}

export const DEFAULT_CONFIG_MODAL: ConfigModelType = {
    closeOnOutsideClick: true,
}
export interface ModalState<TPayload = unknown> {
    isOpen: boolean
    type: ModalType
    payload?: TPayload,
    configModal?:ConfigModelType,
}

export interface ModalActions<TPayload = unknown> {
    open: (
        type: ModalState["type"], 
        payload?: TPayload, 
        configModal?:ModalState["configModal"]
        ) => void
    close: () => void
}


export interface ModalContextType {
    state: ModalState
    setState?: Dispatch<SetStateAction<ModalState>>
    actions: ModalActions,
    nextState?:ModalState['type']
}

export const ModalContext = createContext<ModalContextType | null>(null)



export function useModal<TPayload>() {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error("useModal must be used within ModalProvider")
    }

    return { state: {
        ...context.state,
        payload: context.state.payload as TPayload | undefined,
        },
    actions: context.actions,
    nextState: context.state.configModal?.backToModalType
    }
}


export default function ModalProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<ModalState>({
        isOpen: false,
        type: null,
        payload: undefined,
        configModal:DEFAULT_CONFIG_MODAL
    })

    const open = useCallback((type: ModalState["type"], payload?: unknown, configModal?:ConfigModelType) => {
        setState(
            {
                isOpen: true,
                type,
                payload,
                configModal:{...DEFAULT_CONFIG_MODAL, ...configModal},
            }
        )
    },[])

    const close = useCallback(() => {
        setState(
            {
                isOpen: false,
                type: null,
                payload: undefined,
                configModal:DEFAULT_CONFIG_MODAL
            }
        )
    },[]);
    const actions = useMemo(
        () => ({
            open,
            close,
        }),
        [open, close],
    );

    const contextValue = useMemo(
        () => ({
            state,
            setState,
            actions,
        }),
        [state, actions],
    );

    return (
        <ModalContext.Provider
        value={contextValue}
        // value={{
        //     state,
        //     setState,
        //     actions: { open, close },
        // }}
        >
        {children}
        </ModalContext.Provider>
    )
}
export function SampleButtonTriggerModal({data, actions, configModal}:{data:SiswaType, actions:ModalActions<SiswaType>, configModal?:ConfigModelType}) {
    // const { actions } = useModal<SiswaType>()
    return (
        <button onClick={() => actions.open("EDIT", data, configModal)} className="border bg-sky-400 rounded-2xl p-1">
            Edit {data.id}
        </button>
    )
}
