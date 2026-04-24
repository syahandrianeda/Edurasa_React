import { createContext, useContext, useState, type ReactNode } from "react"
import type { SiswaType } from "~/types/siswa"

export type ModalType =
    | 'INFO'
    | 'TAMBAH'//-->'CREATE'
    | 'EDIT'
    | 'EDIT-CUSTOM'
    | 'HAPUS'//'DELETE'
    | 'EDIT SISWA'
    | 'EDIT PROFIL'
    | 'TAMBAH ABSEN'
    | 'EDIT ABSEN'
    | 'HAPUS ABSEN'
    | 'TAMBAH TP'
    | 'EDIT TP'
    | 'HAPUS TP'
    | 'TAMBAH ATP'
    | 'EDIT ATP'
    | 'HAPUS ATP'
    | 'TAMBAH MAPEL ROMBEL'
    | 'EDIT MAPEL ROMBEL'
    | 'HAPUS MAPEL ROMBEL'
    | 'TAMBAH JADWAL MAPEL'
    | 'EDIT JADWAL MAPEL'
    | 'HAPUS JADWAL MAPEL'
    | null
export interface ConfigModelType{
    closeOnOutsideClick: boolean,
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
    actions: ModalActions
}

export const ModalContext = createContext<ModalContextType | null>(null)



export function useModal<TPayload>() {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error("useModal must be used within ModalProvider")
    }

    return {
    state: {
        ...context.state,
        payload: context.state.payload as TPayload | undefined,
        },
    actions: context.actions,
    }
}


export default function ModalProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<ModalState>({
        isOpen: false,
        type: null,
        payload: undefined,
        configModal:DEFAULT_CONFIG_MODAL
    })

    const open = (type: ModalState["type"], payload?: unknown, configModal?:ConfigModelType) => {
        setState(
            {
                isOpen: true,
                type,
                payload,
                configModal:{...DEFAULT_CONFIG_MODAL, ...configModal},
            }
        )
    }

    const close = () => {
        setState(
            {
                isOpen: false,
                type: null,
                payload: undefined,
                configModal:DEFAULT_CONFIG_MODAL
            }
        )
    }

    return (
        <ModalContext.Provider
        value={{
            state,
            actions: { open, close },
        }}
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
