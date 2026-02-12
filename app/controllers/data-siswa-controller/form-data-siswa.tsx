import type { ModalState } from "~/components/modals/modal-provider";
import GenerateTabs, { GenerateTabsForModal, type TabsConfigProps } from "~/components/tabs/generate-tabs";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { ConfigFormEdit, ConfigFormEditAbsen } from "./forms/config-form-edit";
import { FormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";
import { SendEdit } from "./forms/send-edit";
import { useSiswaCrud } from "./kesiswaan-controller";

export default function FormDataSiswa({state}:{
    state:ModalState
}){

    return (
        <FormEdura<SiswaType> data={state.payload as SiswaType}>
            <FormEditSiswa/>
            <ModalFooterEdura>
                <SendEdit/>
            </ModalFooterEdura>
        </FormEdura>
    )
}
export function FormDataSiswaKhususAbsen({state}:{
    state:ModalState
}){

    return (
        <FormEdura<SiswaType> data={state.payload as SiswaType}>
            <FormEditSiswa TabsConfig={ConfigFormEditAbsen}/>
            <ModalFooterEdura>
                <SendEdit/>
            </ModalFooterEdura>
        </FormEdura>
    )
}

export function FormEditSiswa({TabsConfig=ConfigFormEdit}:{TabsConfig?:TabsConfigProps}){
    //sampel aja dulu:
    const {defaultValue, tabList, contentList} = TabsConfig;
    const {state} = useSiswaCrud();
    return (
        <fieldset disabled={state.isSubmitting}>
            <GenerateTabsForModal defaultValue={defaultValue??'tab1'} tabList={tabList} contentList={contentList}/>
        </fieldset>
        )
        
}
