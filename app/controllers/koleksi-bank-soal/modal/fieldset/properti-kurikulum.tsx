import { useEffect, useMemo, useState} from 'react';
import { useFormEdura } from "~/components/form-custom/form-edura";
import { type BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import MetaDataSoalKurikulumModal from "../../views/meta-data-soal-kurikulum-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAppSelector } from '~/context-reduct/hook';
import { OrmPromesInstanceSelector } from '~/context-reduct/selectores/orm-promes-selector';

export default function PropertiesKurikulum(){
    const Prota = useAppSelector(OrmPromesInstanceSelector);
    const {currentData, setCurrentData} = useFormEdura<BankSoalAppType>();
    const [selectedAtpId, setSelectedAtpId] = useState<string>(currentData.snapshot_kurikulum?.atp_as_tp_id?.toString() ?? '')
    const [kelas, setKelas] = useState<number>(currentData.jenjang_khusus);
    const koleksiJenjang = useMemo(()=>{
        
        if([1, 2].includes(currentData.jenjang_khusus)){
            return [ 1, 2]
        }else if([3, 4].includes(currentData.jenjang_khusus)){
            return [3, 4]
        }else{
            return [5, 6]
        }
    },[]);

    const promes = useMemo(()=>{
        
        return Prota?.data.filter(s=>s.kodemapel === currentData.kode_mapel && s.kelas.includes(kelas));
    }, [kelas, Prota]);
    
    const handleSelectjenjang = (v:string)=>{
        setKelas(Number(v));
    }
    
    const handleSelectKurikulum = (v:string )=>{
            if(!v) return;
            setSelectedAtpId(v);
    }



    useEffect(()=>{
        
        setCurrentData(draft=>{
            const number = Number(selectedAtpId)
            const found = promes?.find(s=>s.atp_as_tp_id === number)
            draft.snapshot_kurikulum = found
        })
    },[selectedAtpId, promes]);

    
    return (
        <div className="text-xs">
            <div className="bg-white font-bold text-center">{currentData.mapel_name}</div>
            <div className='relative mt-4'>
                <div className='ps-1 pe-4 absolute text-[10px] -top-1 -translate-y-1/2 w-fit rounded-tr-2xl bg-sky-200'>Pilih Kelas</div>
                <Select
                    value={kelas.toString()}
                    onValueChange={handleSelectjenjang}
                    >
                    <SelectTrigger className='w-full bg-sky-200'>
                        <SelectValue placeholder="Ubah Kelas"/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            koleksiJenjang.map((jenjang, iJenjang)=>
                                <SelectItem  className='text-[10px]' key={iJenjang} value={jenjang.toString()}>{jenjang}</SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className='relative mt-4'>
                <div className='ps-1 pe-4 absolute text-[10px] -top-1 -translate-y-1/2 w-fit rounded-tr-2xl bg-sky-200'>Pilih Atp</div>
                <Select
                    value={selectedAtpId ??''}
                    onValueChange={handleSelectKurikulum}
                    // onValueChange={handleSelectSiswa}
                >
                    <SelectTrigger className='w-full bg-sky-200 text-[10px]'>
                        <SelectValue placeholder={"Edit Properti Kurikulum"}/>
                    </SelectTrigger>
                    
                    <SelectContent>
                        {
                            (promes && promes.length) && (
                                promes.map((m, i)=>
                                    <SelectItem  value={m.atp_as_tp_id.toString()!} key={m.atp_as_tp_id}>{m.atp_as_tp_description}</SelectItem>
                                )
                            )
                        }
                    </SelectContent>
                </Select>
            </div>
            <div className="bg-sky-200 ps-1 pe-4 rounded-tr-2xl mt-4 w-fit">Properti Kurikulum</div>
            <div className=' max-h-58 overflow-y-auto scrol-h-custom bg-sky-200'>
                {
                    promes?.length === 0 && <div className='bg-rose-200'>Periksa Kurikulum, tidak ada Kurikulum terlacak untuk mapel ini</div>
                }
                <MetaDataSoalKurikulumModal/>
            </div>
        </div>
    )
}