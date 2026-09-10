import { useReactToPrint } from 'react-to-print';
import * as React from 'react';
import { useExportTarget } from '~/layouts/exports/export-target-provider';
import { cn } from '~/lib/utils';
import { Printer } from 'lucide-react';


export default function ButtonPrintModal({className="py-0", type ='portrait'}:{className?:string, type?: 'portrait' | 'landscape'}){
    const printRef = React.useRef<HTMLElement | null>(null);
    const { getTarget } = useExportTarget();
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
        const target = getTarget('print-area-modal');
        if (!target) return;

        printRef.current = target;

        if (type === 'portrait') {
            handlePrintPortrait?.();
        } else {
            handlePrintLandscape?.();
        }
    }
    return (
        <button 
                type="button" 
                className={cn("flex h-fit w-fit items-center justify-start gap-2 px-4 rounded-full bg-sky-700 py-[1em] text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]",className)} 
                    onClick={()=>onHandlePrint(type)}>
                <Printer size={15} className="font-extrabold"/>
                <p className="[text-shadow:0px_1px_1px_0px_#950000]">Print</p>
                </button>
    )
}