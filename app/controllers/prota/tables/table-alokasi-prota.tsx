import { useImmer } from "use-immer";
import { useCallback, useMemo, useEffect } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataAtpAsProtaEditable, ItemAtpAsProtaEditable, protaSheet } from "~/types/kurikulum/prota-orm";
import { InputText } from "~/components/fields/fields";
import BtnSaveProta from "../crud/btn-save-prota";
import { useCrudProtaProvider } from "../crud/crud-prota-provider";
import StatusModifikasi from "./tag-modified";
import { useAppDispatch } from "~/context-reduct/hook";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";
import { setDataProta } from "~/context-reduct/global-state/prota/prota-slice";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";

export default function TableAlokasiWaktuProta({prota}:{prota:DataAtpAsProtaEditable}){
    const {data, total_in_year,protaServer, rombel, kodemapel:mapel} = prota;
    const dispatch = useAppDispatch();
    const {state, actions} = useCrudProtaProvider();
    const [dataEditable, setDataEditable] = useImmer<ItemAtpAsProtaEditable[]>([]);

    // helper: set index_prota for all items according to current order
    const refreshIndexProta = useCallback(() => {
        setDataEditable(draft => {
            for (let i = 0; i < draft.length; i++) {
                draft[i].index_prota = i + 1;
            }
        });
    }, [setDataEditable]);
    
    // Sinkronisasi state lokal jika data dari props (parent) berubah
    useEffect(() => {
        setDataEditable(data);
    }, [data, setDataEditable]);

    
    const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = Number(e.target.value);
        
        setDataEditable((draft) => {
            const item = draft[index];
            const original = data[index];
            if (item && original) {
                item.alokasi = newValue;

                const isChanged = item.alokasi !== original.alokasi || 
                                item.semester.length !== original.semester.length ||
                                !item.semester.every(s => original.semester.includes(s));
                
                item.state_modify = isChanged ? 'modify' : original.state_modify;
            }
        });
    }, [data, setDataEditable]);

    const changeCheckbox = useCallback((index: number, semesterValue: number) => {
        setDataEditable((draft) => {
            const item = draft[index];
            const original = data[index];
            if (item && original) {
                const currentSemesters = item.semester;
                const valueIndex = currentSemesters.indexOf(semesterValue);

                if (valueIndex > -1) {
                    // Jika sudah ada, hapus (uncheck)
                    currentSemesters.splice(valueIndex, 1);
                } else {
                    // Jika belum ada, tambah (check)
                    currentSemesters.push(semesterValue);
                    currentSemesters.sort(); // Urutkan agar konsisten [1, 2]
                }

                const isChanged = item.alokasi !== original.alokasi || 
                                    item.semester.length !== original.semester.length ||
                                    !item.semester.every(s => original.semester.includes(s));
                
                item.state_modify = isChanged ? 'modify' : original.state_modify;
            }
        });
    }, [data, setDataEditable]);

    const moveUp = useCallback((index: number) => {
        if (index <= 0) return;
        setDataEditable(draft => {
            const tmp = draft[index - 1];
            draft[index - 1] = draft[index];
            draft[index] = tmp;
            // update index_prota after reorder
            for (let i = 0; i < draft.length; i++) draft[i].index_prota = i + 1;
        });
    }, [setDataEditable]);

    const moveDown = useCallback((index: number) => {
        setDataEditable(draft => {
            if (index < 0 || index >= draft.length - 1) return;
            const tmp = draft[index + 1];
            draft[index + 1] = draft[index];
            draft[index] = tmp;
            // update index_prota after reorder
            for (let i = 0; i < draft.length; i++) draft[i].index_prota = i + 1;
        });
    }, [setDataEditable]);

    const totalJP = useMemo(() => {
        return dataEditable.reduce((sum, item) => sum + (item.alokasi || 0), 0);
    }, [dataEditable]);

    const warning = useMemo(()=>{
        return totalJP > total_in_year
    },[totalJP, total_in_year])

    const onSubmit = async () =>{

        /** ambil protaServer untuk rombel ini saja, termasuk yang memiliki properti 'hapus' */
        const protaMapelRombel = protaServer.filter(s=>s.rombel === rombel && s.kode_mapel === mapel)
        /** cek apakah banyak data protaServer dengan dataEditable */
        const refCount = Math.max(protaMapelRombel.length, dataEditable.length);
        /** siapkan data untuk dikirim a.k.a body */
        const dataToSend: protaSheet[] = [
            ...dataEditable.map((item, idx) => ({
                idbaris: item.idbaris_server||0,
                rombel: rombel,
                kode_mapel: mapel,
                atp_idbaris: item.atp_as_tp_id,
                alokasi_waktu: item.alokasi,
                semester: item.semester.join(', '),
                status: '',
                cp_idbaris: item.cp_id ?? 0,
                tp_idbaris: item.tp_as_cp_id ?? 0,
                index_prota:  item.index_prota ?? (idx + 1),
                refrensi:  '',
                // alokasi:0,


            })),
            ...protaMapelRombel
                .filter((serverItem) => !dataEditable.some((editItem) => editItem.atp_as_tp_id === serverItem.atp_idbaris))
                .map((serverItem) => ({
                    ...serverItem,
                    idbaris: serverItem.idbaris,
                    rombel: serverItem.rombel,
                    kode_mapel: serverItem.kode_mapel,
                    atp_idbaris: serverItem.atp_idbaris,
                    alokasi_waktu: serverItem.alokasi_waktu,
                    semester: Array.isArray(serverItem.semester) ? serverItem.semester.join(', ') : String(serverItem.semester),
                    status: 'hapus',
                })),
        ];
        
        dispatch(setloadedApi({ loaded: true }));
        const respon = await actions.update(dataToSend);
        if (respon.success) {
            const raw = respon.data as protaSheet[];
            dispatch(setDataProta(raw));
            ShowToasterSuccess('Berhasil diupdate');
        } else {
            ShowToasterError('Gagal diupdate');
        }
        dispatch(setloadedApi({ loaded: false }));
    }
    
    return (
        <TableWithScrolling className="w-full print:w-10/12 mx-auto">
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2} className="w-1">No</ThEdura>
                    <ThEdura rowSpan={2}>Tujuan Pembelajaran</ThEdura>
                    <ThEdura rowSpan={2} className="text-wrap">Alokasi Waktu (JP)</ThEdura>
                    <ThEdura colSpan={4}className="text-wrap print:hidden bg-sky-300">Setting untuk Prosem (UNPRINTED)</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura className="print:hidden bg-sky-300">Up/Down</ThEdura>
                    <ThEdura className="print:hidden bg-sky-300">Edit JP</ThEdura>
                    <ThEdura className="print:hidden bg-sky-300">Semester</ThEdura>
                    <ThEdura className="print:hidden bg-sky-300">Status</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    dataEditable.map((data,index)=>
                        <TRowEdura key={index}>
                            <TdEdura className={"text-center align-middle"}>{index+1}.</TdEdura>
                            <TdEdura className="text-wrap align-middle first-letter:uppercase">{data.atp_as_tp_description}</TdEdura>
                            <TdEdura className="text-center align-middle">{data.alokasi}</TdEdura>
                            <TdEdura className="text-center print:hidden bg-sky-100">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={()=> moveUp(index)}
                                            disabled={state.isSubmitting || index === 0}
                                            className="px-2 py-1 rounded bg-transparent hover:bg-gray-200 disabled:opacity-50"
                                            title="Move up"
                                        >
                                            ▲
                                        </button>
                                        <button
                                            type="button"
                                            onClick={()=> moveDown(index)}
                                            disabled={state.isSubmitting || index === dataEditable.length - 1}
                                            className="px-2 py-1 rounded bg-transparent hover:bg-gray-200 disabled:opacity-50"
                                            title="Move down"
                                        >
                                            ▼
                                        </button>
                                    </div>
                                    {/* <div className="text-xs">#{data.index_prota ?? (index+1)}</div> */}
                                </div>
                            </TdEdura>
                            <TdEdura className="print:hidden bg-sky-100">
                                <InputText label=""
                                    type="number"
                                    min={1}
                                    value={data.alokasi}
                                    disabled={state.isSubmitting}
                                    className="text-center py-0 w-16 bg-transparent"
                                    onChange={(e)=>changeInput(e,index)}/>
                            </TdEdura>
                            <TdEdura className="print:hidden bg-sky-100">
                                <div className="flex flex-col gap-1">
                                    <label className="flex items-center gap-1 cursor-pointer text-xs has-checked:text-purple-600 has-checked:font-semibold">
                                        <input 
                                            type="checkbox" 
                                            onChange={() => changeCheckbox(index, 1)} 
                                            checked={data.semester.includes(1)}
                                            disabled={state.isSubmitting}
                                        /> Semester 1
                                    </label>
                                    <label className="flex items-center gap-1 cursor-pointer text-xs has-checked:text-blue-600 has-checked:font-semibold">
                                        <input 
                                            type="checkbox" 
                                            onChange={() => changeCheckbox(index, 2)} 
                                            checked={data.semester.includes(2)}
                                            disabled={state.isSubmitting}
                                        /> Semester 2
                                    </label>
                                </div>
                            </TdEdura>
                            <TdEdura className="print:hidden bg-sky-100">
                                <StatusModifikasi status={data.state_modify}/>
                            </TdEdura>
                        </TRowEdura>
                    )
                            
                }
            </tbody>
            <tfoot>
                <TRowEdura>
                    <ThEdura colSpan={2}>Jumlah JP</ThEdura>
                    <ThEdura>{totalJP}</ThEdura>
                    <ThEdura colSpan={4} className="print:hidden py-3 text-wrap text-center bg-sky-300 text-rose-500 capitalize first-letter:uppercase">
                        {
                            warning ? (<p>
                                Jumlah JP yang diatur melebih JP yang tersedia (JP dalam satu tahun = {total_in_year} JP)
                                
                            </p>):
                            (
                                dataEditable.length>0 && <BtnSaveProta 
                                    // dataSetter={dataEditable} 
                                    // dataAsal={data}
                                    // dataServer={protaServer}
                                    onClikButton={onSubmit}
                                    isSubmitting={state.isSubmitting}
                                    />
                            
                            )
                        }
                    </ThEdura>
                </TRowEdura>
            </tfoot>
        </TableWithScrolling>
    )
}