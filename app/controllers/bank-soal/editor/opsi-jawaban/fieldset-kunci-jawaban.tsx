import { useAppSelector } from "~/context-reduct/hook";
import { FieldInputJawabanIsian } from "../formulir-editor/field-input-jawaban-isian";
import ContentWrapperCreteOpsiJawaban from "./content-wrapper-create-opsi";
import ContentWrapperOpsi from "./content-wrapper-setting";

export default function FieldsetKunciJawaban(){
    const fokusBentukSoal = useAppSelector(s=>s.uiFokusToolbar.data.fokusBentukSoal)
    if(!fokusBentukSoal) return null;
    return (
        <ContentWrapperCreteOpsiJawaban title="Kunci Jawaban">
            <ContentWrapperOpsi bentukSoal={fokusBentukSoal}>-</ContentWrapperOpsi>
            <FieldInputJawabanIsian/>
        </ContentWrapperCreteOpsiJawaban>
    )
}