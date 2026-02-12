import type { SiswaType } from "~/types/siswa";
import type{  OptionDesignTableToolbar } from "./interface-design-table";
import { RadioTextAlign, TEXT_ALIGN } from "~/components/fields/text-align-control";
import { Columns, Columns3Cog,  Plus, PlusIcon, SortDesc, Trash, X } from "lucide-react";
import type { KeyModelTable, ThType } from "~/components/tabels/table-interface";
import { useCallback,  useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { SortirColumnControl } from "~/components/fields/sortir-column-control";
import { replaceClassInGroup } from "~/components/fields/select-font";
import { PreviewColumn } from "~/components/resizable/resizable";
import { useFilterContext,  type FilterContextValue } from "./state-toolbar";
import { OptionsDesignTableDefaultProps } from "./data-opsi-header-custom";
import { defaultCellRenderer } from "~/components/tabels/default-cell-rendered";
import { DropdownButtonsModal } from "~/components/dropdowns/dropdown-action-table";
import {  DropdownMenuContent } from "~/components/ui/dropdown-menu";

export function ControlToolbarDesignTabel({
    options=OptionsDesignTableDefaultProps
}:{
    options?:OptionDesignTableToolbar<SiswaType>[]
}){
    const   {
                value, 
                updateHeaderOptions: setSelectedOptions,
                updateHeaderDesign: setValueHeader, 
                updateKeyDataColum,
                setValue,
            } = useFilterContext<SiswaType>();
    const valueHeader = value?.desainFormatheader ?? [];
    const selectedOptions = value?.draftOptionHeaderTable ?? options;
    const designKeyDataColumn = value?.designKeyDataColumn??[];

    const onCheckedHeader = useCallback(( 
        dataOpsion:OptionDesignTableToolbar<SiswaType>, 
        isChecked:boolean)=>{
            
        setValueHeader((draft)=>{
            const index = draft.findIndex( (s) => s.labelDefault === dataOpsion.labelDefault );

            const newDraft:ThType<SiswaType>  = { 
                label: dataOpsion.labelDefault,
                labelDefault: dataOpsion.labelDefault,
                className: dataOpsion?.classNamesHeader?.join(' '),
            }
            if(isChecked){
                if (index !== -1) {
                    draft[index] = { ...draft[index], label:dataOpsion.labelDefault}
                } else {
                // INSERT
                    draft.push(newDraft)
                }
            }else{
                draft.splice(index, 1) 
            }
        })
        setSelectedOptions((draft)=>{
            const index = draft.findIndex( (s) => s.labelDefault === dataOpsion.labelDefault );
            draft.splice(index, 1) 
        });
        updateKeyDataColum((draft)=>{
            const index = draft.findIndex( (s) => s.id === dataOpsion.labelDefault );
            const findOption = options.find(s=>s.labelDefault === dataOpsion.labelDefault);
            const key = findOption?.key;

            const updateDraft:KeyModelTable<SiswaType>  = { 
                type: dataOpsion.type,
                render: dataOpsion.resolverNode 
                    ? dataOpsion.resolverNode 
                    : defaultCellRenderer<SiswaType>(key as keyof SiswaType)
            }
            const newDraft:KeyModelTable<SiswaType>  = {
                id: dataOpsion.labelDefault, 
                type: dataOpsion.type,
                render: dataOpsion.resolverNode ,
                className: dataOpsion?.classNamesColumn?.join(' '),
            }

            if(isChecked){
                if (index !== -1) {
                    draft[index] = { ...draft[index], ...updateDraft}
                } else {
                    draft.push(newDraft)
                }
            }else{
                    draft.splice(index, 1) 
            }
        })
    },[]);

    const resetHeader = ()=>{
        setValueHeader(draft => {
            draft.length = 0;
        });

        setSelectedOptions(draft => {
            draft.length = 0;
            draft.push(...options);
        });

        updateKeyDataColum(draft => {
            draft.length = 0;
        });
    };

    const deleteItemHeader = useCallback((v:ThType<SiswaType>)=>{
        setValueHeader(draft=>{
            const index = draft.findIndex( (s) => s.labelDefault === v.labelDefault );
            draft.splice(index, 1)
        })
        setSelectedOptions((draft)=>{
            const findDefault = options.findIndex(s=>s.labelDefault === v.labelDefault);
            draft[findDefault] = options[findDefault];
        })
        updateKeyDataColum((draft)=>{
            const index = draft.findIndex( (s) => s.id === v.labelDefault );
            draft.splice(index, 1)
        })

    },[]);
    
    const onChangeText = useCallback( (v:string, dataTh:ThType<SiswaType> )=>{
        setValueHeader((draft)=>{
            const index = draft.findIndex(s=>s.labelDefault === dataTh.labelDefault);
            draft[index] = { ...draft[index], label:v}
        })
    },[]);

    const onChangeTextAlign = useCallback( (v:string, dataTH:ThType<SiswaType>)=>{
        const arrayClassNames = dataTH.className?.split(" ")??[];

        const classNamesToJoin = replaceClassInGroup(arrayClassNames, TEXT_ALIGN, v);

        setValueHeader(draft=>{
            const index = draft.findIndex(s=> s.labelDefault === dataTH.labelDefault);
            if(index>-1){
                draft[index] = {...draft[index], className:classNamesToJoin.join(' ')}
            }
        })
    },[]);

    const onChangeTextAlignColumn = useCallback( (v:string, dataTH:ThType<SiswaType>)=>{
        const findOptions = options.find(s=>s.labelDefault === dataTH.labelDefault);
        const arrayClassNames = findOptions?.classNamesColumn ?? []

        const classNamesToJoin = replaceClassInGroup(arrayClassNames, TEXT_ALIGN, v);

        updateKeyDataColum(draft=>{
            const index = draft.findIndex(s=> s.id === dataTH.labelDefault);
            if(index>-1){
                draft[index] = {...draft[index], className:classNamesToJoin.join(' ')}
            }
        })
    },[]);

    const onCreateSortirControl = useCallback((isChecked:boolean, dataTh: ThType<SiswaType>)=>{
        setValueHeader((draft)=>{
            const index = draft.findIndex(s=>s.labelDefault === dataTh.labelDefault);
            const findOption = options.find(s=>s.labelDefault === dataTh.labelDefault);
            const key = findOption?.key;
            const resolverSort = findOption?.resolverSort;
            if(isChecked){
                if(index > -1){
                    draft[index] = { ...draft[index], sortable:true, key: key, sortResolver:resolverSort}
                }
            }else{
                draft[index] = { ...draft[index], sortable:undefined, key: key, sortResolver:undefined}
            }
        })  
    }
    ,[]);

    
    return (
        <div className="flex flex-col">
            <div className="border m-1 gap-1 h-full flex items-center">
                <div className="flex border-e-2 flex-1 md:max-w-[calc(100vw-30rem)] overflow-x-auto scrol-h-custom">
                    {
                        valueHeader.length === 0 ?(
                            <span>Silakan Klik Tambah untuk menambahkan Header Tabel</span>
                        ):(
                            valueHeader.map((m,i)=>(
                                <PreviewColumn
                                    key={i}
                                    index={i}
                                    header={m}
                                    setValueHeader={setValueHeader}
                                >
                                    <div className="flex flex-col w-full items-center border-e text-sm">
                                            <DropdownButtonsModal className="[&>svg]:size-2 h-2 w-2 my-1 self-end">
                                                <DropdownMenuContent>
                                                    <div className="flex border-b justify-center py-2 flex-wrap">
                                                        <ButtonTooltip asChild tooltip="Hapus Header Ini" className="border p-1 h-auto w-fit [&>svg]:size-3">
                                                            <button onClick={()=>deleteItemHeader(m)}><Trash/></button>
                                                        </ButtonTooltip>
                                                        <PopoverHeading 
                                                            dataTh={m} 
                                                            onChangeText={onChangeText} 
                                                            onChangeTextAlign={onChangeTextAlign}
                                                            onCreateSortirControl={onCreateSortirControl}
                                                            />
                                                        <PopoverColumn
                                                            dataTh={m}
                                                            dataKeyColumn={designKeyDataColumn} 
                                                            onChangeTextAlign={onChangeTextAlignColumn}
                                                        />
                                                    </div>
                                                </DropdownMenuContent> 
                                            </DropdownButtonsModal>
                                        <div className="border-t w-full flex flex-col items-center border-amber-300"> 
                                            <span className={`${m?.className||""} w-full truncate`}>
                                                {m.label}
                                            </span>
                                        </div>
                                    </div>
                                </PreviewColumn>
                            ))
                        )
                    }
                </div>
                <div className="flex flex-col gap-2 border items-center ms-auto">
                    <Popover modal>
                        <ButtonTooltip asChild tooltip="Tambah Kolom Tabel" className="self-end me-0">
                            <PopoverTrigger>
                                <PlusIcon/>
                            </PopoverTrigger>
                        </ButtonTooltip>
                        <PopoverContent
                            side='bottom'
                            sideOffset={0}
                            className="overflow-y-auto max-h-100 text-xs"
                            >
                                <div className="flex items-center w-full gap-2 ">
                                    <TambahKolomCustom 
                                        setValueHeader={setValueHeader} 
                                        updateKeyDataColum={updateKeyDataColum} 
                                        defaultValue={1}
                                        value={value}
                                        setValue={setValue}
                                        />
                                </div>
                            {
                                selectedOptions.map((m,i)=>(
                                        <ListControl optionToolbar={m} key={i} onCheckHeader={onCheckedHeader} valueHeader={valueHeader}/>
                                    ))
                            }
                        </PopoverContent>
                    </Popover>
                    {
                        valueHeader.length ? (
                            <ButtonTooltip asChild tooltip="Reset semua kolom header">
                                <button onClick={resetHeader}><Trash/></button>
                            </ButtonTooltip>
                        ):null
                    }
                </div>
            </div>
        </div>
    )
}
function ListControl({
    optionToolbar,
    onCheckHeader,
    valueHeader,
}:{
    optionToolbar:OptionDesignTableToolbar<SiswaType>,
    onCheckHeader:( k:OptionDesignTableToolbar<SiswaType>,b:boolean)=>void
    valueHeader?: ThType<SiswaType>[]
}){
    const isCheckedHeader = valueHeader?.some(s=>s?.labelDefault === optionToolbar?.labelDefault);
    
    return (
            <div className="border p-1 flex gap-2 group">
                <label className="flex items-center w-full gap-2 border has-checked:bg-green-400 peer">
                    <input 
                        type="checkbox"
                        className="peer"
                        checked={isCheckedHeader}
                        onChange={(e)=>
                                onCheckHeader(
                                    // optionToolbar.labelDefault, 
                                    optionToolbar,
                                    e.target.checked
                                )
                            }
                        />
                    {optionToolbar?.labelDefault}
                </label>
                
            </div>
    )
}

function PopoverHeading(
    {
        dataTh, 
        onChangeText, 
        onChangeTextAlign,
        onCreateSortirControl
    }:{
        dataTh:ThType<SiswaType>, 
        onChangeText: (v:string, dataTh:ThType<SiswaType> )=>void,
        onChangeTextAlign:(v:string, dataTH:ThType<SiswaType>)=>void,
        onCreateSortirControl:(b:boolean, dataTh:ThType<SiswaType>) =>void
    }){
    return (
        
        <Popover>
                <ButtonTooltip asChild tooltip="Property Header" className="border p-1 h-auto w-fit [&>svg]:size-3">
                    <PopoverTrigger>
                            {/* <button className="border p-1"><Columns3Cog/></button> */}
                            <Columns3Cog/>
                    </PopoverTrigger>
                </ButtonTooltip>
            <PopoverContent className="bg-linear-to-tl from-sky-600 to-sky-100 dark:to-sky-300 pt-0 px-2">
                <div className="grid gap-0 ">
                    <div className="space-y-2 border-b">
                        <h4 className="leading-none font-medium">Properti Header {dataTh.labelDefault}</h4>
                        <p className="text-muted-foreground text-sm">
                            Atur Header {dataTh.labelDefault}
                        </p>
                    </div>
                    <div className="grid gap-2 p-2 rounded-xl bg-linear-to-tl from-sky-700 to-sky-300 dark:to-sky-600">
                        <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="flex flex-1 justify-center col-span-3">
                                <RadioTextAlign 
                                    value={dataTh.className?.split(" ").find(c => TEXT_ALIGN.includes(c))} 
                                    onChange={( v)=>onChangeTextAlign(v as string,dataTh)} 
                                    sectionKey="alignHeader"
                                />
                                <SortirColumnControl 
                                    value="" 
                                    // checked={}
                                    onChange={(e)=>onCreateSortirControl(e.target.checked, dataTh)}>
                                    <SortDesc/>
                                </SortirColumnControl>
                            </div>
                                
                            <label className="w-full col-span-3">
                                <input 
                                    type="text" 
                                    value={dataTh.label??""}
                                    onChange={(e)=>onChangeText(e.target.value, dataTh)}
                                    className="bg-white text-black w-full select-none" 
                                    placeholder="Ganti Teks"/>
                            </label>
                        
                        </div>
                    </div>
                </div>
                
            </PopoverContent>
        </Popover>
                                        
    )
}

function PopoverColumn(
    {
        dataTh, 
        onChangeTextAlign,
        dataKeyColumn,
    }:{
        dataTh:ThType<SiswaType>, 
        onChangeTextAlign:(v:string, dataTH:ThType<SiswaType>)=>void,
        dataKeyColumn:KeyModelTable<SiswaType>[]
    }){
        const classNames = dataKeyColumn.find(s=>s.id === dataTh.labelDefault)?.className
    return (
        <Popover>
                <ButtonTooltip asChild tooltip="Properti Kolom" className="border p-1 h-auto w-fit [&>svg]:size-3">
                                                
                    <PopoverTrigger>
                            {/* <button className="border p-1"><Columns3Cog/></button> */}
                            <Columns/>
                    </PopoverTrigger>
            
                </ButtonTooltip>
            <PopoverContent className="bg-linear-to-tl from-sky-600 to-sky-100 dark:to-sky-300 pt-0 px-2">
                <div className="grid gap-0 ">
                    <div className="space-y-2 border-b">
                        <h4 className="leading-none font-medium">Properti Header {dataTh.labelDefault}</h4>
                        <p className="text-muted-foreground text-sm">
                            Atur Header {dataTh.labelDefault}
                        </p>
                    </div>
                    <div className="grid gap-2 p-2 rounded-xl bg-linear-to-tl from-sky-700 to-sky-300 dark:to-sky-600">
                        <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="flex flex-1 justify-center col-span-3">
                                <RadioTextAlign 
                                    value={classNames?.split(" ").find(c => TEXT_ALIGN.includes(c))} 
                                    onChange={( v)=>onChangeTextAlign(v as string,dataTh)} 
                                    sectionKey="alignColumn"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
            </PopoverContent>
        </Popover>
                                        
    )
}

function TambahKolomCustom(
    {
        setValueHeader, 
        updateKeyDataColum,
        defaultValue,
        value,
        setValue
    }:{
        setValueHeader:(updater: (draft: ThType<SiswaType>[]) => void) => void, 
        updateKeyDataColum:(updater: (draft: KeyModelTable<SiswaType>[]) => void) => void, 
        defaultValue:number
        value: FilterContextValue<SiswaType>,
        setValue: (v: Partial<FilterContextValue<SiswaType>>) => void
    }){
        const stateContext = value?.additionalColumns;
        const [count, setCount] = useState<number>(stateContext?.jumlah ?? defaultValue);
        const isCheck = !!stateContext?.terpilih;
        const setIsCheck = (v:boolean)=>{
            setValue({
                additionalColumns:{
                    terpilih:v,
                    jumlah: v?count:1
                }
            });
            setValueHeader(draft=>{
                const actionIndexes = getActionIndexes(draft);
                const currentCount = actionIndexes.length;

                // ❌ jika tidak dicentang → hapus semua actions
                if (!v) {
                    for (let i = actionIndexes.length - 1; i >= 0; i--) {
                        draft.splice(actionIndexes[i], 1);
                    }
                    return;
                }
            })
        }
        
        const added = ()=>{
            if(count === 0 || count > 10){
                alert('Minimal 1 dan maksimal 10 baris');
                setCount(1);
                return;
            }

            
            setValueHeader(draft => {
                const actionIndexes = getActionIndexes(draft);
                const currentCount = actionIndexes.length;

                // ❌ jika tidak dicentang → hapus semua actions
                if (!isCheck) {
                    for (let i = actionIndexes.length - 1; i >= 0; i--) {
                        draft.splice(actionIndexes[i], 1);
                    }
                    return;
                }

                // ➕ tambah jika kurang
                if (currentCount < count) {
                    const sisa = count - currentCount;

                    const data: ThType<SiswaType>[] = Array.from(
                        { length: sisa },
                        (_, i) => ({
                        label: `Kolom Custom ${currentCount + i + 1}`,
                        labelDefault: `Kolom Custom ${Date.now()}-${i}`,
                        type: "actions",
                        className:"text-center"
                        })
                    );

                    draft.push(...data);
                }

                // ➖ kurangi jika berlebih
                if (currentCount > count) {
                    const toRemove = currentCount - count;
                    const removeIndexes = actionIndexes.slice(-toRemove);

                    for (let i = removeIndexes.length - 1; i >= 0; i--) {
                        draft.splice(removeIndexes[i], 1);
                    }
                }
            });
            updateKeyDataColum((draft)=>{
                // 1️⃣ Hapus semua actions
                for (let i = draft.length - 1; i >= 0; i--) {
                    if (draft[i]?.type === 'actions') {
                    draft.splice(i, 1);
                    }
                }

                // 2️⃣ Tambahkan jika dicentang
                if (isCheck) {
                    const data: KeyModelTable<SiswaType>[] = Array.from(
                    { length: count },
                    () => ({
                        type: 'actions',
                        render: () => "",
                    })
                    );

                    draft.push(...data);
                }
                
            })
                // if(isCheck){
                //     setValueHeader((draft)=>{
                //         //check dulu, apakah kolom custom sudah pernah dibuat sebelumnya:
                //         const draftCostumColumns = draft.filter(s=>s.type === 'actions');
                //         // jika jumlah sebelumnya <= jumlah sekarang berarti ditambahkan
                //         // sebanyak sisanya;
                //         if(draftCostumColumns.length <= count){
                //             const sisa =  count - draftCostumColumns.length ;
                //             const data: ThType<SiswaType>[] = Array.from(
                //                     { length: sisa },
                //                     (_, i) => ({
                //                         label: `Kolom Custom ${i + draftCostumColumns.length}`,
                //                         labelDefault: `Kolom Custom ${i + draftCostumColumns.length + new Date().getTime()}`,
                //                         type: 'actions',
                //                     })
                //                     );
                //             // tambahkan sisanya
                //             draft = {...draft, ...data}
                //         }else if(draftCostumColumns.length > count){
                //             //jika pernah dibuat dan jumlah awalnya lebih dari jumlah yang ditentukan, maka kurangi
                //             // sebanyak selisih;
                //             const selisih = draftCostumColumns.length - count;
                //             draft.splice(selisih)
                //         }else{
                //             const data: ThType<SiswaType>[] = Array.from(
                //                     { length: count },
                //                     (_, i) => ({
                //                         label: `Kolom Custom ${i + 1}`,
                //                         labelDefault: `Kolom Custom ${i + 1}`,
                //                         type: 'actions',
                //                     })
                //                     );

                //                 draft.push(...data);
                //         }

                //     });
                    
                //     updateKeyDataColum((draft)=>{
                //         // 1️⃣ Hapus semua actions
                //         for (let i = draft.length - 1; i >= 0; i--) {
                //             if (draft[i]?.type === 'actions') {
                //             draft.splice(i, 1);
                //             }
                //         }

                //         // 2️⃣ Tambahkan jika dicentang
                        
                //             const data: KeyModelTable<SiswaType>[] = Array.from(
                //             { length: count },
                //             () => ({
                //                 type: 'actions',
                //                 render: () => "",
                //             })
                //             );

                //             draft.push(...data);
                        
                        
                //     })
                // }else{
                //     setValueHeader((draft)=>{
                //         draft = draft.filter(s=>s.type === 'actions');
                //     })
                // }
                
            
        }
    return (
        <div className="flex items-center gap-2">
            <label className="flex gap-2">
                <input type="checkbox" checked={isCheck} onChange={(e)=>setIsCheck(e.target.checked)}/>
                Kolom Kostum
            </label>
            {
                isCheck && (
                    <div className="flex gap-2 items-center border flex-1">
                        <label>
                            <input type="number" 
                                    min={1} max={10}
                                    value={count}
                                    onChange={(e)=>setCount(Number(e.target.value))}
                                    className="outline-none border w-full ms-auto"
                                    />
                        </label>
                        <button onClick={added}><Plus/></button>
                    </div>

                )
            }
        </div>
    )
}
function getActionIndexes<T extends { type?: string }>(draft: T[]) {
  return draft
    .map((item, index) => (item?.type === 'actions' ? index : -1))
    .filter(i => i !== -1);
}
