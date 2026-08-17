import { useEffect, useState, type ChangeEvent, type ChangeEventHandler } from "react";
import { SelectCommonsField } from "~/components/selects/select-commons";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Switch } from "~/components/ui/switch";
import { setSerahTerimaDokumen } from "~/context-reduct/global-state/galleries/serah-terima-dokumen-slice";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { DtoSerahTerimaSelector, OrmSerahTerimaWithTransaksiSelector } from "~/context-reduct/selectores/serah-terima-selector";
import type { SerahTerimaWithTransaksi } from "~/domain/serah-terima/entities/orm-serah-terima-type";
import OrmSerahTerimaTransaksi from "~/domain/serah-terima/service/orm-serah-terima-transaksi";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";


export default function ControlKoleksiFormSerahTerimaDokumen(){
    const data = useAppSelector(OrmSerahTerimaWithTransaksiSelector) ;//as SerahTerimaDokumenAppType[];
    const dispatch = useAppDispatch();
    const [selectedItem, setSelectedItem] = useState<string>();
    const [fillTgl, setFillTgl]=useState<boolean>(true);
    const [kolomEvidence, setKolomEvidence] = useState<string>('poto')
    const {value, updateExtra} = useFilterContext<{
        daftarSerahTerimaDokumen?:SerahTerimaWithTransaksi,
        kolom_evidence?:string,
        fillTgl?:boolean
    }>();

    useEffect(()=>{
        if(!data) return;
        if(value?.extra?.daftarSerahTerimaDokumen) return
        updateExtra(draft=>{
            draft.daftarSerahTerimaDokumen = data[data.length-1];
            draft.fillTgl = true
        })
        setSelectedItem(data[data.length-1]?.idbaris.toString())
    },[data])   

    const dataKeyValue: Array<{ key: string; value: string | number }> = data.map((m) => ({
        key: m.idbaris.toString(),
        value: m.nama_kegiatan,
    }));

    const handleSelected = (v:string)=>{
        
        setSelectedItem(v);
        setKolomEvidence('poto')
        const found = data.find(s=>s.idbaris === Number(v));
        if(found){
            
            updateExtra(draft=>{
                draft.daftarSerahTerimaDokumen = found
            })
        }
    }

    const handleEvidence = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, value} = e.currentTarget;
        if(checked){
            setKolomEvidence(value);
            updateExtra(draft=>{
                draft.kolom_evidence = value
            })
        }
        
    }

    const handleFillTgl = (v:boolean)=>{
        setFillTgl(v);
        updateExtra(draft=>{
            draft.fillTgl = v;
        })
    }

    return (
        <div className="bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 grid grid-cols-1 md:grid-cols-2 px-2 py-6 gap-1">
            <div className='relative flex flex-col px-2 inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-s-lg rounded-bl-lg border-b-none border-e-none'>
                <SelectCommonsField
                    
                    label="Koleksi Dokumen Serah Terima Dokumen/Barang"
                    data={dataKeyValue}
                    labelClassName="max-w-11/12"
                    fieldClassName="w-full mt-7"
                    value={selectedItem}
                    setValue={handleSelected}
                    keySelected="key"
                    labelSelected="value"
                    />
                <div className="relative mt-7 text-xs border gap-2  bg-sky-100 space-y-0 rounded-tr-2xl">
                    <div  className="absolute data-[variant=label]:text-xs -top-4 font-normal left-0 bg-sky-100 ps-1 pe-4 rounded-tr-2xl">Bukti Penyerahan/Penerimaan</div>
                    <div className="text-xs p-2">
                        Piihan kolom bukti penyerahan dapat berupa poto/tanda tangan. Tinggal pilih di sini:
                    </div>
                    <div className="gap-2 text-xs item-center flex justify-start">
                        <input name="kolom_evidence" id="kolom_poto" type="radio" className="w-4 h-4 ms-3 align-middle" value="poto" checked={kolomEvidence === 'poto'} onChange={handleEvidence}/>
                        <label htmlFor="kolom_poto" className=" text-xs">Kolom Poto</label>
                    </div>
                    <div className="gap-2 item-center mb-3 flex justify-start">
                        <input name="kolom_evidence" id="kolom_ttd" type="radio" className="w-4 h-4 ms-3 align-middle" value="ttd" checked={kolomEvidence === 'ttd'}  onChange={handleEvidence}/>
                        <label htmlFor="kolom_ttd" className=" text-xs">Kolom Tanda Tangan</label>
                    </div>
                </div>
            </div>
            <div className='relative flex flex-col ps-2 inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-e-lg rounded-br-lg border-b-none border-e-none'>
                <div className="relative mt-7 text-xs border gap-2  bg-sky-100 space-y-0 rounded-tr-2xl min-h-12 pt-4 flex ps-4">
                    <div  className="absolute data-[variant=label]:text-xs -top-4 font-normal left-0 bg-sky-100 ps-1 pe-4 rounded-tr-2xl">Kolom Tanggal (Penyerahan)</div>
                    <Switch size="sm" checked={fillTgl} onCheckedChange={handleFillTgl} id="id-fill-tgl"/>
                    <label htmlFor="id-fill-tgl">{fillTgl?'Isikan Tanggal Kegiatan':'Kosongkan Tanggal'}</label>
                </div>
            </div>
        </div>
    )
}