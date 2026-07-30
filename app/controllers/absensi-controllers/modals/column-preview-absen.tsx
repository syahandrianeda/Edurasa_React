import { useFormEdura } from "~/components/form-custom/form-edura";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { ImageProfileOrAbsen } from "./image-profile-or-absen";
import type { AbsensiSiswaType } from "~/types/absensi-siswa";
import ButtonSetAsProfile from "../crud-provider/send-update-poto-profile";
import type { ModalType } from "~/components/modals/modal-type";

export default function PreviewGambar({type}:{type?:ModalType}){
    const {currentData } = useFormEdura<AbsensiSiswaType>();
    const siswas = useAppSelector(selectAllSiswaDTO);
    const tokensiswa = currentData?.tokensiswa// (currentData as unknown as {tokensiswa:number})?.tokensiswa;
    const currentSiswa = siswas.find(s=>s.id === tokensiswa);
    const idProfil = currentSiswa?.koleksi_potoinduk;
    
    
    if(type==='TAMBAH ABSEN'){

        return (
            <div className="bg-sky-400 flex flex-col gap-1 justify-around items-stretch rounded-2xl p-1">
                <div className="rounded-2xl w-full h-full bg-linear-to-t from-sky-100 to-sky-100/5 flex flex-col justify-center  border-b-2 text-center  mx-auto overflow-hidden">
                    <ImageProfileOrAbsen idProfil={(currentData as unknown as AbsensiSiswaType )?.fileContent|| ''}/>
                    <div className="flex flex-col justify-center items-center pb-2">
                        <span>Poto Absen {(currentData as unknown as AbsensiSiswaType )?.kehadiran}</span> 
                        <ButtonSetAsProfile siswa={currentSiswa} data={(currentData as unknown as AbsensiSiswaType )}/>
                    </div>
                </div>
                <div className="text-center h-full flex flex-col justify-center items-center w-full bg-linear-to-b from-sky-100 to-sky-100/5 border-t-2 rounded-xl">
                    <ImageProfileOrAbsen idProfil={ idProfil || ''}/>
                    <span>Poto Profil</span>
                </div>
            </div>
        );
    };

    return (
            <div className="bg-sky-400 flex flex-col justify-self-stretch gap-1 items-center rounded-2xl p-1">
                <div className="rounded-2xl w-full h-full bg-linear-to-t from-sky-100 to-sky-100/5 flex flex-col justify-center  border-b-2 text-center  mx-auto overflow-hidden">
                    <ImageProfileOrAbsen idProfil={(currentData as unknown as AbsensiSiswaType )?.fileContent|| ''}/>
                    <div className="flex gap-0 flex-col  justify-center items-center pb-2">
                        <span>Poto Absen {(currentData as unknown as AbsensiSiswaType )?.kehadiran}</span> 
                            <ButtonSetAsProfile siswa={currentSiswa} data={(currentData as unknown as AbsensiSiswaType )}/>
                    </div>
                </div>
                <div className="text-center h-full flex flex-col justify-center items-center w-full bg-linear-to-b from-sky-100 to-sky-100/5 border-t-2 rounded-xl">
                    <ImageProfileOrAbsen idProfil={ idProfil||''}/>
                    <span>Poto Profil</span>
                </div>
            </div>
        )
};