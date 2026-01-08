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
        <Toolbar open={isOpen} setOpen={setIsOpen}>
            {/* <Tabs defaultValue={defaultValue} className="gap-0" >
                <TabsList>
                    {
                        tabList.map((m, index)=>(
                            <TabsTrigger key={index} value={m.value}>{m.label}</TabsTrigger>
                        ))
                    }
                    
                </TabsList>
                <ToolbarContent>
                    {
                        contentList.map((m,index)=>(
                            <TabsContent key={index} value={m.value} className="min-h-34">{m.element}</TabsContent>
                        ))
                    }
                </ToolbarContent>
            </Tabs> */}
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