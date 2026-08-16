import { SelectCommonsField } from "~/components/selects/select-commons";
import type { TransaksiEventType } from "~/domain/serah-terima/entities/transaksi-event-type";
import { type Updater} from 'use-immer'
import type { InfoPersonalSiswa } from "~/types/siswa";
import type { InfoPersonalPtk } from "~/types/akun-sheet";
import { JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import {  useState, type ChangeEvent } from "react";
import { Field } from "~/components/ui/field";
import { CalendarPicker } from "~/components/form-custom/calendar";
import { type TransaksiSerahTerimaDokumenAppType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { InputTextArea } from "~/components/fields/fields";

export default function FormTransaksiSerahTerimaKolomIsi({
    formDataTransaksi,
    setFormDataTransaksi
}:{
    formDataTransaksi:TransaksiSerahTerimaDokumenAppType,
    setFormDataTransaksi:Updater<TransaksiSerahTerimaDokumenAppType>
}){
    // const user = getSessionApp<UserPtk>()?.name;
    // const {event:serahTerimaDokumen, person:personTarget, transaksi:transaksiServer} = value;
    // const initial:TransaksiSerahTerimaDokumenAppType = {
    //             idbaris: 0,
    //             serah_terima_idbaris: serahTerimaDokumen.idbaris,
    //             target_person_id: personTarget.id as number,
    //             items: [],
    //             jenis: transaksiServer[0]?.jenis,
    //             idfile: '',
    //             oleh: user ?? '',
    //             snapshot: '',
    //             tgl: new Date(),
    //             keterangan: '',
    //             status:''
    // };
    // const koleksiTransaksi = serahTerimaDokumen?.jenis?.toString().split('_');
    // const foundTransaksi = transaksiServer.find(s=>s.jenis === koleksiTransaksi?.[0])
    // const [formDataTransaksi, setFormDataTransaksi] = useImmer<TransaksiSerahTerimaDokumenAppType>(foundTransaksi ?? initial)
    // // const [jenisTransaksi, setJenisTransaksi] = useState<keyof typeof JenisSerahTerimaEnum>()
    // const [dokumens, setDokumens] = useState<string[]>([])
    const {currentData:value} = useFormEdura<TransaksiEventType>()
    const {event:serahTerimaDokumen, person:personTarget, transaksi:transaksiServer} = value
    const isSiswa = serahTerimaDokumen.type_target === 'SISWA';
    
    const Nama = isSiswa? (personTarget as InfoPersonalSiswa)?.pd_nama :(personTarget as InfoPersonalPtk).name;
    const koleksiTransaksi = serahTerimaDokumen?.jenis?.toString().split('_');
    const foundTransaksi = transaksiServer.find(s=>s.jenis === koleksiTransaksi?.[0])
    const dataKoleksiTransaksi = koleksiTransaksi?.map(m=>({key:m, label: JenisSerahTerimaEnum[m as keyof typeof JenisSerahTerimaEnum]}));
    const [input, setInput] = useState<string>(formDataTransaksi.keterangan);
    
    const handleChangeTransaksi = (jenis:string)=>{
        // setJenisTransaksi(value as keyof typeof JenisSerahTerimaEnum);
        const foundTransaksi = transaksiServer.find(s=>s.jenis === jenis);
        if(foundTransaksi){
            setFormDataTransaksi(foundTransaksi)
        }else{
            setFormDataTransaksi(draft=>{
                draft.idbaris = 0;
                draft.idfile = "";
                draft.items = [];
                draft.jenis = jenis as keyof typeof JenisSerahTerimaEnum;
            })

        }
    }
    
    const handleChangeDokumen = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked, value} = e.currentTarget;
        const dokumens = formDataTransaksi.items;
        const items = checked
                ? [...dokumens, value]
                : dokumens.filter(s=> s!==value);
        setFormDataTransaksi(draft=>{
            draft.items = items
        });
    }

    const handleDate= (v:string|Date)=>{
        setFormDataTransaksi(draft=>{
            draft.tgl = new Date(v);
        })
    }
    
    
        const handleInput = (e:ChangeEvent<HTMLTextAreaElement>)=>{
            const {value} = e.currentTarget;
            setInput(value);
            setFormDataTransaksi    (draft=>{
                draft.keterangan = value;
            })

        }

    
    return (
        <>
        <h4 className="text-2xl font-bold border-b-8 border-double border-purple-500">{JenisSerahTerimaEnum[serahTerimaDokumen.jenis as keyof typeof JenisSerahTerimaEnum]}</h4>

        <div className="relative bg-sky-100 mt-7">
            <div className="absolute -top-4 text-xs ps-1 pe-4 rounded-tr-2xl bg-sky-100">Penerima</div>
            <p className="text-center truncate">
                {Nama}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 w-full mt-7 gap-2">
            <Field className="md:col-span-4">
                <CalendarPicker
                    id="tgl"
                    className=" mt-4"
                    label={"Tanggal "+JenisSerahTerimaEnum[formDataTransaksi.jenis]}
                    currentDate={formDataTransaksi.tgl ?? new Date()}
                    handleChangeDate={handleDate}/>
            </Field>
            <SelectCommonsField
                label="Transaksi"
                fieldClassName="md:col-span-8"
                value={formDataTransaksi.jenis}
                setValue={handleChangeTransaksi}
                data={dataKoleksiTransaksi??[]}
                keySelected={'key'}
                labelSelected={'label'}
                />
        </div>

        <div className="relative bg-sky-100 mt-7 rounded-tr-2xl">
            <div className="absolute -top-4 text-xs ps-1 pe-4 rounded-tr-2xl bg-sky-100">{JenisSerahTerimaEnum[serahTerimaDokumen.jenis as keyof typeof JenisSerahTerimaEnum]} Dokumen/Barang</div>
            {
                serahTerimaDokumen?.item_barang.map((m, i)=>
                    <Field key={i} orientation={"horizontal"} className="ps-4">
                        <input type="checkbox" 
                            name="dokumen" 
                            id={'dokumen_'+i}
                            value={m}
                            checked={formDataTransaksi.items.includes(m)}
                            onChange={handleChangeDokumen}
                            />
                        <label htmlFor={'dokumen_'+i}>{m}</label>
                    </Field>
                )
            }
        </div>
        <div className="relative mt-4">
            <InputTextArea 
                    label="Keterangan" 
                    placeholder="Deskripsikan keterangan serah terima" 
                    labelClassName="peer-placeholder-shown:w-10/12 peer-placeholder-shown:top-5" 
                    value={input} 
                    className="shadow-lg shadow-purple-500"
                    onChange={handleInput}/>

        </div>
        </>
    )
}