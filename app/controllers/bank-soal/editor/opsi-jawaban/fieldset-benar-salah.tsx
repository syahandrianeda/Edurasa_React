import type { CreateItemSoalContextProps } from "../../reducer-item-soal/immer-reducer-context";
import ContentWrapperCreteOpsiJawaban from "./content-wrapper-create-opsi";

export default function FieldsetBenarSalah({data, action}:CreateItemSoalContextProps){
    return (
        <ContentWrapperCreteOpsiJawaban>
            <div>Hello Setting Benar Salah / Setuju Tidak Setuju</div>
        </ContentWrapperCreteOpsiJawaban>
            
    )
}