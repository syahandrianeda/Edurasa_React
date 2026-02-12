import * as React from 'react';
import type { TabsConfigProps } from '~/components/tabs/generate-tabs';
import { GenerateNodeToolbar } from "~/components/toolbars/config-default-toolbar"
import { ConfigToolbarDataSiswa } from "~/controllers/data-siswa-controller/config-toolbar"

export default function ToolbarLayout(
    {
        children, 
        configToolbar
    }:{
        children:React.ReactNode, 
        configToolbar?:TabsConfigProps
    }){
        
    return (
        <div
            data-slot="toolbar-layout"
            className="border-s border-black flex flex-1 flex-col ps-0 pe-4"
        >
            {
            configToolbar && (
                    <GenerateNodeToolbar 
                        defaultValue="tab1"
                        tabList={configToolbar?.tabList}
                        contentList={configToolbar?.contentList}
                    />
                )
            }
            {children}
        </div>
    )
}