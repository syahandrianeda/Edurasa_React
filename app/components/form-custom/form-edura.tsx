import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from "react"
import {useImmer} from 'use-immer'

export interface FormEduraContext{
    currentData: unknown;
    setCurrentData: (updater: (draft: unknown) => void) => void;
    reset: () => void
}

export const EduraContext = createContext<FormEduraContext | null>(null);

export function useFormEdura<T>(){
    const context = useContext(EduraContext);
    if(!context){
        throw new Error('Should be wrapped in CreateFromEduraContext');

    }
    return  context as {
        currentData: T;
        setCurrentData: (updater: (draft: T) => void) => void;
        reset: () => void
    };;
}

export function FormEdura<T>({children, data}:{children:ReactNode, data:T}){
    const initialRef = useRef<T>(data)
    const [currentData, setCurrentData] = useImmer<T>(data)

    const reset = () => {
        setCurrentData(() => initialRef.current)
    }

    const value = useMemo(
        () => ({ currentData, setCurrentData, reset }),
        [currentData]
    )

    /** versi tanpa reset */
    // const isInit = useRef(false)

    // useEffect(() => {
    //     if (isInit.current) return
    //         setCurrentData(() => data)
    //         isInit.current = true
    // }, [data, setCurrentData])

    // const value = useMemo(
    //     () => ({ currentData, setCurrentData }),
    //     [currentData]
    // )

   
    
    return (
        <EduraContext value={value}>
            <form method='post' className="overflow-x-auto">
                {children}
            </form>
        </EduraContext>
    )
}

 /* sync jika data awal berubah (edit / reset form)  dan ini hanya berlaku untuk MODAL*/
    // useEffect(() => {
    //     setCurrentData(() => data);
    // }, [data, setCurrentData]);

    // const value = useMemo(
    //     () => ({
    //         currentData,
    //         setCurrentData,
    //     }),
    //     [currentData, setCurrentData]
    // );