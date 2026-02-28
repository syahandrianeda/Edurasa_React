import type { CSSProperties } from "react";
import urlImgDrive from "~/lib/url-img-drive";
import HadirIcon from '../../../images/hadir.png';
import IjinIcon from '../../../images/absen_ijin.png';
import SakitIcon from '../../../images/absen_sakit.png';
import AlpaIcon from '../../../images/absen_tidakhadir.png';
import { TdEdura } from "~/components/tabels/tabel-components";
import noProfileFound from '../../../images/noImage.png';
import { useAppSelector } from "~/context-reduct/hook";
import { AbsensiRombelAktifDTO } from "~/context-reduct/selectores/absensi-selector";
import type { AbsensiSiswaType } from "~/types/absensi-siswa";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { getParseDateDMMYYYY } from "~/lib/date-helper";
import { useModal } from "~/components/modals/modal-provider";
import OrmAbsensi from "~/domain/absensi/orm-absensi";

export default function TdImageAbsen({
    idImg,  style, kehadiran, mode,profile, refIdSheetAbsen, templateAbsen, tokenSiswa,fokusTglAbsen
}:{
    
    profile?:string,
    idImg?:string,
    mode?:string,
    kehadiran?:string,
    refIdSheetAbsen?:number
    style?:CSSProperties,
    templateAbsen:AbsensiSiswaType,
    tokenSiswa:number,
    fokusTglAbsen:Date
}){
    const dataAbsen = useAppSelector(AbsensiRombelAktifDTO);
    const siswa = useAppSelector(selectAllSiswaDTO);
    const {actions} = useModal<OrmAbsensi>();
    const clickSell = ()=>{
        if(kehadiran!==""){

            const data = dataAbsen?.data.find(s=>s.idbaris === refIdSheetAbsen);
            // const moreData = dataAbsen?.data.filter(s=>s.tokensiswa === tokenSiswa && s.id === getParseDateDMMYYYY(fokusTglAbsen));
            const dataSiswa = siswa.find(s=>s.id === tokenSiswa );
            if(data){
                // const resolveDataMultiple = moreData && moreData?.length>1?moreData[moreData?.length-1]:data;
                // actions.open('EDIT ABSEN',resolveDataMultiple,{closeOnOutsideClick:false})
                actions.open('EDIT ABSEN',data,{closeOnOutsideClick:false})

            }else{
                const dataAbsenTambah = Object.assign({}, templateAbsen, {
                    tokensiswa:dataSiswa?.id,
                    name:dataSiswa?.pd_nama,
                    kelas:dataSiswa?.nama_rombel,
                    id:getParseDateDMMYYYY(fokusTglAbsen),
                    Time_Stamp: new Date(fokusTglAbsen.getFullYear(), fokusTglAbsen.getMonth(),fokusTglAbsen.getDate(),6,30,0.0),
                    kehadiran: 'Hadir', // dianggap hadir,
                    action: ''
                })
                actions.open('TAMBAH ABSEN',dataAbsenTambah,{closeOnOutsideClick:false})
            }
        }
    }
    
    const imgDriveUrl = idImg && urlImgDrive(idImg);
    const imgProfil = profile && urlImgDrive(profile);
    const profilMode = imgDriveUrl ?? imgProfil
    
    let imgUrl :string|undefined = '';
    if(mode === 'icon'){
        if(kehadiran === 'Hadir') imgUrl = imgDriveUrl || HadirIcon;
        if(kehadiran === 'Sakit') imgUrl = imgDriveUrl || SakitIcon;
        if(kehadiran === 'Ijin') imgUrl = imgDriveUrl || IjinIcon
        if(kehadiran === 'Alpa') imgUrl = imgDriveUrl || AlpaIcon
    }

    if(mode === 'profil'){
        if(kehadiran === 'Hadir') imgUrl = profilMode || noProfileFound;//|| HadirIcon;
        if(kehadiran === 'Sakit') imgUrl = imgDriveUrl || SakitIcon;
        if(kehadiran === 'Ijin') imgUrl = imgDriveUrl || IjinIcon
        if(kehadiran === 'Alpa') imgUrl = imgDriveUrl || AlpaIcon
    }

    if(mode === 'marked'){
        if(kehadiran === 'Hadir') imgUrl = '✓';
        if(kehadiran === 'Sakit') imgUrl = 'S';
        if(kehadiran === 'Ijin') imgUrl = 'I';
        if(kehadiran === 'Alpa') imgUrl = 'A';
    }
    
    return (
        <TdEdura
            className="text-[8px]" style={style} onClick={clickSell}>
            {
                mode === 'marked' ? (
                    kehadiran && (
                        <span className={`${imgUrl !=="✓"?"bg-rose-500 text-white":""} text-[10px] font-bold px-0.5`}>
                            {imgUrl}
                        </span>
                    )
                ):(
                    <div className="flex flex-col">
                        {imgUrl!=="" && <img src={imgUrl} className="h-5 w-5 aspect-square" referrerPolicy="no-referrer"/>}
                        <span>
                            {kehadiran}
                        </span>
                    </div>
                )
            }
        </TdEdura>
    )
}