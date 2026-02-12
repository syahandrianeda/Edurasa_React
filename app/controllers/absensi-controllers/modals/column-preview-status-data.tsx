import { useMemo } from "react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { defineDescriptionValueActionAbsen, KoleksiIdFileByApp, type AbsensiSiswaType, type typeActionValueAppScriptAbsen } from "~/types/absensi-siswa";

export default function ColumnPreviewStatusData(){
    const {currentData, setCurrentData} = useFormEdura<AbsensiSiswaType>();
    const currentDataLock =useMemo(()=>{
            return Object.assign({}, currentData);
        },[]);
    const isTemporaryHasShown = useMemo(()=>{
            const v = currentData?.kehadiran;
            const findAsal = KoleksiIdFileByApp.find(s=>s.typeKehadiran === v);
            const idFileFindAsal = findAsal?.idFile;
            
            if(idFileFindAsal === currentData?.fileContent){
                return false;
            }
            return true;
        },[currentData?.kehadiran,currentData?.fileContent]);
    const isFirstDataSameDefault = useMemo(()=>{
            const v = currentDataLock?.kehadiran;
            const findAsal = KoleksiIdFileByApp.find(s=>s.typeKehadiran === v);
            const idFileFindAsal = findAsal?.idFile;
            
            if(idFileFindAsal === currentDataLock?.fileContent){
                return false;
            }
            return true;
        },[]);
            
    return (
        <div className="bg-sky-400 inset-shadow-sky-100 inset-5 flex flex-col gap-1 justify-start items-stretch rounded-2xl p-2">
            <div className="rounded-2xl p-2 bg-linear-to-bl from-sky-100 to-sky-100/10">
                <table className="border-collapse leading-4 text-xs border-0 w-full">
                    <thead>
                        <TRowEdura>
                            <ThEdura colSpan={3} className="border-0 rounded-t-2xl bg-zinc-400">Data Server</ThEdura>
                        </TRowEdura>
                    </thead>
                    <tbody>
                        <TRowEdura className="even:bg-sky-100">
                            <TdEdura className="border-0">Direkam di server</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    defineDescriptionValueActionAbsen(currentDataLock.action as typeActionValueAppScriptAbsen)?'Tercatat di server':'Nihil'
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100" >
                            <TdEdura className="border-0">Status Kehadiran</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    currentDataLock?.kehadiran ==='Hadir' && currentDataLock.fileContent ===''?'Hadir (Dianggap Hadir)':currentDataLock.kehadiran
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100" >
                            <TdEdura className="border-0">Foto Eviden</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    isFirstDataSameDefault ? 'Eviden Tersedia': 'Tidak Ada Eviden (Icon saja)'
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100">
                            <TdEdura className="border-0">Tanggal</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    new Date(currentDataLock.Time_Stamp).toLocaleString('id-ID', {dateStyle:'full'})
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100"  >
                            <TdEdura className="border-0">Pukul</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    new Date(currentDataLock.Time_Stamp).toLocaleString('id-ID', {timeStyle:'short'})
                                }
                                <span> WIB</span>
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100"  >
                            <TdEdura className="border-0">Oleh</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    currentDataLock?.action ===''?'Oleh Aplikasi':defineDescriptionValueActionAbsen(currentDataLock.action as typeActionValueAppScriptAbsen)
                                }
                            </TdEdura>
                        </TRowEdura>
                    </tbody>
                </table>
            </div>
            <div className="rounded-2xl p-2 bg-linear-to-bl from-sky-100 to-sky-100/10">
                <table className="border-collapse leading-4 text-xs border-0 w-full">
                    <thead>
                        <TRowEdura>
                            <ThEdura colSpan={3} className="border-0 rounded-t-2xl bg-zinc-400">Data Perubahan</ThEdura>
                        </TRowEdura>
                    </thead>
                    <tbody>
                        <TRowEdura className="even:bg-sky-100">
                            <TdEdura className="border-0">Direkam di server</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    defineDescriptionValueActionAbsen(currentData.action as typeActionValueAppScriptAbsen)?`Tercatat (Id=${currentData?.idbaris})`:'Data Baru'
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100" >
                            <TdEdura className="border-0">Status Kehadiran</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    currentData?.kehadiran ==='Hadir' && currentData.fileContent ===''?'Hadir (Dianggap Hadir)':currentData.kehadiran
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100" >
                            <TdEdura className="border-0">Dokumen Eviden</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    isTemporaryHasShown ? 'Melampirkan file':'Tidak mengupload'
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100">
                            <TdEdura className="border-0">Tanggal</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    new Date(currentData.Time_Stamp).toLocaleString('id-ID', {dateStyle:'full'})
                                }
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100"  >
                            <TdEdura className="border-0">Pukul</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    new Date(currentData.Time_Stamp).toLocaleString('id-ID', {timeStyle:'short'})
                                }
                                <span> WIB</span>
                            </TdEdura>
                        </TRowEdura>
                        <TRowEdura className="even:bg-sky-100"  >
                            <TdEdura className="border-0">Oleh</TdEdura>
                            <TdEdura className="w-1 border-0">:</TdEdura>
                            <TdEdura className="border-0">
                                { 
                                    defineDescriptionValueActionAbsen('guruNgabsensiSiswaEdurasa')
                                }
                            </TdEdura>
                        </TRowEdura>
                    </tbody>
                </table>
            </div>
        </div>
    )
}