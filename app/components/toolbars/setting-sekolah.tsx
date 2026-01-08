import * as React from "react";
import Toolbar, { ToolbarContent } from "./toolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function ToolbarSettingSekolah() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
    <>
        <Toolbar open={isOpen} setOpen={setIsOpen}>
            <Tabs defaultValue="tab1" className="gap-0" >
                <TabsList>
                    <TabsTrigger value='tab1'>Tab1</TabsTrigger>
                    <TabsTrigger value='tab2'>Tab2</TabsTrigger>
                </TabsList>
                <ToolbarContent>
                    <TabsContent value='tab1' className="min-h-34">
                        Isi Konten Tab 1
                        <p className="h-18">paragraf 1</p>
                        <p className="h-18">paragraf 2</p>
                        <p className="h-18">paragraf 3</p>
                    </TabsContent>
                    <TabsContent value='tab2' className="min-h-34">
                        Isi Konten Tab 2
                    </TabsContent>
                </ToolbarContent>
            </Tabs>

            </Toolbar>
    </>
    );
}