import type { ReactNode } from "react";
import { FormEdura } from "~/components/form-custom/form-edura";
import { useModal } from "~/components/modals/modal-provider";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { useCrudSerahTerimaProvider } from "../../cruds/crud-provider-serah-terima-dokumen";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type{ UserPtk } from "~/types";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonSendEditSerahTerimaDokumen from "../../cruds/button-send-edit-serah-terima";
import ButtonSendDeleteSerahTerimaDokumen from "../../cruds/button-send-delete-serah-terima";

export default function FormSerahTerimaDokumen({children}:{children:ReactNode}){
    const {state} = useModal<SerahTerimaDokumenAppType>();
    const myId = getSessionApp<UserPtk>()
    const aksesDenied = !state.payload?.akses_user.includes(myId?.id as number);
    const {state:statePost} = useCrudSerahTerimaProvider();
    return (
        <FormEdura data={state.payload as unknown as SerahTerimaDokumenAppType}>
            <fieldset disabled={statePost.isSubmitting || aksesDenied}>
                { aksesDenied && <p className="text-xl font-bold text-center text-rose-400">Anda ditolak mengakses form</p>}

                {children}
                
                {
                    (!aksesDenied && state.type !=='INFO') ? (

                    <ModalFooterEdura>
                        {
                            state.type === 'HAPUS'?<ButtonSendDeleteSerahTerimaDokumen/>:<ButtonSendEditSerahTerimaDokumen/>
                        }
                    </ModalFooterEdura>
                    ): null
                }
            </fieldset>
        </FormEdura>
    )
}