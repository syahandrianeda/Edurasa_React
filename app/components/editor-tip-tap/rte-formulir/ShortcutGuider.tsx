import { FileQuestion } from "lucide-react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";

export default function ShortcutGuider(){
    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" tabIndex={-1} title="?" className="p-0 leading-0 gap-0 flex flex-col has-[>svg]:p-0 h-4 min-w-4 bg-transparent">
                <FileQuestion className="size-3"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full" align="start">
            <PopoverHeader>
                <PopoverTitle>Daftar Shortcut</PopoverTitle>
            </PopoverHeader>
            <Separator/>
            <TableWithScrolling className="text-xs">
                <thead>
                    <TRowEdura>
                        <ThEdura className="w-5">Fungsi</ThEdura>
                        <ThEdura>Tombol Keyboard</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    <TRowEdura>
                        <TdEdura>Bold</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">B</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Italic</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">I</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Underline</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">U</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Align Left</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">SHIFT</span>+
                            <span className="border border-black rounded-md px-1">L</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Align Center</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">SHIFT</span>+
                            <span className="border border-black rounded-md px-1">E</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Align Right</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">SHIFT</span>+
                            <span className="border border-black rounded-md px-1">R</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Align Justify</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">SHIFT</span>+
                            <span className="border border-black rounded-md px-1">J</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Bulllet Numbering</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">SHIFT</span>+
                            <span className="border border-black rounded-md px-1">8</span>
                        </TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura>Ordered Numbering</TdEdura>
                        <TdEdura>
                            <span className="border border-black rounded-md px-1">CTRL/CMD</span>+
                            <span className="border border-black rounded-md px-1">SHIFT</span>+
                            <span className="border border-black rounded-md px-1">7</span>
                        </TdEdura>
                    </TRowEdura>
                </tbody>
                
            </TableWithScrolling>
        </PopoverContent>
        </Popover>
    )
}