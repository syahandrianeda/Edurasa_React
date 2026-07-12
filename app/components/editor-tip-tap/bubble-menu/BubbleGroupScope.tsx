import {
    createContext,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

export interface BubbleGroupScopeContextValue {

    activeId?: string;

    open: (id: string) => void;

    close: () => void;

}

export const BubbleGroupScopeContext =
    createContext<BubbleGroupScopeContextValue | null>(
        null,
    );

interface BubbleGroupScopeProps {

    children: ReactNode;

}

export function BubbleGroupScope({

    children,

}: BubbleGroupScopeProps) {

    const [

        activeId,

        setActiveId,

    ] = useState<string>();

    const open = useCallback(

        (id: string) => {

            setActiveId(id);

        },

        [],

    );

    const close = useCallback(() => {

        setActiveId(undefined);

    }, []);

    const value = useMemo(() => ({

        activeId,

        open,

        close,

    }), [

        activeId,

        open,

        close,

    ]);

    return (

        <BubbleGroupScopeContext.Provider
            value={value}
        >

            {children}

        </BubbleGroupScopeContext.Provider>

    );

}