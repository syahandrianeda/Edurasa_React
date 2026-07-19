import { useEffect, useMemo } from "react";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { Field } from "~/components/ui/field";
import { useAppSelector } from "~/context-reduct/hook";
import { GroupNisInduk } from "~/context-reduct/selectores/induk-nis-selector";
import type { GroupIndukType } from "~/domain/buku_induk/entities/GroupIndukType";
import type { PrefixNis } from "~/domain/buku_induk/value-objects/PrefixNis";
import { currentTapel } from "~/lib/current-tapel";

export const ConfigToolbarRekapInduk:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Info'
            },
            ...TabConfigKopTtd.tabList
            
        ],
        contentList:[
            {
                value:'tab1',
                element:<CollectionPrefixInduxToolbar/>
            },
            ...TabConfigKopTtd.contentList
        ]
}

function CollectionPrefixInduxToolbar(){
    const Ins = useAppSelector(GroupNisInduk)
    const {value, setValue, updateExtra} = useFilterContext<{
            fokusGroupNis?: PrefixNis;
            dataGruopNis?:GroupIndukType
        }>();

    const ListBukuInduk = useMemo(()=>Ins.group.map(m=>m.groupNis).sort((a,b)=>b.localeCompare(a)),[
        Ins.group
    ]);
    const handleChecked = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        const data =  Ins.group.find(s=>s.groupNis === value);
        updateExtra(draft => {
            draft.fokusGroupNis = value
            draft.dataGruopNis = data;
        })
    };
    useEffect(()=>{
        if(!value?.extra?.dataGruopNis){
            const short = currentTapel({variant:'short'});
            const data =  Ins.group.find(s=>s.groupNis === short);
            
            updateExtra(draft=>{
                draft.dataGruopNis = data ?? Ins.group[0];
                draft.fokusGroupNis = short
            })
        }
    },[value?.extra?.dataGruopNis, Ins.group])
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700 col-span-2 border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <Field className="relative mt-2">
                    <div className="text-xs absolute bg-white dark:text-gray-100 text-gray-500 dark:bg-sky-900 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1">Pilih Bentuk Soal</div>
                    <ol className="list-none list-inside bg-white p-2 rounded dark:bg-sky-900 grid grid-rows-6 md:grid-cols-8 md:grid-rows-3 grid-flow-col">
                        {
                            ListBukuInduk.map((m,index)=>(
                                    <li key={m+'_'+index} className="col-span-1 py-1 has-checked:underline">
                                        <label htmlFor={'id_'+m} className="flex gap-2 text-xs cursor-pointer has-checked:font-bold has-checked:text-blue-800 dark:has-checked:text-yellow-300">
                                            <input
                                                type="radio"
                                                value={m}
                                                name="bentuksoal"
                                                id={'id_'+m} 
                                                checked={m=== value?.extra?.fokusGroupNis}
                                                onChange={handleChecked}
                                                // onChange={() => updateExtra(draft=>{ draft.fokusGroupNis = m })}
                                            />
                                            {m}
                                        </label>
                                            
                                    </li>
                                )
                            )
                        }
                    </ol>
                </Field>
            </div>
            <div className='inner-shadow-sky-700 text-xs col-span-1 border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <TableWithScrolling className=" bg-white dark:bg-white">
                    <tbody>
                        <TRowEdura>
                            <TdEdura>Kelompok NIS</TdEdura>
                            <TdEdura>{value.extra?.fokusGroupNis}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura>Jumlah Terlacak</TdEdura>
                            <TdEdura>{value.extra?.dataGruopNis?.data.length}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura>Jumlah Seharusnya</TdEdura>
                            <TdEdura>{value.extra?.dataGruopNis?.dataOrderedInduk.length}</TdEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <TdEdura>NIS Invalid</TdEdura>
                            <TdEdura>{value.extra?.dataGruopNis?.summary.countInvalidNis}</TdEdura>
                        </TRowEdura>
                    </tbody>
                </TableWithScrolling>
            </div>
        </div>
    )
}