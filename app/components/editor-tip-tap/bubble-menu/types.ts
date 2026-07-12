import type { ReactNode } from "react";

export interface BubbleMenuContextValue {

    /**
     * Akan berubah setiap kali closeAll() dipanggil.
     * BubbleGroupButton cukup mengamati perubahan nilai ini.
     */
    closeVersion: number;

    closeAll: () => void;

}

export interface BubbleGroupContextValue {

    id: string;

    open: boolean;

    openMenu: () => void;

    closeMenu: () => void;

    toggleMenu: () => void;

}

export interface BubbleGroupButtonProps {

    id: string;

    icon: ReactNode;

    children?: ReactNode;

    className?: string;

}