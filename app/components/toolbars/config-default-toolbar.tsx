import * as React from "react";
import Toolbar from "./toolbar";
import { KopCollectionTrigger, TtdCollectionTrigger } from "./kop-ttd/kop-ttd";
import GenerateTabs, { type TabsConfigProps } from "../tabs/generate-tabs";

/**
 * 
 * @info ini komponen untuk membuat tabs di toolbar
 * @param param0 
 * @returns 
 */
export function GenerateNodeToolbar({defaultValue, tabList, contentList}:TabsConfigProps){
    const [isOpen, setIsOpen] = React.useState(false);
    return(
        <Toolbar open={isOpen} setOpen={setIsOpen} className="mx-1">
            <GenerateTabs defaultValue={defaultValue} tabList={tabList} contentList={contentList}/>
        </Toolbar>
    )
}


export const TabConfigKopTtd:TabsConfigProps = {
    tabList:[
        {
            value: 'tabTtd',
            label: 'TTD'
        },
        {
            value: 'tabKop',
            label: 'KOP'
        },
    ],
    contentList:[
        {
            value: 'tabTtd',
            element: <TtdCollectionTrigger/>
        },
        {
            value: 'tabKop',
            element: <KopCollectionTrigger/>
        },
    ]
}