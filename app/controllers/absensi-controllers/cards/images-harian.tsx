import { useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { AbsensiRombelAktifDTO } from "~/context-reduct/selectores/absensi-selector";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import type OrmAbsensi from "~/domain/absensi/orm-absensi";
import type { dataAbsenToday } from "~/domain/absensi/orm-absensi-type";
import { getParseDateDMMYYYY } from "~/lib/date-helper";
import urlImgDrive from "~/lib/url-img-drive";
import noProfileFound from '../../../images/noImage.png';
import HadirIcon from '../../../images/hadir.png';
import IjinIcon from '../../../images/absen_ijin.png';
import SakitIcon from '../../../images/absen_sakit.png';
import AlpaIcon from '../../../images/absen_tidakhadir.png';
import type { AbsensiSiswaType } from "~/types/absensi-siswa";

export default function ImageHarian({
    dataAbsenToday,
    mode,
    template
}:{
    dataAbsenToday:dataAbsenToday
    mode:string,
    template:AbsensiSiswaType
}){
    
    const dataAbsenSelector = useAppSelector(AbsensiRombelAktifDTO);
    const siswa = useAppSelector(selectAllSiswaDTO);
    const {actions} = useModal<OrmAbsensi>();
    const {dataAbsen, pd_nama, today:fokusTglAbsen,id:tokenSiswa,koleksi_potoinduk:profile} = dataAbsenToday;
    const {kehadiran, idbaris_absen:refIdSheetAbsen,id_image_kehadiran:idImg} = dataAbsen;

    const clickSell = ()=>{
        if(kehadiran!==""){
            const data = dataAbsenSelector?.data.find(s=>s.idbaris === refIdSheetAbsen);
            const moreData = dataAbsenSelector?.data.filter(s=>s.tokensiswa === tokenSiswa && s.id === getParseDateDMMYYYY(fokusTglAbsen));
            const dataSiswa = siswa.find(s=>s.id === tokenSiswa );
            if(data){
                const resolveDataMultiple = moreData && moreData?.length>1?moreData[moreData?.length-1]:data;
                actions.open('EDIT ABSEN',resolveDataMultiple,{closeOnOutsideClick:false})
            }else{
                const dataAbsenTambah = Object.assign({}, template, {
                    tokensiswa:dataSiswa?.id,
                    name:dataSiswa?.pd_nama,
                    kelas:dataSiswa?.nama_rombel,
                    id:getParseDateDMMYYYY(fokusTglAbsen),
                    Time_Stamp: new Date(), // karena hari ini dan detik ini!
                    kehadiran: 'Hadir', // dianggap hadir,
                    action: ''
                })
                actions.open('TAMBAH ABSEN',dataAbsenTambah,{closeOnOutsideClick:false})
            }
        }
    }
    
    const imgDriveUrl = idImg && urlImgDrive(idImg);
    const imgProfil = profile && urlImgDrive(profile);
    const profilMode = imgDriveUrl ?? imgProfil;
    
    let imgUrl :string|undefined = '';
    if(mode === 'icon'){
        if(kehadiran === 'Hadir') imgUrl = imgDriveUrl || HadirIcon;
        if(kehadiran === 'Sakit') imgUrl = imgDriveUrl || SakitIcon;
        if(kehadiran === 'Ijin') imgUrl = imgDriveUrl || IjinIcon;
        if(kehadiran === 'Alpa') imgUrl = imgDriveUrl || AlpaIcon;
    }

    if(mode === 'profil'){
        if(kehadiran === 'Hadir') imgUrl = profilMode || noProfileFound;//|| HadirIcon;
        if(kehadiran === 'Sakit') imgUrl = imgDriveUrl || SakitIcon;
        if(kehadiran === 'Ijin') imgUrl = imgDriveUrl || IjinIcon;
        if(kehadiran === 'Alpa') imgUrl = imgDriveUrl || AlpaIcon;
    }
    
    return (
        <button className='text-xs text-center my-2 cursor-pointer' onClick={clickSell}>
            <div className='border rounded-full max-h-18 max-w-18 overflow-hidden flex justify-center items-center mx-auto'>
                {imgUrl && <img src={imgUrl} className='h-18 w-18 aspect-auto' referrerPolicy="no-referrer"/>}
                
            </div>
            <div className={`${kehadiran ==='Hadir'?'bg-white':'bg-rose-500 text-yellow-300 font-extrabold'} truncate w-3/4 capitalize mx-auto`}>{pd_nama}</div>
        </button>
    )
}