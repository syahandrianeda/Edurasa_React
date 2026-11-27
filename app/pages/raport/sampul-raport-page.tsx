import { useAppSelector } from "~/context-reduct/hook"
import { DataSiswaAktifRombel } from "~/context-reduct/selectores/data-siswa-aktif"
import HalamanSampulRaport from "./comp-sampul/halaman-depan"
import { useMemo, useState } from "react";
import type { SiswaType } from "~/types/siswa";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import ButtonPrintModal from "~/controllers/modal-cetak/control-export-print";
import ButtonExportWordModal from "~/controllers/modal-cetak/control-export-word-modal";
import { Field, FieldContent, FieldGroup } from "~/components/ui/field";
import { SelectionNavigator } from "~/components/selects/selection-navigator";
import IdentitasRaportSekolah from "./comp-sampul/identitas-raport-sekolah";
import IdentitasRaportMurid from "./comp-sampul/identitas-raport-murid";

export default function SampulRaportPage(){
    const exportRef = useExportTarget('print-area-modal') as React.Ref<HTMLDivElement>;;
    const [showTutWuri, setShowTutWuri] = useState<boolean>(false);
    const [showTtd, setShowTtd] = useState<boolean>(true)
    const [showStempel, setShowStempel] = useState<boolean>(true)
    const [showPoto, setShowPoto] = useState<boolean>(true)
    const dataSiswa = useAppSelector(DataSiswaAktifRombel);
    const [siswa, setSiswa] = useState<SiswaType|null>(dataSiswa[0]??null);
    const nisnisn = useMemo(()=>{
        const currentNis = siswa?.nis ?? '-';
        const currentNisn = siswa?.nisn ?? '-';
        const  string = currentNis +' / '+ currentNisn;
        return string
    }, [siswa])

    return (
        <div>
            <div ref={exportRef}  className="flex flex-col gap-1">
            <HalamanSampulRaport showTutWuri={showTutWuri} namaSiswa={siswa?.pd_nama ?? '-'} nisnisn={nisnisn}/>
            <IdentitasRaportSekolah/>
            <IdentitasRaportMurid showTtd={showTtd} showStempel={showStempel} showPoto={showPoto} siswa={siswa}/>
            </div>
            <div className="border sticky bottom-0 flex flex-row items-center rounded-t-xl p-2 bg-linear-to-b from-sky-300 to-sky-200 gap-2">
                <FieldGroup className="w-1/3 p-1 bg-sky-100 rounded-xl">
                    <FieldContent>
                        <Field orientation={'horizontal'} className="text-[10px] w-fit">
                            <input
                                type="checkbox"
                                checked={showTutWuri}
                                onChange={()=>setShowTutWuri(val=>!val)}
                                id="showTutWuriId"
                                />
                            <label htmlFor="showTutWuriId" className="text-nowrap">
                                Logo Tut Wuri Handayani dicetak
                            </label>
                        </Field>
                        <Field orientation={'horizontal'} className="text-[10px] w-fit">
                            <input
                                type="checkbox"
                                checked={showTtd}
                                onChange={()=>setShowTtd(val=>!val)}
                                id="showTtd"
                                />
                            <label htmlFor="showTtd" className="text-nowrap">
                                Tampilkan Ttd Kepsek
                            </label>
                        </Field>
                        <Field orientation={'horizontal'} className="text-[10px] w-fit">
                            <input
                                type="checkbox"
                                checked={showPoto}
                                onChange={()=>setShowPoto(val=>!val)}
                                id="showPoto"
                                />
                            <label htmlFor="showPoto" className="text-nowrap">
                                Tampilkan Poto Siswa
                            </label>
                        </Field>
                        <Field orientation={'horizontal'} className="text-[10px] w-fit">
                            <input
                                type="checkbox"
                                checked={showStempel}
                                onChange={()=>setShowStempel(val=>!val)}
                                id="showStempel"
                                />
                            <label htmlFor="showStempel" className="text-nowrap">
                                Tampilkan Stempel
                            </label>
                        </Field>

                    </FieldContent>
                </FieldGroup>
                <SelectionNavigator
                    options={dataSiswa?? []}
                    value={siswa}
                    getValue={(item)=>String(item?.id)}
                    getLabel={(item=>item?.pd_nama ?? '')}
                    onValueChange={setSiswa}
                />
                <ButtonPrintModal className="m-0 px-4 py-0" type="portrait"/>
                    
                
            </div>
        </div>
    )
}