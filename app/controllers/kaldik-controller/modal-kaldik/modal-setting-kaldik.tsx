import { ModalEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type OrmKaldik from "~/domain/kaldik/orm-kaldik";
import FormSettingKaldik from "./form-setting-kaldik";
import FormPreviewKaldik from "./form-preview-kaldik";

export default function ModalSettingKaldik(){
    const { state, actions } = useModal<OrmKaldik>();

    return (
        <ModalEdura 
            state={state} 
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
            title={()=>state.type === 'INFO' ?'Preview Kalendar Pendidikan': state.type + ' Kalendar Pendidikan'}
        >
            <FormSettingKaldik state={state}/>
        </ModalEdura>
    )
}