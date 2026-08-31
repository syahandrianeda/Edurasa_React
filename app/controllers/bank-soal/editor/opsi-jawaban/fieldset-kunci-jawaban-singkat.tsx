import { useAppSelector } from "~/context-reduct/hook";
import ContentWrapperCreteOpsiJawaban from "./content-wrapper-create-opsi";
import ContentWrapperOpsi from "./content-wrapper-setting";
import { FieldInputJawabanSingkat } from "../formulir-editor/field-input-jawaban-singkat";

export default function FieldsetKunciJawabanSingkat(){
    const fokusBentukSoal = useAppSelector(s=>s.uiFokusToolbar.data.fokusBentukSoal)
    if(!fokusBentukSoal) return null;
    return (
        <ContentWrapperCreteOpsiJawaban title="Kunci Jawaban">
            <ContentWrapperOpsi bentukSoal={fokusBentukSoal}>-</ContentWrapperOpsi>
            <FieldInputJawabanSingkat/>
        </ContentWrapperCreteOpsiJawaban>
    )
}