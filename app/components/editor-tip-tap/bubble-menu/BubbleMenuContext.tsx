import {
    createContext,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type {
    BubbleGroupContextValue,
    BubbleMenuContextValue,
} from "./types";

export const BubbleMenuContext =
    createContext<BubbleMenuContextValue | null>(null);

export const BubbleGroupContext =
    createContext<BubbleGroupContextValue | null>(null);

interface BubbleMenuProviderProps {

    children: ReactNode;

}

export function BubbleMenuProvider({

    children,

}: BubbleMenuProviderProps) {

    /**
     * Akan bertambah setiap closeAll() dipanggil.
     * BubbleGroupButton cukup mengamati perubahan nilainya.
     */
    const [closeVersion, setCloseVersion] =
        useState(0);

    const closeAll = useCallback(() => {

        setCloseVersion(version => version + 1);

    }, []);

    const value = useMemo<BubbleMenuContextValue>(() => {

        return {

            closeVersion,

            closeAll,

        };

    }, [
        closeVersion,
        closeAll,
    ]);

    return (

        <BubbleMenuContext.Provider
            value={value}
        >

            {children}

        </BubbleMenuContext.Provider>

    );

}