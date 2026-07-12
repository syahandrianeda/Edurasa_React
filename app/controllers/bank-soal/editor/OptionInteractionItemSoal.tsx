import { useCallback, useEffect, useMemo, useState } from "react";
import { Field, FieldContent, FieldDescription, FieldGroup } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {type FormatElemen, type OpsiPilihanJawaban, type PgKompleks, type PgTunggal } from "~/types/bank-soal/bentuk-soal-type";
import type { OptionsInListBentuSoal } from "~/domain/bank-soal/interaction-soal/count-options";
import { generateAlphabet } from "~/lib/generateAlphabet";
import type { ListBentukSoalType, OpsiPilihanTabel } from "~/types/bank-soal/bentuk-soal-type";
import OpsiBiasa from "./OpsiBiasa";
import OpsiTable from "./OpsiTable";
import { useCreateItemSoalContext } from "../reducer-item-soal/immer-reducer-context";
import OpsiPilihanCommon from "./OpsiPilihanCommon";

const countOpsion:OptionsInListBentuSoal[]=[
    {
        name:'pg',
        prepareOptionsCount:{
            default:4,
            min:3,
            max:5
        },
        decision:4
    },
    {
        name:'pg_kompleks',
        prepareOptionsCount:{
            default:4,
            min:3,
            max:10
        },
        decision:4
    },
]
export function OptionInteractionItemSoal({bentukSoal}:{bentukSoal:ListBentukSoalType}){
    const {data, action} = useCreateItemSoalContext();

    const [settingOpsiJawaban, setSettingOpsiJawaban] = useState<PgTunggal>();
    const [opsiPilihanJawaban, setOpsiPilihanJawaban] = useState<OpsiPilihanJawaban[]>([]);
    const [opsiPilihanTabel, setOpsiPilihanTabel] = useState<OpsiPilihanTabel[]>();
    const [countOpsi, setCountOpsi] = useState<number>(4);
    const [formatOpsi, setFormatOpsi] = useState<FormatElemen>('vertical');
    const [kunciJawaban, setKunciJawaban] = useState<number>(0);// kunci jawaban menggunakan index
    const optionNodes = countOpsion.find(s=>s.name === bentukSoal.name);
    const [arrayAbjad, setArrayAbjad] = useState<string[]>([]);
    // const arrayAbjad = generateAlphabet(countOpsi);
    useEffect(()=>{
        action({
            type:'set_item_soal',
            payload:{
                json_alat_jawab:settingOpsiJawaban
            }
        })
    },[settingOpsiJawaban])
    /** effect yang mengakibatkan `settingOpsiJawaban` berubah */
    useEffect(()=>{
        setSettingOpsiJawaban({
            OpsiPilihanJawaban:opsiPilihanJawaban,
            formatOpsi,
            opsiPilihanTabel,
            valid:0
        })
    },[formatOpsi,opsiPilihanJawaban, opsiPilihanTabel])
    /** setter countOpsi */
    const handlerCountOpsi = (v:number)=>{
        if(!optionNodes)return;

        if(v >= optionNodes.prepareOptionsCount.min && v <= optionNodes.prepareOptionsCount.max ){
            setCountOpsi(v);
            /** ===== countOpsi 
             * disini seharusnya jumlah opsiJawaban berubah
             *  tapi akan dihandle oleh useEffect dari devedency `countOpsi`
             */

            /** ==== berefek ke kunci jawaban
             * Karena jumlah opsi berubah, data `OpsiPilihanJawabanBerubah`, 
             * seharusnya, kunci jawaban `valid` juga berubah;
             * perubahan `OpsiJawabanBerubah` menjadikan `valid` kembali ke awal
             * setKunciJawababIndex(0);
             * atau, 
             * jika kunci jawaban sebelumnya index-nya terhapus, kembalikan ke nol, jika tidak biarkan
             */
            setKunciJawaban((prev)=>{
                /** jika kunci sebelumnya nilai lebih dari jumlahopsi, maka kembalikan ke A 
                 *  Misal, kuncinya adalah `D` artinya `kunciJawaban` = 3 (diawali index),
                 * sementara D dihapus karena countOpsinya bernilai 3, maka
                 * if(3>(3-1)) => 3 > 2 => benar;
                 * jika kunci A, opsi dihapus sampai C (countOpsi: 3)
                 * if(0 > 2) =>salah, jadi dikembalikan ke A via `return prev`
                */
                if(prev > (v-1)){
                    return 0
                }
                return prev;
            });
            /** cegah untuk  lanjut*/
            return;
        }
        alert(`'Jumlah Opsi opsi minimal ${optionNodes.prepareOptionsCount.min}, maksimal ${optionNodes.prepareOptionsCount.max}`);
    };
    /** reset OpsiPilihanJawaban ketika `countOpsi` berubah */
    useEffect(()=>{
        setOpsiPilihanJawaban((prev) => {
            /** jika prev kosong tambahkan ini: */
            if (prev.length === 0) {
                return Array.from({ length: countOpsi }, (_, index) => ({
                    content: "",
                    index,
                }));
            }
            /** jika jumlah prev sebelumnya lebih banyak, hapus */
            if (prev.length > countOpsi) {
                return prev.slice(0, countOpsi);
            }
            /** jika prev kurang, tambahkan sebanyak countOpsi */
            if (prev.length < countOpsi) {
                return [
                    ...prev,
                    ...Array.from(
                        { length: countOpsi - prev.length },
                        (_, i) => ({
                            content: "",
                            index: prev.length + i,
                        })
                    ),
                ];
            }

            return prev;
        });
        const abjad = generateAlphabet(countOpsi);
        
        setArrayAbjad(abjad)
        
        
    },[countOpsi]);
    
    const handleChangeItemOpsiBiasa = useCallback(
        (index:number, content:string)=>{
            setOpsiPilihanJawaban((prev)=>{
                if(!prev) return prev;
                const updateData = { index, content };

            return prev.map((data, i) => i === index ? { ...data, content: updateData.content, } : data );
            })
            
        }
        ,[])
    
    // const handleKunciJawaban = useCallback((v:number)=>)
    /** handle setter `formatOpsi` 
     * tapi, tidak menggunakan handlerChangeOpsi pun sebenarnya bisa
     * dan lebih efectif
     * -------------
        const handlerChangOpsi = (v:FormatElemen)=>{ setFormatOpsi(v); }
     * --------------------
    */
    /** ===== effect formatOpsi 
     * format opsi mempengaruhi data `OpsiPilihanJawaban` dan `OpsiPilihanTabel` pada property `PgTunggal`
     * Jika `formatOpsi = biasa` diubah ke `formatOpsi = table`, maka
     *  - data `fomrat = biasa` dijadikan data `formatOpsi = tabel`, dengan ketentuan:
     *     * data `format biasa` dijadikan data untuk kolom 1
     * Jika `formatOpsi = tabel` diubah ke `formatOpsi = biasa`, maka
     *  - data `format = tabel` dijadikan data `formatOpsi = biasa, dengan ketentuan:
     *     * data `format = tabel` dijoin untuk dijadikan data untuk tiap `opsiPilihan Jawaban
     * resikonya adalah ketika formatOpsi dibolak-balik (dari biasa -> tabel atau tabel -> biasa)
    */
    useEffect(()=>{
        /** jika formatOpsi diubah ke vertical dan opsiPilihanTabel tidak undefined */
        if(formatOpsi === 'vertical' && opsiPilihanTabel){
            /** di sini berpotensi `opsiPilihanJawaban` berubah dengan mengambil nilai dari `opsiPilihanTabel*/
        }

        /** jika opsiPilihanTabel undefined dan formatOpsi diubah ke 'tabel` */
        if(formatOpsi === `table` && !opsiPilihanTabel){
            /** maka `opsiPilihanTabel` seharusnya diisi, tapi disini akan sulit
             * karena, kontennya akan merujuk ke konten `tiptap.
             * -----------
             * const data = [
             *  {
             *      row:0,
             *      content:[
             *              {col:0, content:'A'},
             *              {col:1, content:''},
             *          ]
             *  },
             *  {
             *      row:1,
             *      content:[
             *              {col:0, content:'B'},
             *              {col:1, content:''},
             *          ]
             *  },
             *  { ... }
             * ]
             * setOpsiPilihanTabel(data);
             * ------------
             * jika melihat contoh datanya, maka sebaiknya setter `valueJson` seharusnya disetter di sini
             */
        }
    },[formatOpsi])
    


    if(!optionNodes) return ;
    
    return (
        <div className="md:col-span-12 mt-4 grid md:grid-cols-12">
                <div className="md:col-span-3">
                    <p className="font-bold">Opsi Jawaban:</p>
                    <p className="text-xs">{bentukSoal.description}</p>
                    <p className="text-xs">Cara koreksi: {bentukSoal.way_correction}</p>
                </div>
                <div className="md:col-span-9 pt-1">
                    <Field orientation="horizontal" className="gap-2 text-xs">
                        <label htmlFor="jumlahOpsi">Atur Jumlah Opsi</label>
                        <Input type="number"
                                id="jumlahOpsi" 
                                className="w-20"
                                min={optionNodes.prepareOptionsCount.min} 
                                max={optionNodes.prepareOptionsCount.max}
                                value={countOpsi}
                                onChange={(e)=>handlerCountOpsi(Number(e.currentTarget.value))}
                                />

                    </Field>
                    <FieldGroup className="gap-0 space-y-0">
                        <FieldDescription>Tampilan Opsi</FieldDescription>
                        <FieldContent className="flex-row">
                            <Field orientation="horizontal">
                                <Input type="radio" className="w-4 h-4" 
                                    name="tampilanOpsi" checked={formatOpsi === 'vertical'} onChange={()=>setFormatOpsi('vertical')}/>
                                <Label className="text-xs">Biasa</Label>
                            </Field>
                            <Field orientation="horizontal">
                                <Input type="radio" className="w-4 h-4" 
                                    name="tampilanOpsi" checked={formatOpsi === 'table'} onChange={()=>{setFormatOpsi('table')}}/>
                                <Label className="text-xs">Tabel</Label>
                                
                            </Field>
                        </FieldContent>
                    </FieldGroup>
                </div>
                {
                                    formatOpsi === 'vertical' ? (
                                        <OpsiPilihanCommon 
                                            abjadCollection={arrayAbjad}
                                            onChangeContent={handleChangeItemOpsiBiasa}
                                            kunciJawaban={kunciJawaban}
                                            setKunciJawaban={setKunciJawaban}
                                            />
                                    ):(
                                        <OpsiTable abjadCollections={arrayAbjad}/>
                                    )
                                }
                
        </div>

    )
}