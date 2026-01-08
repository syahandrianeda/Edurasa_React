import { createContext, useContext, useMemo, type ReactNode } from "react"
import type { ApiResponse } from "~/configs/appscript-config"
import type { SiswaType } from "~/types/siswa"


export type ID =  number

export interface IndexParams {
    page?: number
    perPage?: number
    filters?: Record<string, any>
    sort?: {
        field: string
        direction: 'asc' | 'desc'
    }
}
export interface CrudActions<T> {
    uploadFile(param:File,options?:Record<string,any>): Promise<any>
}

export interface CrudProviderProps<T> {
    actions: CrudActions<T>
    children: ReactNode
}

export function createCrudProvider<
    T,
    S extends { 
        uploadFile?: (param:File,options?:Record<string,any>) => Promise<void>
    }
>() {
    const CrudContext = createContext<CrudActions<T> | null>(null)

    function CrudProvider({
        service,
        children,
    }: {
        service: S
        children: ReactNode
    }) {
        const actions: CrudActions<T> = useMemo(() => ({
            
            uploadFile: service.uploadFile
                ? (param:File,options?:Record<string,any>) => service.uploadFile!(param, options)
                : async () => {},
        }), [service])

        return (
            <CrudContext.Provider value={actions}>
                {children}
            </CrudContext.Provider>
        )
    }

    function useCrud() {
        const context = useContext(CrudContext)
        if (!context) {
            throw new Error("useCrud must be used within CrudProvider")
        }
        return context
    }

    return {
        CrudProvider,
        useCrud,
    }
}
