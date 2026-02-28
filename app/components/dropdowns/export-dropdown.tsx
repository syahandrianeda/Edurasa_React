import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { FileStack } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { useAdvancedWordExport } from '~/export/use-export-edurasa';
import { useWordExport } from '~/export/docx/application/use-export-docx';
import { useAppDispatch } from '~/context-reduct/hook';
import { setloadedApi } from '~/context-reduct/global-state/loaded-slice';
import UseDocxEdura from '~/export/word-edura/applications/use-docx-edura';


export default function ExportDropdown({title}:{title:string}) {
    const printRef = React.useRef<HTMLElement | null>(null);
    // const dispatch = useAppDispatch();
    const { getTarget } = useExportTarget();
    const [printMode, setPrintMode]=React.useState(false);
    // const { exportWord, isExporting } = useWordExport({
    //         fileName: title+".docx",
    //         beforeExport: async () => {
    //             setPrintMode(true)
    //         },
    //         afterExport: () => {
    //             setPrintMode(false)
    //         },
    //         type:'portrait'
    // });
    const {executeWord, setOrientation} = UseDocxEdura({
            fileName: title+".docx"
    });
    const { exportWord:landscapeWord, isExporting:isLanscapingProccess } = useWordExport({
            fileName: title+".docx",
            beforeExport: async () => {
                setPrintMode(true)
            },
            afterExport: () => {
                setPrintMode(false)
            },
            type:'landscape'
    });
    /* ===============================
    * PRINT HANDLER — PORTRAIT
    * =============================== */
    const handlePrintPortrait = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Dokumen Portrait',
    pageStyle: '@page { size: portrait; margin: 16px; }',
    });

    /* ===============================
    * PRINT HANDLER — LANDSCAPE
    * =============================== */
    const handlePrintLandscape = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Dokumen Landscape',
    pageStyle: '@page { size: landscape; margin: 16px; }',
    });

    function onHandlePrint(type: 'portrait' | 'landscape') {
        const target = getTarget('print-area');
        if (!target) return;

        printRef.current = target;

        if (type === 'portrait') {
            handlePrintPortrait?.();
        } else {
            handlePrintLandscape?.();
        }
    }
    
    function onHandleWord(type: 'portrait' | 'landscape') {
        const target = getTarget('print-area');
        if (!target) return;

        printRef.current = target;

       
        if(printRef){
            if(type === 'portrait'){
                // exportWord(printRef.current);
            }else{
                // landscapeWord(printRef.current);
            }
            setOrientation(type);
            executeWord(printRef.current,type);
            // dispatch(setloadedApi({
            //     loaded:isExporting
            // }))
        }
    }
    
    function exportToExcel() {
        const target = getTarget('print-area');
        if (!target) return;
        printRef.current = target;
        import("~/export/excel/export-excel").then((exportToExcel) => {
            if(!printRef) return;
                exportToExcel.default(printRef,title);
            
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group relative cursor-pointer h-8 w-8 right-1 mx-auto hover:w-32.5! transition-all duration-[0.75s] outline-hidden border-none rounded-full flex flex-row items-center justify-center shadow-sm shadow-sky-600 dark:shadow-sky-300 data-[state=open]:w-32.5!"> 
                <FileStack className="border overflow-visible size-9 absolute right-0 translate-x-1 rounded-xl cursor-pointer bg-radial from-sky-400 to-sky-100 dark:bg-radial dark:from-sky-800 dark:to-sky-600 dark:bg-linear-to-b shadow-sm dark:shadow-xs hover:bg-zinc-600 hover:text-blue-600 dark:hover:text-blue-100 transition-colors duration-300 p-2 shadow-[#1253b4] dark:shadow-sky-500"/>
                <DropdownMenuLabel className="p-0 text-small absolute truncate left-2  text-[12px] font-semibold [--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden flex items-center justify-end -z-1 group-hover:z-9 pointer-events-none select-none opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 group-hover:text-inherit transition-all duration-1000 group-hover:duration-100 group-active:scale-[0.85]"  >
                    Export/Cetak
                </DropdownMenuLabel>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
                side='top'
                className="bg-white dark:bg-sky-900 outline-1 outline-amber-200 rounded-xl cursor-pointer bg-linear-to-br from-sky-200 to-[#F7EEDD] dark:bg-linear-to-b dark:from-sky-800 shadow-sm dark:to-sky-700 hover:bg-zinc-600 hover:text-blue-600  dark:hover:text-blue-200 transition-colors duration-300 p-2 shadow-[#41C9E2]"
            >
                <DropdownMenuLabel className="p-0 text-small">
                    Export/Cetak
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Printer</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="me-3 bg-linear-to-br from-sky-200 to-[#F7EEDD] dark:bg-linear-to-b dark:from-sky-800 shadow-sm dark:to-sky-700 hover:bg-zinc-600 hover:text-blue-600  dark:hover:text-blue-200 transition-colors duration-300 p-2 shadow-[#41C9E2]">
                                <DropdownMenuItem onClick={()=>onHandlePrint('portrait')}>
                                    Portrait
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={()=>onHandlePrint('landscape')}>
                                    Landscape
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Ms Word</DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="me-3 bg-linear-to-br from-sky-200 to-[#F7EEDD] dark:bg-linear-to-b dark:from-sky-800 shadow-sm dark:to-sky-700 hover:bg-zinc-600 hover:text-blue-600  dark:hover:text-blue-200 transition-colors duration-300 p-2 shadow-[#41C9E2]">
                                <DropdownMenuItem onClick={() => onHandleWord('portrait')}>Portrait</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onHandleWord('landscape')}>Landscape</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem onClick={exportToExcel}>
                            Ms.Excel
                        </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}