import type { ModalState } from "~/components/modals/modal-provider";
import GenerateTabs, { GenerateTabsForModal } from "~/components/tabs/generate-tabs";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { ConfigFormEdit } from "./forms/config-form-edit";
import { FormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";
import { SendEdit } from "./forms/send-edit";

export default function FormDataSiswa({state}:{
    state:ModalState
}){

    return (
        <FormEdura<SiswaType> data={state.payload as SiswaType}>
           <FormEditSiswa/>
            {/* <div className="bg-sky-200 h-[71.5vh]">Konten</div> */}
            
            <ModalFooterEdura>
                <SendEdit/>
            </ModalFooterEdura>
        </FormEdura>
    )
}

export function FormEditSiswa(){
    //sampel aja dulu:
    const {defaultValue, tabList, contentList} = ConfigFormEdit;

    return <GenerateTabsForModal defaultValue={defaultValue??'tab1'} tabList={tabList} contentList={contentList}/>
        
}
