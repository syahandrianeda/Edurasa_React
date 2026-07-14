import type { dataKaldikSemester, detailPropertiHari, keteranganLabelKaldik, propertiHariDalamBulan } from "~/domain/kaldik/type-output-kaldik"
import { PreviewKaldikModalNonSetting } from "../modal-kaldik/preview-kaldik-nonsetting"
import { KeteranganKaldikNonSetting } from "../modal-kaldik/field-keterangan-nonsetting"
import { TableHariEfektif } from "./tabel-hari-efektif"

export function ViewKaldik({
    semester,
    isSabtuLibur,
    isBottomKeterangan,
    includingHariEfektif,
    dataKaldikSemester,
    totalPropertiHari,
    totalPropertiHariBelajar,
    dataPropertiHari,
    dataKeterangan
}:{
    semester:string,
    isSabtuLibur?:boolean
    isBottomKeterangan?:boolean,
    includingHariEfektif?:boolean,
    dataKaldikSemester:dataKaldikSemester[],
    totalPropertiHari:detailPropertiHari,
    totalPropertiHariBelajar:detailPropertiHari,
    dataPropertiHari:propertiHariDalamBulan[],
    dataKeterangan:keteranganLabelKaldik[]
}){
    
    if(isBottomKeterangan){
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                { 
                    dataKaldikSemester.map(({namaBulan, tahun, data, dataKeterangan},index)=>(
                        <div className="h-full flex flex-col justify-between gap-2" key={index}>
                            <PreviewKaldikModalNonSetting
                                bulan={namaBulan} 
                                tahun={tahun as number}
                                kalenderPerBulan={data}
                                isSabtuLibur={isSabtuLibur as boolean}
                                />
                            <KeteranganKaldikNonSetting 
                                label={`Keterangan bulan ${namaBulan} ${tahun}`}
                                dataKeterangan={dataKeterangan}
                            />
                        </div>
                    ))
                }
                {
                    includingHariEfektif && <div className="col-span-3 flex gap-2 overflow-x-auto scrol-h-custom">
                        <TableHariEfektif dataTotal={totalPropertiHari} caption="Jumlah Hari Efektif" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean} isHeb={false}/>
                        <TableHariEfektif dataTotal={totalPropertiHariBelajar} caption="Jumlah Hari Efektif Belajar" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean} isHeb={true}/>
                        <TableHariEfektif dataTotal={totalPropertiHariBelajar} caption="Jumlah Jam Pelajaran (1 hari @ 7 JP)" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean } isHeb={true} jp={7}/>
                    </div>
                }
            </div>
        )
    }else{
        return (
            <div className="grid md:grid-cols-4 print:grid-cols-4">
                { 
                    dataKaldikSemester.map(({namaBulan, tahun, data, dataKeterangan},index)=>(
                        <PreviewKaldikModalNonSetting
                            key={index}
                            bulan={namaBulan} 
                            tahun={tahun as number}
                            kalenderPerBulan={data}
                            isSabtuLibur={isSabtuLibur as boolean}
                            
                            />
                    ))
                }
                <div className="col-span-2 row-span-3 pt-2 flex flex-col justify-between">
                    <KeteranganKaldikNonSetting 
                            label={`Keterangan Kalender ${semester}`}
                            dataKeterangan={dataKeterangan}
                        />
                    {includingHariEfektif && (<TableHariEfektif dataTotal={totalPropertiHariBelajar} caption="Jumlah Jam Pelajaran (1 hari @ 7 JP)" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean } isHeb={true} jp={7}/>)}
                </div>
                
                {
                    includingHariEfektif && <div className="col-span-2 row-span-2  px-2 flex flex-col">
                        <TableHariEfektif dataTotal={totalPropertiHari} caption="Jumlah Hari Efektif" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean } isHeb={false}/>
                        <TableHariEfektif dataTotal={totalPropertiHariBelajar} caption="Jumlah Hari Efektif Belajar" data={dataPropertiHari} sabtuLibur={isSabtuLibur as boolean } isHeb={true}/>
                    </div>
                }
            </div>
        )
    }          
                
}