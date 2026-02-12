import { type ReactNode } from "react";
import { ToolbarKopTtdProvider } from "~/components/toolbars/kop-ttd/kop-ttd";
import { ToolbarFilterProvider } from "~/components/toolbars/state-toolbar/state-toolbar";
import ToolbarLayout from "./toolbar-layout";
import type { ttdKontenType } from "~/components/toolbars/kop-ttd/config-ttd";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";

export default function SubToolbarLayout({
    filteringConfig,
    toolbarTabs,
    children, 
}:{
    filteringConfig: ttdKontenType[],
    children:ReactNode
    toolbarTabs?: TabsConfigProps
}){
    
    return (
        <ToolbarFilterProvider>
            <ToolbarKopTtdProvider configTtd={filteringConfig}>
                <ToolbarLayout configToolbar={toolbarTabs}>
                    {children}
                </ToolbarLayout>
            </ToolbarKopTtdProvider>
        </ToolbarFilterProvider>
    )
}