import type { CreateItemSoalContextProps } from "../../reducer-item-soal/immer-reducer-context";
import ContentWrapperCreteOpsiJawaban from "./content-wrapper-create-opsi";

export default function FieldsetMenjodohkan({data, action}:CreateItemSoalContextProps){
    return (
        <ContentWrapperCreteOpsiJawaban>
            <div>Hello Setting Menjodohkan</div>
        </ContentWrapperCreteOpsiJawaban>
            
    )
}