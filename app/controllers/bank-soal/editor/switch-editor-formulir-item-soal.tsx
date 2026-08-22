import { useAppSelector } from "~/context-reduct/hook"
import FormulirModeCreateItemSoal from "./FormulirModeCreateItemSoal";


export default function SwitchEditorCreateItemSoal(){
    const {fokusEditor} = useAppSelector(s=>s.uiFokusToolbar.data);
    return (
        <div>
            <p className="text-center mb-7">{fokusEditor?.description}</p>
            {
                fokusEditor?.name === 'formulir' 
                ? <FormulirModeCreateItemSoal/>
                : <p>Copast</p>
            }
        </div>
    )
}