import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react"
import {useImmer} from 'use-immer'

export interface FormEduraContext{
    currentData: unknown;
    setCurrentData: (updater: (draft: unknown) => void) => void;
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
    };;
}

export function FormEdura<T>({children, data}:{children:ReactNode, data:T}){
    
    const [currentData, setCurrentData] = useImmer<T>(data);

    /* sync jika data awal berubah (edit / reset form) */
    useEffect(() => {
        setCurrentData(() => data);
    }, [data, setCurrentData]);

    const value = useMemo(
        () => ({
            currentData,
            setCurrentData,
        }),
        [currentData, setCurrentData]
    );
    console.log('currentData', currentData)
    return (
        <EduraContext value={value}>
            <form method='post'>
                {children}
            </form>
        </EduraContext>
    )
}