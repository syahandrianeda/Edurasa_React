import * as React from 'react';
import { GenerateNodeToolbar, type ToolbarConfigProps } from "~/components/toolbars/config-default-toolbar"
import { ConfigToolbarDataSiswa } from "~/controllers/data-siswa-controller/config-toolbar"

export default function ToolbarLayout(
    {
        children, 
        configToolbar = ConfigToolbarDataSiswa
    }:{
        children:React.ReactNode, 
        configToolbar?:ToolbarConfigProps
    }){
    
    const {tabList, contentList } = configToolbar;

    return (
        <div className="relative border-s border-s-gray-400 ps-1 w-full mt-2">
            <GenerateNodeToolbar 
                defaultValue="tab1"
                tabList={tabList}
                contentList={contentList}
            />
            {children}
        </div>
    )
}