import { Fields, InputText } from "~/components/fields/fields";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { cn } from "~/lib/utils";
import type { SiswaType } from "~/types/siswa";

export function AlamatJalan({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 md:w-10/12 mx-auto",className)}>
            <InputText
                id="pd_alamat"
                value={currentData?.pd_alamat??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_alamat = v.toUpperCase()
                    })}
                }
                placeholder="Alamat Jalan"
                label="Alamat Jalan"
            />
        </Fields>
    )
}

export function AlamatDusun({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="dapo_dusun"
                value={currentData?.dapo_dusun??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_dusun = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Dusun"
                label="Dusun / Kompleks"
            />
        </Fields>
    )
}
export function AlamatKelurahan({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="dapo_kelurahan"
                value={currentData?.dapo_kelurahan??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_kelurahan = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kelurahan/Desa"
                label="Kelurahan/Desa"
            />
        </Fields>
    )
}

export function AlamatKecamatan({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="dapo_kecamatan"
                value={currentData?.dapo_kecamatan??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_kecamatan = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kecamatan"
                label="Kecamatan"
            />
        </Fields>
    )
}

export function AlamatKota({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="dapo_kota"
                value={currentData?.dapo_kota??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_kota = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kabupten/Kota"
                label="Kabupten/Kota"
            />
        </Fields>
    )
}

export function AlamatProvinsi({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-10/12 mx-auto",className)}>
            <InputText
                id="dapo_provinsi"
                value={currentData?.dapo_provinsi??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_provinsi = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Provinsi"
                label="Provinsi"
            />
        </Fields>
    )
}

export function AlamatRT({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-2/12 mx-auto",className)}>
            <InputText
                id="dapo_rt"
                value={currentData?.dapo_rt??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_rt = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="RT"
                label="RT"
            />
        </Fields>
    )
}

export function AlamatRW({className}:{className?:string}){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className={cn("mt-3 w-2/12 mx-auto",className)}>
            <InputText
                id="dapo_rw"
                value={currentData?.dapo_rw??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_rw = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="RW"
                label="RW"
            />
        </Fields>
    )
}
