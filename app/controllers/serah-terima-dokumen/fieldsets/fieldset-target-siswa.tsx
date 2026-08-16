import type { handleProps } from "../fields/props-serah-terima";
import {  useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Field } from "~/components/ui/field";
import { SelectCommonsField } from "~/components/selects/select-commons";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { useAppSelector } from "~/context-reduct/hook";
import type { InfoPersonalSiswa} from "~/types/siswa";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import OptionsCheckbox, {OptionsPropertiesDataUI } from "../fields/option-properties-siswa";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import {  AccordionContent, AccordionItem } from "~/components/ui/accordion";
import { AccordionCustomeMain, AccordionCustomeTrigger } from "~/components/accordion-customs/accordion-custome-main";

export default function FieldsetTargetSiswa({value, setValue}:handleProps){
    const [isAllTarget, setIsAllTarget] = useState<boolean>(false   );
    const allSiswa = useAppSelector(selectAllSiswaDTO);
    const dataRombel = DataRombelUI.filter(s=>s.active);
    const [rombel, setRombel] = useState<string>(getSessionRombel());
    const [idSiswaSelected, setIdSiswaSelected] = useState<number[]>(value.target_person ?? []);
    const [siswaSelected, setSiswaSelected] = useState<InfoPersonalSiswa[]>(value?.additional_info as InfoPersonalSiswa[] ?? []);
    const sampling = value?.additional_info.length>0 ? Object.keys(value?.additional_info[0]): [];
    const properti= sampling as (keyof InfoPersonalSiswa)[];
    const [property, setProperty] = useState<(keyof InfoPersonalSiswa)[]>(properti);
    const [showSiswa, setShowSiswa] = useState<boolean>(false);

    const dataSiswaRombel = useMemo(()=>{
        const result =  allSiswa.filter(s=>s.aktif ==='aktif' && s.nama_rombel === rombel)
        return result;//[...new Set([...siswaSelected, ...result])];

    },[rombel, allSiswa  ])
    
    const handleRombel = (v:string)=>{
        setRombel(v);
    }

    const handleAllTarget =(b:boolean)=>{
            const mapId = dataSiswaRombel.map(m=>m.id);

            setIsAllTarget(b);

            if(b){
                const newData = [...idSiswaSelected, ...mapId]
                setIdSiswaSelected(newData);
                setValue(draft=>{
                    draft.target_person = newData;
                })

                const newSiswa = [...siswaSelected, ...dataSiswaRombel];
                setSiswaSelected(newSiswa);
                
            }else{
                const filtering = idSiswaSelected.filter(s=>!mapId.includes(s));

                setIdSiswaSelected(filtering);

                setValue(draft=>{
                    draft.target_person = filtering;
                })

                const filteringSiswa = siswaSelected.filter(s=>!mapId.includes(s.id));
                setSiswaSelected(filteringSiswa);
            }
            
    }

    const handleCheckbox =(e: ChangeEvent<HTMLInputElement>) => {
            const { checked, value } = e.target;
            const numb = Number(value);
            const findSiswa = allSiswa.filter(s=>s.id === numb)

            const nextValue = checked
                ? [...new Set([...idSiswaSelected, numb])]
                : idSiswaSelected.filter((item) => item !== numb);

            setIdSiswaSelected(nextValue);
            const nextSiswa = checked
                ?[...new Set([...siswaSelected, ...findSiswa])]
                :siswaSelected.filter(s=>s.id !== numb);

            setSiswaSelected(nextSiswa)
            
            setValue(draft=>{
                draft.target_person = nextValue
            })
            
        };

    const handleProperties = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, name, value} = e.currentTarget;
        const data = checked
            ?[...new Set([...property, value])]
            :property.filter(s=>s!==value);
        
        setProperty(data as (keyof InfoPersonalSiswa)[])
    }

    useEffect(()=>{
        const findSiswaSelectedRombel = siswaSelected.filter(s=>s.nama_rombel === rombel);
        const siswaRombel = allSiswa.filter(s=>s.aktif ==='aktif' && s.nama_rombel === rombel)
        setIsAllTarget(findSiswaSelectedRombel.length === siswaRombel.length)
    },[rombel]);

    useEffect(()=>{
        const data:InfoPersonalSiswa[] = [];

        for(const item of siswaSelected){
            let ob:any = {
                id:item.id,
                pd_nama:item.pd_nama,
            }

            for(const key of property){;
                const t = DtoSerahTerimaDokumen.createInfoPersonalSiswa(item, key)
                ob[key] = t[key]
            }

            data.push(ob);
        }

        setValue(draft=>{
            draft.additional_info = data;
        })
    },[siswaSelected,property])
    
    
    return (
        <div className="rounded-2xl mt-4 p-2 flex flex-col [&>div]:p-2 gap-2 bg-linear-to-bl from-sky-200 to-purple-400 shadow-lg shadow-purple-500">
            <div className="border rounded-xl flex flex-col md:flex-row gap-2">
                <SelectCommonsField
                    label="Pilih Kelas"
                    labelClassName="max-w-2/5 md:max-w-2/5"
                    data={dataRombel}
                    value={rombel}
                    setValue={handleRombel}
                    keySelected='rombelName'
                    labelSelected='rombelName'
                />
                <div className="relative flex w-full gap-2 text-xs pt-4 flex-row justify-center items-center">
                    <div className="absolute top-0 bg-sky-100 ps-1 pe-4 rounded-tr-2xl left-0">Resume</div>
                    <div className="bg-sky-100 w-full h-9 px-2">
                        Jumlah Siswa terpilih = {siswaSelected.length} Siswa
                    </div>
                </div>
            </div>
            <AccordionCustomeMain defaultValue={[]} type="multiple">
                <AccordionItem value="pilih_siswa" className="pt-0">
                    <AccordionCustomeTrigger label={`Data Kelas ${rombel}`} className="bg-transparent"/>
                    <AccordionContent>
                        <div className="relative mt-4">
                            <label className="absolute flex gap-2 -top-4 left-0 w-fit ps-1 pe-4 py-1 rounded-tr-2xl text-xs bg-sky-100">
                                <input
                                    type="checkbox"
                                    checked={isAllTarget}
                                    onChange={(e)=>handleAllTarget(e.currentTarget.checked)}
                                    className="align-middle"
                                    />
                                Pilih semua kelas {rombel}
                            </label>
                            <div className="border px-4 pt-4 pb-2 overflow-y-auto scrol-h-custom text-xs grid grid-cols-1 md:grid-rows-17 md:grid-cols-2 md:grid-flow-col gap-x-4 gap-y-2 bg-sky-100">
                                {
                                    dataSiswaRombel.map((m, i)=>{
                                        return (
                                        <div key={m.id} className="flex gap-2">
                                            <div>
                                                <input
                                                    id={"siswa_"+m.id}
                                                    type="checkbox"
                                                    value={m.id}
                                                    checked={idSiswaSelected.includes(m.id)}
                                                    onChange={handleCheckbox}/>
                                            </div>
                                            <label htmlFor={"siswa_"+m.id} className="flex w-10/12 md:w-full truncate justify-between">
                                                <span className="truncate">{m?.pd_nama}</span>
                                                <span>({m?.nama_rombel})</span></label>
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
                            <div className="border p-2 md:w-5/12">
                                <Field className="[&>label]:align-middle [&>label]:flex [&>label]:items-center [&>label]:w-full [&>label]:gap-2">
                                    {
                                        OptionsPropertiesDataUI.map((m, i)=>( 
                                                <OptionsCheckbox key={i} 
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
                            <div className="border w-full p-4 overflow-x-auto">
                                <TableWithScrolling className="text-[8px] border-0">
                                    <thead>
                                        <TRowEdura>
                                            <ThEdura>No</ThEdura>
                                            <ThEdura>Nama</ThEdura>
                                            {
                                                property.map(m=>
                                                    <ThEdura key={m}>{m}</ThEdura>
                                                )
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
}