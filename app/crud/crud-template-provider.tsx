import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { ApiResponse } from "~/configs/appscript-config"
import type { ParamUpdateRecord } from "~/configs/appscript-sheet"



export type ID =  number
interface CrudState {
    isSubmitting: boolean
}
interface CrudContextValue<T> {
    state: CrudState
    actions: CrudActions<T>
}

export interface CrudActions<T> {
    uploadFile(param:File,options?:Record<string,any>): Promise<any>,
    findById(param:Record<string, any>): Promise<ApiResponse<T>>,
    update(param:Record<string,any>): Promise<ApiResponse<T>>,
    create(param:Record<string,any>): Promise<ApiResponse<T>>,
}

export interface CrudProviderProps<T> {
    actions: CrudActions<T>
    children: ReactNode
}

export function createCrudProvider<
    T,
    S extends { 
        uploadFile?: (param:File,options?:Record<string,any>) => Promise<void>,
        findById?:(param:Record<string, any>)=> Promise<ApiResponse<T>>
        update?:(param:ParamUpdateRecord<T>)=> Promise<ApiResponse<T>>,
        create?:(param:ParamUpdateRecord<T>)=> Promise<ApiResponse<T>>
    }
>() {
    
    const CrudContext = createContext<CrudContextValue<T> | null>(null)

    function CrudProvider({
        service,
        children,
    }: {
        service: S
        children: ReactNode
    }) {
            const [isSubmitting, setIsSubmitting] = useState(false)
            
            const actions: CrudActions<T> = useMemo(() => ({
                uploadFile: async (param:File, options?:Record<string, any>) => {
                    if (!service.uploadFile) return
                        setIsSubmitting(true)
                    try {
                        return await service.uploadFile(param, options)
                    } finally {
                        setIsSubmitting(false)
                    }
                },

                update: async (param: ParamUpdateRecord<T>) => {
                    if (!service.update) {
                        throw new Error("update not implemented")
                    }
                    setIsSubmitting(true)
                    try {
                        return await service.update(param)
                    } finally {
                        setIsSubmitting(false)
                    }
                },
                
                create: async (param: ParamUpdateRecord<T>) => {
                    if (!service.create) {
                        throw new Error("update not implemented")
                    }
                    setIsSubmitting(true)
                    try {
                        return await service.create(param)
                    } finally {
                        setIsSubmitting(false)
                    }
                },

                findById: async (param:Record<string, any>) =>{
                    if (!service.findById) {
                        throw new Error("update not implemented")
                    }
                    setIsSubmitting(true)
                    try {
                        return await service.findById(param)
                    } finally {
                        setIsSubmitting(false)
                    }
                }
            }), [service])

        return (
            <CrudContext.Provider value={{
                state: { isSubmitting },
                actions,
                }}>
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
