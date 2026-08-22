import type { FormatElemen, ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type"
import FieldJumlahOpsi from "../FieldJumlahOpsi"
import { Field } from "~/components/ui/field"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import CountOpsi from "./settings/count-opsi"
import TooltipComp from "~/components/ui_edura/tooltip-comp"

type SettingCountOpsiProps = {
    bentukSoal:ListBentukSoalType,
    countOpsi: number,
    onChangeCountOpsi: (v:number)=>void,
    formatOpsi:FormatElemen, 
    handleFormat:(v:boolean)=>void
}
export default function SettingCountOpsi({
    bentukSoal,
    countOpsi, 
    onChangeCountOpsi,
    formatOpsi, 
    handleFormat
    }:SettingCountOpsiProps){
    return (
        <div className="border bg-white p-1 rounded text-xs flex flex-col md:flex-row gap-2 justify-between">
            <div>
                <p>
                    Bentuk Soal : {bentukSoal?.description}
                </p>
                <p>Cara Koreksi : {bentukSoal?.way_correction}</p>
                <p>Tampilan Opsi : {formatOpsi === 'table'?'format opsi tabel':'format opsi umum (A, B, C, atau D seperti umumnya)'}</p>
            </div>
            {/* <SwitchSettingJsonAlatJawab bentukSoal={bentukSoal} data={dataOpsi} onHandler={action}/> */}
            <div className="flex justify-between w-1/2 gap-4">
                <CountOpsi classNameLabel="text-nowrap" bentukSoal={bentukSoal} countOpsi={countOpsi} setCountOpsi={onChangeCountOpsi}/>
                <Field orientation={"horizontal"} className="w-full">
                    <Switch id="formatOpsi" className="h-5" size="sm" checked={formatOpsi === 'table'} onCheckedChange={handleFormat}/>
                    <TooltipComp content={"Tampilan opsi dalam bentuk tabel"}>
                    <Label htmlFor="formatOpsi">Format Tabel</Label>

                    </TooltipComp>
                </Field>
                
            </div>
        </div>
    )
}