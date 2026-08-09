import { ModalEdura, ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import isPrintPreviewModal from "./print-preview-collections";
import SwitchPrintPreviewPage from "./switch-print-preview";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import ButtonPrintModal from "./control-export-print";
import { StepBackIcon } from "lucide-react";


export default function ModalPraCetak<T>(){
    const { state, actions, nextState } = useModal<T>();
    const open = state.isOpen && isPrintPreviewModal(state.type)
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
//   return <div ref={exportRef}
//           className={cn("bg-white text-black p-4 print:pt-16 print:shadow-none",className)}
//           {...props}
//           >{children}</div>
    return (
        <ModalEdura 
            // state={state} 
            state={{
                ...state,
                isOpen: open
            }}
            
            actions={actions} 
            className="w-[calc(100vw-5rem)] print:w-[210mm] lg:min-w-3xl overflow-x-auto pt-0"
            title={()=>state.type || 'Pra Cetak'}
        >   
            <div className="gap-0 h-[calc(100vh-12rem)] pb-2  overflow-y-auto scrol-h-custom font-times-new-roman">
                <div ref={exportRef}
                    className="text-black px-4 py-2 mt-0 [&>div]:bg-white print:bg-white bg-gray-300 print:shadow-none flex flex-col gap-2">
                    <SwitchPrintPreviewPage/>
                </div>
            </div>
            <ModalFooterEdura>
                <div className="flex w-full mt-2 gap-2">
                    <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={()=>nextState ? actions.open(nextState.type, nextState.payload, nextState.configModal):actions.close()} labelButton="Kembali" >
                        <StepBackIcon size={12} className="self-center"/>
                    </ButtonDeleteAwesome>
                    <ButtonPrintModal className="mx-auto px-4 py-0"/>
                </div>
            </ModalFooterEdura>
        </ModalEdura>
    )
}

