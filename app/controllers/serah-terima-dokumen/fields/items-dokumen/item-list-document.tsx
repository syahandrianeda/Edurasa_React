import type { dokumenSerahTerimaType } from "./dokumen-serah-terima-type"
import ItemFormDocument from "./item-form-documents"

export default function ItemListDokumen({
    dokuments, 
    onChange, 
    onDelete,
    onUp,
    onDown
}:{
    dokuments:dokumenSerahTerimaType[],
    onChange: (v:dokumenSerahTerimaType)=>void,
    onDelete: (v:dokumenSerahTerimaType)=>void,
    onUp:(i:number)=>void,
    onDown:(i:number)=>void,
}){
    /**
     * const moveUp = useCallback((index: number) => {
            if (index <= 0) return;
            setDataEditable(draft => {
                const tmp = draft[index - 1];
                draft[index - 1] = draft[index];
                draft[index] = tmp;
                // update index_prota after reorder
                for (let i = 0; i < draft.length; i++) draft[i].index_prota = i + 1;
            });
        }, [setDataEditable]);
     */
    return(
        <div className="relative mt-7 w-full border bg-sky-50 mx-auto">
            <div className="absolute -top-4 text-xs bg-sky-50 ps-1 pe-4 rounded-tr-2xl left-0">Daftar Dokumen yang diserah/terimakan</div>
            <ul className="list-none list-inside ps-6 ms-2 mt-4 p-1">
                {
                    dokuments.map((m,i)=>
                        <li className="flex items-center gap-x-2 border space-y-1 flex-row w-full" key={i}>
                            <ItemFormDocument dokumen={m} onEdit={onChange} onDelete={onDelete}/>
                            <div className="flex flex-col justify-center items-center align-middle border leading-2">
                                {
                                    i !== 0 ? (<button onClick={()=>onUp(i)} className="px-2 cursor-pointer py-0 text-[12px] align-middle rounded bg-transparent hover:bg-gray-200 disabled:opacity-50"
                                        title="Move up">▲</button>):'-'
                                }

                                {
                                    i !== dokuments.length - 1 ? (
                                        <button onClick={()=>onDown(i)}  className="px-2 cursor-pointer py-0 h-4 text-[12px] align-middle rounded bg-transparent hover:bg-gray-200 disabled:opacity-50"
                                            title="Move dwon">▼</button>
                                    ):'-'
                                }
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}