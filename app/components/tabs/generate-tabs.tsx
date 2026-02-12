
import { ToolbarContent } from "../toolbars/toolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export interface TabsTabListConfig{
    value: string,
    label: string,
}
export interface TabsContentList{
    value: string,
    element: React.ReactNode
}
export interface TabsConfigProps{
    defaultValue?: string,
    tabList:TabsTabListConfig[],
    contentList: TabsContentList[];
}

export default function GenerateTabs({defaultValue='tab1', tabList, contentList}:TabsConfigProps){
    
    return (
        <Tabs defaultValue={defaultValue} className="gap-0" >
                <TabsList className="min-w-[calc(100vw-2rem)] md:min-w-fit max-w-0 overflow-x-auto scrol-h-custom justify-start">
                    {
                        tabList.map((m, index)=>(
                            <TabsTrigger key={index} value={m.value}>{m.label}</TabsTrigger>
                        ))
                    }
                    
                </TabsList>
                <ToolbarContent className="max-w-[calc(100vw-1rem)] overflow-x-auto">
                    {
                        contentList.map((m,index)=>(
                            <TabsContent key={index} value={m.value} className="flex flex-col">{m.element}</TabsContent>
                        ))
                    }
                </ToolbarContent>
            </Tabs>
    )
}
export function GenerateTabsForModal({defaultValue, tabList, contentList}:TabsConfigProps){
    return (
        <Tabs defaultValue={defaultValue} className="gap-0 " >
            <TabsList className="flex-nowrap  w-[calc(100vw-1.98rem)]   justify-start md:w-fit ps-4 min-[412px]:ps-0 overflow-x-auto scrol-h-custom pb-1 md:pb-0">
                {
                    tabList.map((m, index)=>(
                        <TabsTrigger key={index} value={m.value}>{m.label}</TabsTrigger>
                    ))
                }
            </TabsList>
            <div className="bg-linear-to-br w-[calc(100vw-1.98rem)] md:px-2 from-sky-300 to-sky-200 dark:from-sky-700 dark:to-sky-600 h-[calc(100vh-14.25rem)]  md:w-full  overflow-y-scroll scrol-h-custom">    
                    {
                        contentList.map((m,index)=>(
                            <TabsContent key={index} value={m.value} className="flex flex-col gap-0 text-sm">{m.element}</TabsContent>
                        ))
                    }
                </div>
            </Tabs>
    )
}