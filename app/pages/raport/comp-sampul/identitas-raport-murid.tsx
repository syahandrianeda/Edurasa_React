
import ImgDriveComp from "~/components/image-from-drive/img-drive";
import ImgStempelCom from "~/components/ttd/img-stempel-comp";
import ImgTtdKepsek from "~/components/ttd/img-ttd-kepsek";
import SelTtdKepsek from "~/components/ttd/sel-ttd-kepsek";
import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import { INSTANSI_PEMERINTAH } from "~/domain/identitas_sekolah/identitas-sekolah";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { formatTanggalIndonesia } from "~/lib/date-helper";
import urlImgDrive from "~/lib/url-img-drive";
import { cn } from "~/lib/utils";
import type{  UserPtk } from "~/types";
import { getAgamaLabel } from "~/types/enums/agama";
import { getGenderLabel } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";
type Props = {
    showTtd:boolean,
    showStempel:boolean,
    showPoto:boolean
    siswa:SiswaType|null,

}
export default function IdentitasRaportMurid({showTtd=false, showStempel, showPoto, siswa}:Props){
    const user = getSessionApp<UserPtk>();
    
    return (
        <div className="border w-[210mm] print:w-[210mm] break-inside-avoid print:border-0 min-h-[297mm] p-2 flex flex-col justify-start mx-auto gap-7" >
            <div className="fw-bold text-center leading-snug font-bold">
                <p>RAPORT PESERTA DIDIK</p>
                <p>JENJANG SEKOLAH DASAR</p>
            </div>
            <div>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="p-1 text-nowrap">1. Nama Peserta Didik (Lengkap)</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1 w-full">{siswa?.pd_nama ?? ''}</td>
                        </tr>
                        <tr>
                            <td className="p-1">2. Nomor Induk Siswa</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{siswa?.nis ?? ''}</td>
                        </tr>
                        <tr>
                            <td className="p-1">3. Nomor Induk Siswa Nasional</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{siswa?.nisn ?? ''}</td>
                        </tr>
                        <tr>
                            <td className="p-1">4. Tempat, tanggal lahir </td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">
                                <p>
                                <span className="capitalize">{siswa?.pd_tl?.toLowerCase() ?? 'tempat lahir'}</span>, {formatTanggalIndonesia(siswa?.pd_tanggallahir)}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">5. Jenis Kelamin </td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{getGenderLabel(siswa?.pd_jk ?? '-')}</td>
                        </tr>
                        <tr>
                            <td className="p-1">6. Agama </td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{getAgamaLabel(siswa?.pd_agama ?? 'Islam')}</td>
                        </tr>
                        <tr>
                            <td className="p-1">6. Alamat </td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">{siswa?.pd_alamat || '-'}</td>
                        </tr>
                        <tr>
                            <td className="p-1">7. No. Telepon Rumah</td>
                            <td className="p-1 w-1">:</td>
                            <td className="p-1">- / {siswa?.pd_hp || '-'}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top">9. Diterima di sekolah ini</td>
                            <td className="p-1 w-1">:</td>
                            <td className="align-top p-1"/>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">a. di kelas</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.awal_kelas ?? ''}</td>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">b. pada tanggal</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{formatTanggalIndonesia(siswa?.masuk_tgl)}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top">10. Nama Orang Tua</td>
                            <td className="p-1 w-1">:</td>
                            <td className="align-top p-1"/>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">a. Ayah</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.pd_namaayah ??''}</td>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">b. Ibu</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.pd_namaibu ?? ''}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top">11. Pekerjaan Orang Tua</td>
                            <td className="p-1 w-1">:</td>
                            <td className="align-top p-1"/>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">a. Ayah</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.dapo_pekerjaanayah || '-'}</td>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">b. Ibu</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.dapo_pekerjaanibu || '-'}</td>
                        </tr>
                        <tr>
                            <td className="p-1 align-top">12. Wali</td>
                            <td className="p-1 w-1">:</td>
                            <td className="align-top p-1"/>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">a. Nama</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.dapo_namawali || '-'}</td>
                        </tr>
                        <tr>
                            <td className="p-1 indent-5">b. Pekerjaan</td>
                            <td className="p-1">:</td>
                            <td className="p-1">{siswa?.dapo_pekerjaanwali || '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex flex-row">
                <div className="flex justify-end items-center w-full">
                    <div className={cn("w-[3cm] border h-[4cm] flex justify-center items-center border-black", )}>
                        {
                            showPoto ? (
                                <ImgDriveComp src={siswa?.koleksi_potoinduk || '1LSOYTPBUDEM2N0Gb3yJYA1uodQDMZhLk'} className="w-[3cm] border h-[4cm] aspect-square"/>
                            ):(
                                <p>Poto Siswa</p>

                            )
                        }
                    
                    </div>
                </div>
                <SelTtdKepsek showStempel={showStempel} typeTitimangsa='titimangsa' showTtd={showTtd} titimangsa={siswa?.masuk_tgl ?? new Date()}/>
                {/* <div className="flex flex-col justify-between w-full text-center relative">
                    {
                        showStempel && ( <ImgStempelCom className="absolute top-0 -left-7 w-50"/> ) }

                    {
                        showTtd && ( <ImgTtdKepsek className="absolute top-5 left-0 translate-x-1 w-80"/> )
                    }

                    <div>
                        <p contentEditable={true}>{KABUPATEN_KOTA},  {formatTanggalIndonesia(siswa?.masuk_tgl)}</p>
                        <p>Kepala Sekolah</p>
                    </div>
                    <div>
                        <p className="font-bold underline mb-0">{user?.kepsek_name ?? '-'}</p>
                        <p className="text-base">NIP. {user?.kepsek_nip ?? ''}</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}