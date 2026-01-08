import type { ReactNode } from "react";

export interface kopKontentType{
    type:string,
    label: string,
    description:ReactNode,
    dataColumn?: kopColumn[];
}
export interface kopColumn{
    isLogo: boolean
    srcLogo?: string,
    content?:ReactNode;
}