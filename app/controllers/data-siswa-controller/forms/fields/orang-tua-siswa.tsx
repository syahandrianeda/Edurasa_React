import { Fields, InputText, SelectField } from "~/components/fields/fields";
import { CalendarPicker } from "~/components/form-custom/calendar";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import { PEKERJAAN_EDURA, PENDIDIKAN_EDURA } from "~/types/enums/dari_edura";
import type { SiswaType } from "~/types/siswa";

export function NamaAyah({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12",className)}>
            <InputText
                id="nama_ayah"
                value={currentData?.pd_namaayah??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_namaayah = v
                    })}
                }
                placeholder="Nama Ayah"
                label="Nama Ayah (Kandung)"
            />
        </Fields>
    )
}
export function NamaIbu({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="nama_ibu"
                value={currentData?.pd_namaibu??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_namaibu = v
                    })}
                }
                placeholder="Nama Ibu"
                label="Nama Ibu (Kandung)"
            />
        </Fields>
    )
}

export function NamaWali({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="nama_wali"
                value={currentData?.dapo_namawali??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_namawali = v
                    })}
                }
                placeholder="Nama Wali"
                label="Nama Wali"
            />
        </Fields>
    )
}

export function HubunganWalidanSiswa({className}:{className?:string}){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12",className)}>
            <InputText
                id="hubungan_wali_siswa"
                value={currentData?.hubunganwali??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.hubunganwali = v
                    })}
                }
                placeholder="Misal: anak tiri, anak angkat, dll"
                label="Hubungan Wali dan Siswa"
            />
        </Fields>
    )
}

export function KalendarTanggalLahirAyah(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.dapo_tahunlahirayah = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_dapo_tahunlahirayah"
            label="Tanggal Lahir Ayah"
            className="w-10/12"
            currentDate={currentData?.dapo_tahunlahirayah ??""}
            handleChangeDate={handleDate}/>
            
    )

}
export function KalendarTanggalLahirIbu(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.dapo_tahunlahiribu = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_dapo_tahunlahiribu"
            label="Tanggal Lahir Ibu"
            className="w-10/12"
            currentDate={currentData?.dapo_tahunlahiribu ??""}
            handleChangeDate={handleDate}/>
            
    )
}
export function KalendarTanggalLahirWali(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.dapo_tahunlahirwali = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_dapo_tahunlahirwali"
            label="Tanggal Lahir Wali"
            className="w-10/12"
            currentDate={currentData?.dapo_tahunlahirwali ??""}
            handleChangeDate={handleDate}/>
            
    )
}
export function NoNIKAyah({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="no_nikayah"
                value={currentData?.dapo_nikayah??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_nikayah = v
                    })}
                }
                placeholder="NIK Ayah"
                label="NIK Ayah"
            />
        </Fields>
    )
}

export function NoNIKIbu({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="no_nikibu"
                value={currentData?.dapo_nikibu??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_nikibu= v
                    })}
                }
                placeholder="NIK Ibu"
                label="NIK Ibu"
            />
        </Fields>
    )
}

export function NoNIKWali({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="no_nikwali"
                value={currentData?.dapo_nikwali??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_nikwali= v
                    })}
                }
                placeholder="NIK Wali"
                label="NIK Wali"
            />
        </Fields>
    )
}


export function SelectPekerjaanAyah({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField 
                id='dapo_pekerjaanayah'
                value={currentData?.dapo_pekerjaanayah ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_pekerjaanayah = e.target.value ;
                        })
                    } 
                labelSelect="Pekerjaan Ayah"
            >
                {
                    PEKERJAAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
export function SelectPekerjaanIbu({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField 
                id='dapo_pekerjaanibu'
                value={currentData?.dapo_pekerjaanibu ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_pekerjaanibu = e.target.value ;
                        })
                    } 
                labelSelect="Pekerjaan Ibu"
            >
                {
                    PEKERJAAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
export function SelectPekerjaanWali({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField 
                id='dapo_pekerjaanwali'
                value={currentData?.dapo_pekerjaanwali ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_pekerjaanwali = e.target.value ;
                        })
                    } 
                labelSelect="Pekerjaan Wali"
            >
                {
                    PEKERJAAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
export function SelectPendidikanAyah({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField 
                id='dapo_jenjangpendidikanayah'
                value={currentData?.dapo_jenjangpendidikanayah ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenjangpendidikanayah = e.target.value ;
                        })
                    } 
                labelSelect="Pendidikan Terakhir"
            >
                {
                    PENDIDIKAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

export function SelectPendidikanIbu({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField 
                id='dapo_jenjangpendidikanibu'
                value={currentData?.dapo_jenjangpendidikanibu ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenjangpendidikanibu = e.target.value ;
                        })
                    } 
                labelSelect="Pendidikan Terakhir"
            >
                {
                    PENDIDIKAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}


export function SelectPendidikanWali({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className={cn("mt-2 mb-0 w-10/12",className)}>
            <SelectField 
                id='dapo_jenjangpendidikanwali'
                value={currentData?.dapo_jenjangpendidikanwali ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenjangpendidikanwali = e.target.value ;
                        })
                    } 
                labelSelect="Pendidikan Terakhir"
            >
                {
                    PENDIDIKAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

