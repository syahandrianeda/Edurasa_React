import type { ReactNode } from "react";

export interface WorkspaceLayoutProps{

    header?:ReactNode;

    footer?:ReactNode;

    children:ReactNode;

    className?:string;

}