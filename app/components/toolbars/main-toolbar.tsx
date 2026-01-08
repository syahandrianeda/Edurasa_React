import { Boxes } from "lucide-react";
import * as React from "react";
import { cn } from "~/lib/utils";
import { Tooltip } from "../ui/tooltip";
import CompTooltip from "../ui_edura/comp-tooltip";

export default function MainToolbar({children, className}: {children: React.ReactNode, className?: string }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div
            data-slot="toolbar"
            data-state={isOpen ? "open" : "closed"}
            className={cn("group sticky -top-28 min-h-40 w-full mt-2 shadow-md ps-0 pt-0 mb-6 data-[state=open]:translate-y-0 data-[state=closed]:translate-y-1",
                className
            )}
            >
                <CompTooltip asChild tooltip={{
                    children: 'Toolbar'
                }} className="bg-linear-to-r from-sky-300 to-sky-100 rounded-se-xl w-12 h-6 ps-0 ms-0 py-1">
                    <Boxes size={24} className="bg-transparent text-sky-800 dark:text-sky-500"/>

                </CompTooltip>
                <div className="w-full h-34 group-data-[state=open]:h-full group-data-[state=closed]:h-34  transition-transform duration-1000 ease-in overflow-y-scroll scrol-h-custom bg-linear-to-tr from-sky-200 to-sky-100 dark:border-2  dark:border-sky-700 dark:from-sky-800 dark:to-sky-700 inner-shadow-sky-100 px-4 shadow-lg dark:rounded-md">
                    {children}
                </div>
                <CompTooltip asChild tooltip={{
                    children: 'Toolbar sebagai alat kontrol fitur'
                }} sideTooltip="bottom">
                    <button className="absolute bottom-0 left-1/2 translate-y-4 mx-auto text-xs bg-linear-to-br from-sky-300 to-sky-100 px-4 py-0 rounded-b-3xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >{isOpen ? "Hide" : "Show"} Toolbar</button>

                </CompTooltip>
        </div>
    );
}