import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { useImmer } from "use-immer";
import type { UserPtk } from "~/types";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Progress } from "~/components/ui/progress";
import { Loader, Upload } from "lucide-react";
import UploadImageServiceCommon, { type OptionSkemaFolderUpload } from "~/infrastructures/services/upload-image-commons";
import { normalizeFileName } from "~/lib/normalized-filename";
import type { paramUpdateUserService } from "~/domain/interfaces/user-update-param";
import UserServiceImplements from "~/infrastructures/services/user-service-implements";
import DTOUser from "~/dtos/dto-user";
import type { AkunSheet } from "~/types/akun-sheet";
import { saveSessionApp } from "~/infrastructures/session-storage/app-session";
import { setCredentials } from "~/context-reduct/global-state/auth-slice";
import { setFokusRombel } from "~/context-reduct/global-state/fokus-rombel-slice";
import { isImageFileType } from "~/domain/image/file-uploader";
import { saveSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";



export default function ProfileUser(){
    const user = useAppSelector(state=> state.auth).user;
    const dispatch = useAppDispatch();
    const [dataAkun, setDataAkun] = useImmer<UserPtk|null>(user);
    const [disabled, setDisabled] = useState<boolean>(false);

    const onChangeInputText = (v:any, key:keyof UserPtk)=>{
        setDataAkun(draft=>{
            if(!draft) return;
            draft[key] = v;
        })
    }
    
    const handleSubmit = async ()=>{
        if(!dataAkun) return;
    
        const {passed, messages}=validateUpdate(dataAkun)
    
        if(!passed){
            const text = messages.join(`\r\n`)
            alert (text)
            return;
        }
        
        const { id, name, nip,  jabatan, kode_mapel_ampu, kepsek_name, kepsek_nip, avatar, kelas_ampu, } = dataAkun;
        const normalizeAvatar = avatar?.replace('https://lh3.googleusercontent.com/d/','');
        const normalizeKelasAmpu = kelas_ampu.join(',');
        const kode_mapel_or_rombel = jabatan==='Guru Kelas'?kelas_ampu[0]:kode_mapel_ampu;
        const jenjang = jabatan === 'Guru Kelas'?getNumberFromString(kelas_ampu[0]):kode_mapel_ampu;
        const paramService:paramUpdateUserService={ data:{
                                                        id,
                                                        jenjang,
                                                        guru_namalengkap:name, 
                                                        guru_nip:nip,  
                                                        gurukelas_gmp:jabatan, 
                                                        kelas:kode_mapel_or_rombel, 
                                                        kepsek_namalengkap:kepsek_name, 
                                                        kepsek_nip:kepsek_nip,
                                                        idpoto_potoguru:normalizeAvatar, 
                                                        kelasampu:normalizeKelasAmpu,
                                                        action:''
                                                    }
                                                };
        
        const service = new UserServiceImplements();
        setDisabled(true);
        const response = await service.update(paramService);
        
        if(response.success){
            const currentData = DTOUser.fromResponAkun(response?.data as AkunSheet);
            
                saveSessionApp(currentData);
                saveSessionRombel(currentData.kelas_ampu[0]);
                dispatch( setCredentials({
                                user: currentData,
                                name:'auth',
                                loaded:true
                            })
                        );
                        
                dispatch( setFokusRombel({
                            value: currentData.kelas_ampu[0],
                            name:'fokusRombel',
                            loaded:true
                        })
                );
        }
        setDisabled(false);
    }
    
    return (
        <div className="p-1" data-word="img">
            <h3 className="text-2xl font-extrabold text-center">PROFIL GURU</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 border m-2 rounded-2xl border-dotted shadow-2xl">
                <AvatarComponent disable={disabled} user_name={dataAkun?.name ?? 'Avatar'} k="avatar" value={dataAkun?.avatar ?? ''} setValue={onChangeInputText}/>
                <div className="border col-span-1 md:col-span-3 rounded px-2 m-1 grid md:grid-cols-12 space-y-2">
                    <div className="col-span-12 md:col-span-4 font-bold">Nama :</div>
                    <div className="border-b col-span-12 md:col-span-8"><InputTextAkun k="name" value={dataAkun?.name ?? ''} setValue={onChangeInputText}/></div>
                    <div className="col-span-12 md:col-span-4 font-bold">NIP :</div>
                    <div className="border-b col-span-12 md:col-span-8 flex gap-2"> <InputTextAkun k="nip" value={dataAkun?.nip ?? ''} setValue={onChangeInputText}/></div>
                    {
                        user?.jabatan !== 'admin' && (
                            <>
                                <div className="col-span-12 md:col-span-4 font-bold">Jabatan :</div>
                                <div className="border-b col-span-12 md:col-span-8 flex gap-2">: <SelectJabatan k="jabatan" value={dataAkun?.jabatan ?? ''} setValue={onChangeInputText}/></div>
                            </>
                        )
                    }

                    {
                        user?.jabatan === 'Guru Mapel' && (
                            <>
                                <div className="col-span-12 md:col-span-4 font-bold">Mata Pelajaran</div>
                                <div className="border-b  col-span-12 md:col-span-8 flex gap-2">: <SelectMapel k="kode_mapel_ampu" value={dataAkun?.kode_mapel_ampu ?? ''} setValue={onChangeInputText}/></div>
                            </>
                        )
                    }
                    <div className="col-span-12 md:col-span-4 font-bold">Mengelola Kelas/Rombel</div>
                    
                    <div className="border-b col-span-12 md:col-span-8 grid grid-rows-2 grid-flow-col">
                        <CheckBoxRombel field="kelas_ampu" value={dataAkun?.kelas_ampu ?? []} setValue={onChangeInputText}/>
                    </div>
                    {
                        user?.jabatan !== 'Kepala Sekolah' && (
                            <>
                                <div className="col-span-12 md:col-span-4  font-bold">Nama Kepala Sekolah :</div>
                                <div className="border-b col-span-12 md:col-span-8 flex gap-2"> <InputTextAkun k="kepsek_name" value={dataAkun?.kepsek_name ?? ''} setValue={onChangeInputText}/></div>
                                <div className="col-span-12 md:col-span-4 font-bold">NIP Kepala Sekolah :</div>
                                <div className="border-b col-span-12 md:col-span-8 flex gap-2"><InputTextAkun k="kepsek_nip" value={dataAkun?.kepsek_nip ?? ''} setValue={onChangeInputText}/></div>
                            </>
                        )
                    }
                </div>
                <div className="border-2 print:hidden py-3 mx-2 rounded-2xl col-span-12 mt-7 mb-4 flex justify-center items-center">
                    {   !disabled ? 
                        <ButtonSaveAwesome labelButton="Simpan" className="px-2 py-0" onClick={handleSubmit}/>
                        :<Loader size={15} className="animate-spin self-center"/>
                        }
                </div>  
            </div>
        </div>
    )
}
function validateUpdate(data:UserPtk):{passed:boolean, messages:string[]}{
    let passed:boolean = true;
    let messages:string[]=[]
    
    if(data.name === '') passed = false, messages.push('Nama User tidak boleh kosong');
    if(data.jabatan === '') passed = false, messages.push('Nama Jabatan tidak boleh kosong');;
    if(data.kepsek_name === '') passed = false, messages.push('Nama Kepsek tidak boleh kosong');;
    if(data.kelas_ampu.length === 0) passed = false, messages.push('Kelas yang dikelola ga boleh kosong');;
    if(data.jabatan === 'Guru Kelas' && data.kelas_ampu.length !== 1) passed = false, messages.push('Guru Kelas harus punya 1 rombel');;
    if(data.jabatan === 'Guru Kelas' && data.kelas_ampu.length === 1 && data.kelas_ampu[0]==='') passed = false, messages.push('Guru Kelas harus punya 1 rombel');;
    return {passed, messages}
}
function InputTextAkun({value, k, setValue}:{value:string, k:keyof UserPtk, setValue:(s:string, k:keyof UserPtk)=>void}){
    return (
        <label className="w-full">
            <input type="text" className="w-full focus-within:border-0 focus-visible:outline-none" value={value} onChange={(e)=>setValue(e.currentTarget.value, k)}/>
        </label>
    )
}

function SelectJabatan({value, k, setValue}:{value:string, k:keyof UserPtk, setValue:(s:string, k:keyof UserPtk)=>void}){
    
    return (
        <>
            <select 
                value={value}
                onChange={(e)=>setValue(e.currentTarget.value, k)}
                className="focus-within:border-0 focus-visible:outline-none w-full"
                >
                    <option value="">Pilih Jabatan</option>
                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                    <option value="Guru Kelas">Guru Kelas</option>
                    <option value="Guru Mapel">Guru Mapel</option>
                    <option value="Operator Sekolah">Operator Sekolah</option>
                </select>
        </>
    )
}

function SelectMapel({value, k, setValue}:{value:string, k:keyof UserPtk, setValue:(s:string, k:keyof UserPtk)=>void}){
    
    return (
        <>
            <select 
                value={value}
                onChange={(e)=>setValue(e.currentTarget.value, k)}
                className="focus-within:border-0 focus-visible:outline-none w-full"
                >
                    {
                        KoleksiMapel.map((opt, i)=>
                            <option key={opt.id} value={opt.kode}>{opt.nama}</option>
                        )
                    }
                </select>
        </>
    )
}

interface CheckBoxRombelProps {
    value: string[];
    field: keyof UserPtk;
    setValue: (value: string[], field: keyof UserPtk) => void;
}
interface RadioRombelProps {
    value: string;
    field: keyof UserPtk;
    setValue: (value: string, field: keyof UserPtk) => void;
}

function CheckBoxRombel({
    value,
    field,
    setValue,
}: CheckBoxRombelProps) {

    const handleCheckbox = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { checked, value: rombel } = e.target;

            const nextValue = checked
                ? [...new Set([...value, rombel])]
                : value.filter((item) => item !== rombel);

            setValue(nextValue, field);
            
        },
        [value, field, setValue]
    );

    return (
        <div className="col-span-8 grid grid-flow-col grid-rows-2 border-b">
            {DataRombelUI.filter((item) => item.active).map((item) => (
                <label
                    key={item.id}
                    className="m-1 rounded-lg border px-1 py-0 text-center has-checked:bg-green-300"
                >
                    {item.rombelName}
                    <input
                        type="checkbox"
                        className="hidden"
                        name="rombel"
                        value={item.rombelName}
                        checked={value.includes(item.rombelName)}
                        onChange={handleCheckbox}
                    />
                </label>
            ))}
        </div>
    );
}
    
