import { useImmer } from "use-immer";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { KoleksiIdFileByApp, 
        type AbsensiSiswaType, 
        type KoleksiIdImgKehadiran
    } from "~/types/absensi-siswa";
import { ButtonRemoveFileAbsen, UploadFileAbsen } from "../crud-provider/input-file-lampiran-absen";
import { useEffect, useMemo, type MouseEvent } from "react";
import { normalizeFileName } from "~/lib/normalized-filename";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { useCrudAbsensi } from "../crud-provider/absensi-crud-provider";
import { useAppDispatch } from "~/context-reduct/hook";
import { setloadedApi } from "~/context-reduct/global-state/loaded-slice";

export default function ColumnControlPresensi(){
    const {currentData, setCurrentData} = useFormEdura<AbsensiSiswaType>();
    
    const {actions} = useCrudAbsensi();
    const dispatch = useAppDispatch();
    const [dataTemporary, setDataTemporary] = useImmer<KoleksiIdImgKehadiran[]>(KoleksiIdFileByApp);
    
    useEffect(()=>{
        const firstKehadiran = currentData?.kehadiran;
        const findTemporary = dataTemporary.find(s=>s.typeKehadiran  === firstKehadiran);
        if(firstKehadiran){
            setDataTemporary(draft=>{
                const findIndex = draft.findIndex(s=>s.typeKehadiran === firstKehadiran);
                draft[findIndex] = {...draft[findIndex], idFile: currentData?.fileContent}
            });
        }
    },[])
    const onHandleCheck = (v:string) =>{
        const findTempory = dataTemporary.find(s=>s.typeKehadiran === v);
        setCurrentData((draft)=>{
            draft.kehadiran = v;
            draft.fileContent = findTempory?.idFile||''
        });
    };
    const uploadLampiran = async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            e.preventDefault();
            const file = e.target.files?.[0];
    
            if (!file) return;
            const currentKehadiran = currentData?.kehadiran;
            const param={
                subfolder: currentData?.kelas,
                namafile: normalizeFileName("token_"+currentData?.tokensiswa)+'_'+new Date().getTime()
            }
            
            // setLoad(true);
            dispatch(setloadedApi({
                loaded:true,
                name:'loaded_animation'
            }));
            const result =  await actions.uploadFile(file,param);
            // setLoad(false);
            
            if(result.success){
                setCurrentData(draft=>{
                    draft.fileContent = result.data.idfile
                });
                setDataTemporary(draft=>{
                    const findIndex = draft.findIndex(s=>s.typeKehadiran === currentKehadiran);
                    draft[findIndex] = {...draft[findIndex], idFile: result.data.idfile}
                });
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }
            
            // setLoad(true);
            dispatch(setloadedApi({
                loaded:false,
                name:'loaded_animation'
            }));
    };
    const isTemporaryHasShown = useMemo(()=>{
        const v = currentData?.kehadiran;
        const findAsal = KoleksiIdFileByApp.find(s=>s.typeKehadiran === v);
        const idFileFindAsal = findAsal?.idFile;
        
        if(idFileFindAsal === currentData?.fileContent){
            return false;
        }
        return true;
    },[onHandleCheck, currentData?.kehadiran,currentData?.fileContent]);

    const onRemoveHandler = (e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const currentKehadiran = currentData?.kehadiran;
        const findAsal = KoleksiIdFileByApp.find(s=>s.typeKehadiran === currentKehadiran);
        const idFileFindAsal = findAsal?.idFile;
        setCurrentData(draft=>{
                    draft.fileContent = idFileFindAsal ??''
                });
        setDataTemporary(draft=>{
            const findIndex = draft.findIndex(s=>s.typeKehadiran === currentKehadiran);
            draft[findIndex] = {...draft[findIndex], idFile: idFileFindAsal ??''}
        });
    }

    return (
        <div className="bg-sky-400 inset-shadow-sky-100 inset-5 flex flex-col gap-1 justify-start items-stretch rounded-2xl p-2">
            <div className="rounded-2xl p-1 bg-linear-to-bl from-sky-100 to-sky-100/10">
                Status kehadiran
                <div className="flex flex-col gap-1 ps-2 pe-1 py-2">
                    <div className="flex gap-1 w-full items-center text-xs has-checked:bg-sky-200 px-2 rounded-xl hover:bg-sky-100">
                        <label className="peer flex gap-2 items-center w-full my-1">
                            <input 
                                type="radio" 
                                name="temp_kehadiran" 
                                checked={currentData?.kehadiran === 'Hadir'} 
                                onChange={()=>onHandleCheck('Hadir')}
                                className="w-3 h-3 text-sky-600 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"/> Hadir
                        </label>
                        <UploadFileAbsen 
                            className="peer-has-checked:block hidden" 
                            onChangeFile={uploadLampiran}
                            kehadiran="Hadir"
                            infoInput="Upload Bukti Hadir"
                            />
                        {isTemporaryHasShown && <ButtonRemoveFileAbsen onRemove={onRemoveHandler} className="peer-has-checked:block hidden ms-auto"/>}
                    </div>
                    <div className="flex gap-1 w-full items-center text-xs has-checked:bg-sky-200 px-2 rounded-xl hover:bg-sky-100">
                        <label className="peer flex gap-2 items-center w-full my-1">
                            <input 
                                type="radio" 
                                name="temp_kehadiran" 
                                checked={currentData?.kehadiran === 'Sakit'} 
                                onChange={()=>onHandleCheck('Sakit')}
                                className="w-3 h-3 text-sky-600 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"/>
                            Sakit
                        </label>
                        <UploadFileAbsen 
                            className="peer-has-checked:block hidden" 
                            onChangeFile={uploadLampiran}
                            kehadiran="Sakit"
                            infoInput="Upload Surat Keterangan Dokter/Bukti Sakit"
                            />
                        {isTemporaryHasShown && <ButtonRemoveFileAbsen onRemove={onRemoveHandler} className="peer-has-checked:block hidden ms-auto"/>}
                    </div>
                    <div className="flex gap-1 items-center w-full text-xs has-checked:bg-sky-200 px-2 rounded-xl hover:bg-sky-100">
                        <label className="peer flex gap-2 items-center w-full my-1">
                            <input 
                                type="radio" 
                                name="temp_kehadiran" 
                                checked={currentData?.kehadiran === 'Ijin'} 
                                onChange={()=>onHandleCheck('Ijin')}
                                className="w-3 h-3 text-sky-600 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"/>
                            Ijin
                        </label>
                        <UploadFileAbsen 
                            className="peer-has-checked:block hidden" 
                            onChangeFile={uploadLampiran}
                            kehadiran="Ijin"
                            infoInput="Upload Bukti Dispensasi"
                            />
                        {isTemporaryHasShown && <ButtonRemoveFileAbsen onRemove={onRemoveHandler} className="peer-has-checked:block hidden ms-auto"/>}
                    </div>
                    <div className="flex gap-1 w-full items-center text-xs has-checked:bg-sky-200 px-2 rounded-xl hover:bg-sky-100">
                        <label className="peer flex gap-2 items-center w-full my-1">
                            <input 
                                type="radio" 
                                name="temp_kehadiran" 
                                checked={currentData?.kehadiran === 'Alpa'} 
                                onChange={()=>onHandleCheck('Alpa')}
                                className="w-3 h-3 text-sky-600 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"/>
                            Alpa
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
};
