import { TdEdura,TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonUdpatePangkatGolongan from "../crud/button-update-golongan-pangkat";
import FormulirEditPangkat from "../fields/formulir-edit-pangkat";
import { FormEdura } from "~/components/form-custom/form-edura";
import { useCrudPangkatGolongan } from "../crud/crud-tendik-provider";

export default function FormInfoRiwayatPangkat({dataAkun}:{dataAkun:IdAkunDanPangkat}){
    const initial = dataAkun.current_golongan_pangkat;
    const {state} = useCrudPangkatGolongan()
    return (
        <FormEdura<PangkatGolonganAppType> data={initial as unknown as PangkatGolonganAppType}>
            <fieldset disabled={state.isSubmitting}>
                <FormulirEditPangkat>
                    <TableWithScrolling className="md:w-8/12 mx-auto">
                        <tbody>
                            <TRowEdura>
                                <TdEdura className="border-e-0 w-5">Nama</TdEdura>
                                <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                                <TdEdura className="border-s-0">{dataAkun.nama_guru}</TdEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <TdEdura className="border-e-0">NIP</TdEdura>
                                <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                                <TdEdura className="border-s-0">{dataAkun.nip}</TdEdura>
                            </TRowEdura><TRowEdura>
                                <TdEdura className="border-e-0">Status PTK</TdEdura>
                                <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                                <TdEdura className="border-s-0 uppercase">{dataAkun.asn || 'Honorer'}</TdEdura>
                            </TRowEdura>
                        </tbody>
                    </TableWithScrolling>
                </FormulirEditPangkat>
            </fieldset>
            <ModalFooterEdura>
                <ButtonUdpatePangkatGolongan/>
            </ModalFooterEdura>
        </FormEdura>
        
    )
}