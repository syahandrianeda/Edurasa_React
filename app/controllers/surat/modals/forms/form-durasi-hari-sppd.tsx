import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import { getEndDate } from "~/lib/date-helper";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { CalendarPicker } from "~/components/form-custom/calendar";
import { Field} from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import ButtonUpdateTglSPPD from "../../crud/button-update-tgl-sppd";

export default function FormDurasiHariSppd(){
    const {state, actions, nextState} = useModal<SppdAppType>();
    const {currentData:data, setCurrentData} = useFormEdura<SppdAppType>()
    
    const handleDate = (value:string|Date)=>{
        if(!value) return;
        setCurrentData(draft=>{
            draft.ptk_starttgl = typeof(value) === 'string'? new Date(value):value;
        })
    }

    const handleIncrease =()=>{
        setCurrentData(draf=>{
            draf.ptk_durasisppd++
        })
    }
    
    const handleDecrease =()=>{
        if(data.ptk_durasisppd === 1) return;
        setCurrentData(draf=>{
            draf.ptk_durasisppd--
        })
    }
    
    return (
        <>
            <div className="flex flex-col gap-y-1 pt-4 space-y-4 md:h-72 min-h-98 border-2 items-center">
                <div className="border-2 relative border-sky-300 border-dotted rounded-md p-2 w-full md:w-10/12">
                    <span className="absolute top-0 left-1 -translate-y-4 bg-white">Preview SPPD:</span>
                    <TableWithScrolling className="table-auto w-full border-none">
                        <tbody>
                            <tr>
                                <td colSpan={2} className="text-[8px] px-2">6 ...</td>
                                <td className="border-s border-black"></td>
                            </tr>
                            <tr className="border-t border-b border-s-0 border-e-0 border-black">
                                <td className="px-2 align-top">7.</td>
                                <td className="px-2 w-6/12">
                                    <ol className="list-[lower-alpha] list-inside mt-0 pt-0">
                                        <li className="list-item">Lamanya perjalanan dinas</li>
                                        <li className="list-item">Tanggal Berangkat</li>
                                        <li className="list-item">Tanggal harus kembali/tiba di tempat baru</li>
                                    </ol>
                                </td>
                                <td className="border-s border-black align-top px-2 w-6/12">
                                    <ul className="list-inside list-none w-full">
                                        <li className="border-b border-dotted border-gray-400">{data.ptk_durasisppd ?? 1} hari</li>
                                        <li className="border-b border-dotted border-gray-400">{data.ptk_starttgl?.toLocaleDateString('id-ID', {dateStyle:'long'})}</li>
                                        <li className="border-b border-dotted border-gray-400">{data.ptk_starttgl && getEndDate(data.ptk_starttgl, data.ptk_durasisppd).toLocaleDateString('id-ID', {dateStyle:'long'})}</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-[8px] px-2">8...</td>
                                <td className="border-s border-black"></td>
                            </tr>
                        </tbody>
                    </TableWithScrolling>
                    
                </div>
                <div className="flex gap-2 place-items-center p-2 justify-items-center flex-col md:flex-row">
                    <CalendarPicker
                            id="id_tgl_surat"
                            className="col-span-2  border-2 border-sky-500 rounded-md p-2 "
                            label="Tanggal Berangkat"
                            isLimited={false}
                            currentDate={data?.ptk_starttgl ?? new Date()}
                            handleChangeDate={handleDate}
                            />
                    <div className="self-stretch flex items-center md:pt-3">
                        <div className="border-2 border-sky-500 rounded-md p-2 w-full">
                            <Field orientation="horizontal" className="gap-0 relative">
                                <div className="absolute left-0 top-0 -translate-y-5 text-xs z-100  bg-white dark:bg-gray-700 dark:text-sky-100 w-fit rounded-se-xl text-[10px]">Lama Perjalanan</div>
                                <Button type="button" onClick={handleDecrease}>-</Button>
                                <Input disabled type="number" className="text-center" value={data?.ptk_durasisppd} onChange={()=>{}}/>
                                <Button type="button" onClick={handleIncrease}>+</Button>
                            </Field>
                        </div>
                    </div>
                </div>
            </div>  
            <ModalFooterEdura>
                    {/* <button type="button" onClick={()=>nextState ? actions.open(nextState.type, nextState.payload, nextState.configModal  ):actions.close()}>Kembali</button> */}
                    <ButtonUpdateTglSPPD nextState={nextState as ModalState<DataOrmSuratKeluarType>}/>
            </ModalFooterEdura>
        </>
    )
} 
