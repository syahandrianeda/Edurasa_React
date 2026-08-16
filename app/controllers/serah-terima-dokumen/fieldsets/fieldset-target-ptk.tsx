import type { handleProps } from "../fields/props-serah-terima";
import {  useEffect, useState, type ChangeEvent  } from "react";
import { Field} from "~/components/ui/field";
import { useAppSelector } from "~/context-reduct/hook";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { AccordionContent, AccordionItem} from "~/components/ui/accordion";
import { AccordionCustomeMain, AccordionCustomeTrigger } from "~/components/accordion-customs/accordion-custome-main";
import OptionsCheckboxPtk, { OptionsPropertiesDataPtk, OptionsPropertiesDataPtkUI, type KeyValue } from "../fields/option-properties-ptk";
import { OrmTendikInstance } from "~/context-reduct/selectores/orm-tendik-selector";
import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import type { InfoPersonalPtk } from "~/types/akun-sheet";
import DTOUser from "~/dtos/dto-user";


export default function FieldsetTargetPtk({value, setValue}:handleProps){
    const [isAllTarget, setIsAllTarget] = useState<boolean>(false);
    const dataPtk = useAppSelector(OrmTendikInstance).getIdDanPangkatCurrent(new Date());
    
    // const [idPtkSelected, setIdPtkSelected] = useState<number[]>([]);
    const [idPtkSelected, setIdPtkSelected] = useState<number[]>(value?.target_person ??[]);
    const [ptkSelected, setPtkSelected] = useState<InfoPersonalPtk[]>(value?.additional_info as InfoPersonalPtk[]??[]);
    const sampling = value?.additional_info?.length ? Object.entries((value?.additional_info as InfoPersonalPtk[])[0])?.map(([ke,va])=>ke): [];
    const keySampling:KeyValue[] = value?.additional_info?.length ? Object.entries(value?.additional_info[0]).map(([key, _])=>OptionsPropertiesDataPtk.find(s=>s.key === key)!) :[];
    const [property, setProperty] = useState<(keyof InfoPersonalPtk)[]>(sampling as (keyof InfoPersonalPtk)[]);

    const [propertyLabel, setPropertyLabel] = useState<KeyValue[]>(keySampling??[] );
    
    const handleAllTarget =(b:boolean)=>{
        const mapId = dataPtk.map(m=>m.user_id);
        
        setIsAllTarget(b);
        
        if(b){
            const newData = [...idPtkSelected, ...mapId]
            setIdPtkSelected(newData);
            setValue(draft=>{
                draft.target_person = newData;
            })
    
            const newPtk= [...ptkSelected, ...dataPtk] ;
            const dto = DTOUser.arrayNormalizeInfoPersonalPtk(newPtk)
            setPtkSelected(dto );
            
        }else{
            const filtering = idPtkSelected.filter(s=>!mapId.includes(s));
            setIdPtkSelected(filtering);
            setValue(draft=>{
                draft.target_person = filtering;
            })
    
            const filteringSiswa = ptkSelected.filter(s=>!mapId.includes(s.user_id as number));
            setPtkSelected(filteringSiswa);
        }
    }

    const handleCheckbox =(e: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = e.target;
        const numb = Number(value);
        const findPtk = dataPtk.filter(s=>s.user_id === numb)

        const nextValue = checked
            ? [...new Set([...idPtkSelected, numb])]
            : idPtkSelected.filter((item) => item !== numb);

        setIdPtkSelected(nextValue);

        const nextPtk = checked
            ?[...new Set([...ptkSelected, ...findPtk])]
            :ptkSelected.filter(s=>s.user_id !== numb);
        const dto = DTOUser.arrayNormalizeInfoPersonalPtk(nextPtk);
        setPtkSelected(dto);
        
        setValue(draft=>{
            draft.target_person = nextValue
        });
    };

    const handleProperties = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, name, value} = e.currentTarget;
        
        const data = checked
            ?[...new Set([...property, value])]
            :property.filter(s=>s!==value);
        const maping = data.map(m=>OptionsPropertiesDataPtk.find(s=>s.key === m)!)
        setProperty(data);
        setPropertyLabel(maping)
    }

    useEffect(()=>{
        const data:IdAkunDanPangkat[] = [];

        for(const item of ptkSelected){
            let ob:any = {
                id:item.id,
                name:item.nama_guru,
            }
            for(const key of property){;
                ob[key] = item[key]
            }
            data.push(ob);
        };

        setValue(draft=>{
            draft.additional_info = data ;//as unknown as InfoPersonalPtk[];
        });

    },[ptkSelected,property])

    return (
        <div className="rounded-2xl mt-4 p-2 flex flex-col [&>div]:p-2 gap-2 bg-linear-to-bl from-sky-200 to-purple-400 shadow-lg shadow-purple-500">
            <AccordionCustomeMain defaultValue={[]} type="multiple">
                <AccordionItem value="pilih_ptk" className="pt-0">
                    <AccordionCustomeTrigger label={`Data PTK`} className="bg-transparent"/>
                    <AccordionContent>
                        <div className="relative mt-4">
                            <label className="absolute flex gap-2 -top-4 left-0 w-fit ps-1 pe-4 py-1 rounded-tr-2xl text-xs bg-sky-100">
                                <input
                                    type="checkbox"
                                    checked={isAllTarget}
                                    onChange={(e)=>handleAllTarget(e.currentTarget.checked)}
                                    className="align-middle"
                                />
                                Pilih Semua PTK
                            </label>
                            <div className="border px-4 pt-4 pb-2 overflow-y-auto scrol-h-custom text-xs grid grid-cols-1 md:grid-rows-10 md:grid-cols-2 md:grid-flow-col gap-x-4 gap-y-2 bg-sky-100 max-h-screen">
                                {
                                    dataPtk.map((m, i)=>{
                                            return (
                                                <div key={m.user_id} className="flex gap-2 ">
                                                    <div>
                                                        <input
                                                            id={"siswa_"+m.user_id}
                                                            type="checkbox"
                                                            value={m.user_id}
                                                            checked={idPtkSelected.includes(m.user_id)}
                                                            onChange={handleCheckbox}
                                                            />
                                                    </div>
                                                    <label htmlFor={"siswa_"+m.user_id} className="flex flex-col md:flex-row w-10/12 md:w-full truncate justify-between">
                                                        <span className="truncate">{m?.nama_guru}</span>
                                                        <span>({m?.jabatan})</span>
                                                    </label>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pilih_property">
                    <AccordionCustomeTrigger label="Pilih Property" className="pb-0 mb-0"/>
                    <AccordionContent>
                        <div className="border rounded-b-xl relative flex flex-col md:flex-row bg-sky-50 gap-2 text-xs">
                            <div className="border p-2 w-full md:w-fit">
                                <Field className="[&>label]:align-middle [&>label]:flex [&>label]:items-center [&>label]:w-full [&>label]:gap-2">
                                    {
                                        OptionsPropertiesDataPtkUI.map((m, i)=>( 
                                            <OptionsCheckboxPtk key={i} 
                                                property={property} 
                                                keyProperties={m.key} 
                                                label={m.label} 
                                                handleProperties={handleProperties}
                                                />
                                            )
                                        )
                                    }
                                </Field>
                            </div>
                            <div className="border overflow-x-auto p-4">
                                <TableWithScrolling className="text-[8px] border-0">
                                    <thead>
                                        <TRowEdura>
                                            <ThEdura>No</ThEdura>
                                            <ThEdura>Nama</ThEdura>
                                            {
                                                propertyLabel && propertyLabel.map(m=> <ThEdura key={m?.key}>{m?.label}</ThEdura> )
                                            }
                                            <ThEdura className="border border-dotted border-gray-400">...</ThEdura>
                                        </TRowEdura>
                                    </thead>
                                </TableWithScrolling>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </AccordionCustomeMain>
        </div>
    )
};