function AvatarComponent({disable, user_name, value, k, setValue}:{disable:boolean, user_name:string, value:string, k:keyof UserPtk, setValue:(s:string, k:keyof UserPtk)=>void}){
    const [prosesBar, setProsesBar] = useState<number>(0);
    const [gambarSiap, setGambarSiap] = useState<string>('')
    
    const nama = normalizeFileName(user_name);
    //contoh id gambar cing bad: 1MfIY4T8Hd5fkKADeoasbTugwTYqfGGFU
    // https://lh3.googleusercontent.com/d/1MfIY4T8Hd5fkKADeoasbTugwTYqfGGFU
    const OptionGambar:OptionSkemaFolderUpload = {
        folder:'DOKUMEN_GURU_EDURA',
        subfolder: nama.toUpperCase(),
        namafile:'avatar_'+nama+'_'+new Date().getTime()
    }
    const onProsesUpload = async ( e: React.ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
        if(!isImageFileType(file)) {
            alert('harus berupa gambar');
        }
        try{
            
            const result = await UploadImageServiceCommon(file,  OptionGambar, (v:number)=>{
                setProsesBar(v);
            } );
            if(result){
                setProsesBar(0);
                setValue(result,k);
            }
            
        }catch(er){
            setProsesBar(0)
        }finally{
            setProsesBar(0);
            setGambarSiap('Poto Profil siap diupdate setelah klik Simpan')
        }


    }
    useEffect(( )=>{
        if(disable){
            setGambarSiap('')
        }
    },[disable])
    return (
        <div className="col-span-12 md:col-span-1 m-1 flex justify-start gap-2 items-start pt-2 px-3 flex-col">
            <img src={value} className="aspect-square mask-cover mx-auto border-2 border-sky-400 rounded-2xl max-h-32" referrerPolicy="no-referrer"/>
                {
                    prosesBar !== 0 &&  (
                        <div className="flex flex-col gap-0 w-full text-xs">
                            <Progress value={prosesBar} className="h-1 max-w-sm"/>
                            <div className="flex justify-between">
                                <Loader size={12} className="animate-spin self-center"/>
                                <span>Proses Upload</span>
                                <span> {prosesBar}%</span>
                            </div>
                        </div>
                    )
                }
            <label className="border w-fit items-center text-base mx-auto flex justify-center gap-[0.5em] rounded-full bg-sky-700 px-[2em] py-0 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]">
                <Upload size={12} className="font-extrabold"/>Upload
                <input type="file" className="hidden" accept="image/*" onChange={onProsesUpload}/>

            </label>
            <span className="text-[8px]">{gambarSiap}</span>
            {/* <FileInputPoto/> */}
        </div>
    )
}