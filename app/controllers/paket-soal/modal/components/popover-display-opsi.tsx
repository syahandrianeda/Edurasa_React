import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {useState, type ChangeEvent, type Dispatch, type SetStateAction} from 'react';
import { Button } from "~/components/ui/button";
import { Eclipse, Settings } from "lucide-react";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import { Field } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import type { FormatElemen } from "~/types/bank-soal/bentuk-soal-type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";


type Props={
    modeDisplay:FormatElemen,
    setModeDisplay:Dispatch<SetStateAction<FormatElemen>>
    showStimulus:boolean,
    setShowStimulus:Dispatch<SetStateAction<boolean>>
    data:BankSoalAppType
}
export default function PopoverDisplayOpsi({data, modeDisplay, setModeDisplay, showStimulus, setShowStimulus}:Props){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const handleStimulus = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked} = e.currentTarget;
        setShowStimulus(checked);
        setIsOpen(false);
    }

    const handleRadio = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, name, value} = e.currentTarget;
        if(checked){
            setModeDisplay(value as FormatElemen);
            setIsOpen(false);
        }
    }
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className="hover:bg-sky-300 rounded p-2">
                <TooltipComp content="Seting Tampilan Soal">
                        <Settings size={12}/>
                    
                </TooltipComp>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col text-[10px] items-center mb-2">
                    <div className="w-full">Tampilkan Stimulus pada pertanyaan:</div>
                    <Field className="relative">
                        <label className="border-b flex justify-between flex-row-reverse select-none">
                            <input type="checkbox" className="align-middle" checked={showStimulus} onChange={handleStimulus} />■ Tampilkan Stimulus
                        </label>
                    </Field>
                </div>
                {
                    ['pg', 'pg_kompleks'].includes(data.bentuk_soal) && (
                        <div className="flex flex-col text-[10px] gap-2 text-gray-600">
                            <div className="w-full">Tampilan opsi jawaban dalam bentuk</div>
                            <Field orientation={"horizontal"} className="justify-between">
                                <Label htmlFor="vertical" className="text-[10px] w-full">■ List (opsi tampil seperti daftar)</Label>
                                <Input type="radio" name="display" value="vertical" id="vertical" className="h-4 w-4" checked={modeDisplay === 'vertical'} onChange={handleRadio}/>
                            </Field>
                            <Field orientation={"horizontal"} className="justify-between">
                                <Label htmlFor="square" className="text-[10px] w-full">■ 2 kolom (opsi tampil 2 kolom)</Label>
                                <Input type="radio" name="display" value="square" id="square" className="h-4 w-4" checked={modeDisplay === 'square'} onChange={handleRadio}/>
                            </Field>
                            <Field orientation={"horizontal"} className="justify-between">
                                <Label htmlFor="horizontal" className="text-[10px] w-full">■ 1 baris (Opsi tampil dalam 1 baris)</Label>
                                <Input type="radio" name="display" value="horizontal" id="horizontal" className="h-4 w-4" checked={modeDisplay === 'horizontal'} onChange={handleRadio}/>
                            </Field>
                        </div>
                    )
                }
            </PopoverContent>
        </Popover>
    )
}