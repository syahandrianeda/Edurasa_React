import { Fields, InputText, SelectField} from "~/components/fields/fields";
import { FilePreviewProvider, SectionPreview, useFilePreview} from "~/components/form-custom/files-input";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import type{ SiswaType } from "~/types/siswa";
import KalendarMasukTanggal from "./fields/tanggal-diterima";
import AwalKelas from "./fields/awal-kelas";
import SelectKeaktifan from "./fields/status-aktif";
import NamaSiswa from "./fields/nama-siswa";
import TempatLahir from "./fields/tempat-lahir-siswa";
import KalendarTanggalLahir from "./fields/tanggal-lahir-siswa";
import SelectGender from "./fields/gender-siswa";
import SelectAgama from "./fields/agama-siswa";
import SelectAbk from "./fields/status-abk-siswa";
import NoNis from "./fields/nis-siswa";
import NoNisn from "./fields/nisn-siswa";
import NoNIK from "./fields/nik-siswa";
import SelectJenisTinggal from "./fields/jenis-tinggal";
import SelectModaTransportasi from "./fields/moda-transportasi";
import { AlamatDusun, AlamatJalan, AlamatKecamatan, AlamatKelurahan, AlamatKota, AlamatProvinsi, AlamatRT, AlamatRW } from "./fields/alamat-fields";
import { AsalPindahan, AsalSekolahTK } from "./fields/sekolah-asal";
import WaliKelas from "./fields/wali-kelas";
import { HubunganWalidanSiswa, KalendarTanggalLahirAyah, KalendarTanggalLahirIbu, KalendarTanggalLahirWali, NamaAyah, NamaIbu, NamaWali, NoNIKAyah, NoNIKIbu, NoNIKWali, SelectPekerjaanAyah, SelectPekerjaanIbu, SelectPekerjaanWali, SelectPendidikanAyah, SelectPendidikanIbu, SelectPendidikanWali } from "./fields/orang-tua-siswa";
import { PenghasilanAyah, PenghasilanIbu, PenghasilanWali } from "./fields/penghasilan";
import { FileAkteKelahiran, FileKartuKeluarga, FilePoto, SectionPreviewPoto } from "./fields/upload-file-dokumen";
import KalendarKeluarTanggal from "./fields/tanggal-keluar";
import { NoAkte, NoHp, NoKK } from "./fields/field-nomor";
import { MutasiAlasan, MutasiDiKelas, MutasiPindahKe } from "./fields/mutasi-field";
import { LulusMelanjutkanKe, NomorSeriIjazah } from "./fields/ijazah-field";
import { AnakUrutanDiKeluarga, SaudaraDiKeluarga } from "./fields/saudara-siswa";


export const ConfigFormEdit:TabsConfigProps = {
    defaultValue:'tabIdentitas',
    tabList:[
        {
            value: 'tabAktif',
            label: 'Status'
        },
        {
            value: 'tabIdentitas',
            label: 'Identitas'
        },
        {
            value: 'tabToken',
            label: 'Token dan Nomor'
        },
        {
            value: 'tabKelasAktif',
            label: 'Kelas Aktif'
        },
        {
            value: 'tabAlamat',
            label: 'Alamat'
        },
        {
            value: 'tabOrtu',
            label: 'Orang Tua'
        },
        {
            value: 'tabDokumen',
            label: 'Dokumen'
        },
        {
            value: 'tabPotoSiswa',
            label: 'Poto Siswa'
        },
        
    ],
    contentList:[
        {
            value: 'tabAktif',
            element: <GroupKeaktifan/>
        },
        {
            value: 'tabIdentitas',
            element: <GroupIdentitas/>
        },
        {
            value: 'tabToken',
            element: <GroupTokenDanNomor/>
        },
        {
            value: 'tabKelasAktif',
            element: <GroupRombelJenjang/>
        },
        {
            value: 'tabAlamat',
            element: <GroupAlamat/>
        },
        {
            value: 'tabOrtu',
            element: <GroupOrangTua/>
        },
        {
            value: 'tabDokumen',
            element: <GroupDokumen/>
        },
        {
            value: 'tabPotoSiswa',
            element: <GroupPoto/>
        },
        
    ]
} 

export const ConfigFormEditAbsen:TabsConfigProps = {
    defaultValue:'tabPotoSiswa',
    tabList:[
        {
            value: 'tabAktif',
            label: 'Status'
        },
        {
            value: 'tabIdentitas',
            label: 'Identitas'
        },
        {
            value: 'tabToken',
            label: 'Token dan Nomor'
        },
        {
            value: 'tabKelasAktif',
            label: 'Kelas Aktif'
        },
        {
            value: 'tabAlamat',
            label: 'Alamat'
        },
        {
            value: 'tabOrtu',
            label: 'Orang Tua'
        },
        {
            value: 'tabDokumen',
            label: 'Dokumen'
        },
        {
            value: 'tabPotoSiswa',
            label: 'Poto Siswa'
        },
        
    ],
    contentList:[
        {
            value: 'tabAktif',
            element: <GroupKeaktifan/>
        },
        {
            value: 'tabIdentitas',
            element: <GroupIdentitas/>
        },
        {
            value: 'tabToken',
            element: <GroupTokenDanNomor/>
        },
        {
            value: 'tabKelasAktif',
            element: <GroupRombelJenjang/>
        },
        {
            value: 'tabAlamat',
            element: <GroupAlamat/>
        },
        {
            value: 'tabOrtu',
            element: <GroupOrangTua/>
        },
        {
            value: 'tabDokumen',
            element: <GroupDokumen/>
        },
        {
            value: 'tabPotoSiswa',
            element: <GroupPoto/>
        },
        
    ]
} 

function GroupKeaktifan(){
    const {currentData} = useFormEdura<SiswaType>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2 px-1">
            <div className="flex flex-col rounded-s-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <SelectKeaktifan/>
                    <KalendarMasukTanggal/>
                    <AwalKelas/>
                </div>
            </div>
            <div className="flex flex-col rounded-e-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <AsalSekolahTK/>
                    <AsalPindahan/>
                    {
                        currentData?.aktif === 'non-aktif' && (
                            <>
                                <KalendarKeluarTanggal/>
                                <MutasiDiKelas/> 
                                <MutasiAlasan/>
                            </>
                        )
                    }
                </div>
            </div>
            {
                (['pindah','lulus','meninggal dunia'].includes(currentData?.aktif)) && 
                (
                    <>
                        <div className="flex flex-col border rounded-bl-xl bg-linear-to-tr from-sky-600 to-sky-400">
                            <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                                <KalendarKeluarTanggal/> 
                                <MutasiDiKelas/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col border rounded-br-xl bg-linear-to-tl from-sky-600 to-sky-400">
                            <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                                {
                                currentData?.aktif === 'lulus' && (
                                    <>
                                        <NomorSeriIjazah/>
                                        <LulusMelanjutkanKe/>
                                    </>
                                )
                            }
                            {
                                currentData?.aktif === 'pindah' && (
                                    <>
                                        <MutasiDiKelas/>
                                        <MutasiPindahKe/>
                                        <MutasiAlasan/>
                                    </>
                                )
                            }
                            {
                                currentData?.aktif === 'meninggal dunia' && (
                                    <>
                                        <MutasiDiKelas/>
                                    </>
                                )
                            }
                                
                            </div>
                        </div>
                    </>
                    

                )
            }
        </div>
    )
}

function GroupIdentitas(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-baseline h-full ps-4 ">
                    <NamaSiswa/>
                    <SelectGender/>
                    <SelectAgama/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start h-full items-center">
                    <TempatLahir/>
                    <KalendarTanggalLahir/>
                </div>
            </div>
            <div className="flex flex-col rounded-bl-xl border-0 inner-shadow-sky-100 bg-linear-to-tr from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <SelectAbk/>
                </div>
            </div>
            <div className="flex flex-col rounded-br-xl border-0 inner-shadow-sky-100 bg-linear-to-tl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <SaudaraDiKeluarga/>
                    <AnakUrutanDiKeluarga/>
                </div>
            </div>
        </div>
    )
}

function GroupTokenDanNomor(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                    <Token/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <NoNis/>
                    <NoNisn/>
                    <NoNIK/>
                </div>
            </div>
            <div className="flex flex-col rounded-bl-xl border-0 inner-shadow-sky-100 bg-linear-to-tr from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <NoAkte/>
                    <NoKK/>
                </div>
            </div>
            <div className="flex flex-col rounded-br-xl border-0 inner-shadow-sky-100 bg-linear-to-tl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <NoHp/>
                </div>
            </div>
        </div>
    )
}

function GroupAlamat(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                    <SelectJenisTinggal/>
                    <SelectModaTransportasi/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <AlamatJalan/>
                    <AlamatDusun/>
                    <AlamatKelurahan/>
                    <div className="flex justify-between">
                        <AlamatRT/>
                        <AlamatRW/>
                    </div>
                    <AlamatKecamatan/>
                    <AlamatKota/>
                    <AlamatProvinsi/>
                </div>
            </div>
        </div>
    )
}

function GroupDokumen(){
    return (
        <FilePreviewProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2 justify-center">
                <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                        <FileAkteKelahiran/>
                        <FileKartuKeluarga/>
                    </div>
                    <InputanBantu/>
                </div>
                <SectionPreview/>
            </div>
        </FilePreviewProvider>
    )
}

function GroupPoto(){
    return (
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2 justify-center">
                <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                        <FilePoto/>
                        
                    </div>
                </div>
                <SectionPreviewPoto/>
            </div>
        
    )
}

function InputanBantu(){
    const {currentId} = useFilePreview();
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    if(!currentId) return null;
    
    if(currentId === currentData?.dok_akte){
        return (
            <>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NamaSiswa/>
                        <TempatLahir/>
                        <KalendarTanggalLahir/>
                    </div>
                </div>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NamaAyah/>
                        <NamaIbu/>
                    </div>
                </div>
            </>
        )
    }
    if(currentId === currentData?.dok_kk){
        
        return (
            <>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NoNIK/>
                        <NoKK/>
                        
                    </div>
                </div>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NoNIKAyah/>
                        <KalendarTanggalLahirAyah/>
                        <NoNIKIbu/>
                        <KalendarTanggalLahirIbu/>
                    </div>
                </div>
            </>
        )
    }
}

function GroupOrangTua(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-center h-full">
                    <div className="rounded-t-xl p-2 font-extrabold uppercase text-2xl text-sky-100 dark:text-sky-200">ayah</div>
                    <NamaAyah/>
                    <KalendarTanggalLahirAyah/>
                    <NoNIKAyah/>
                    <SelectPendidikanAyah/>
                    <SelectPekerjaanAyah/>
                    <PenghasilanAyah/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-center h-full">
                    <div className="rounded-t-xl p-2 font-extrabold uppercase text-2xl text-sky-100 dark:text-sky-200">Ibu</div>
                    <NamaIbu/>
                    <KalendarTanggalLahirIbu/>
                    <NoNIKIbu/>
                    <SelectPendidikanIbu/>
                    <SelectPekerjaanIbu/>
                    <PenghasilanIbu/>
                </div>
            </div>
            <div className="flex flex-col md:col-span-2 rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-center h-full md:w-1/2 mx-auto">
                    <div className="rounded-t-xl p-2 font-extrabold uppercase text-2xl text-sky-100 dark:text-sky-200">Wali</div>
                        <HubunganWalidanSiswa/>
                        <NamaWali/>
                        <KalendarTanggalLahirWali/>
                        <NoNIKWali/>
                        <SelectPendidikanWali/>
                        <SelectPekerjaanWali/>
                        <PenghasilanWali />
                </div>
            </div>
        </div>
    )
}

function GroupRombelJenjang(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                    <RombelAktif/>
                    <JenjangAktif/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <WaliKelas/>
                </div>
            </div>
            
        </div>
    )
}

function Token(){
    const {currentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-35">
            <InputText
                id="token"
                type="number"
                value={currentData?.id??''}
                readOnly
                disabled={true}
                placeholder="Token"
                label="Token / ID Siswa"
            />
        </Fields>
    )
}

function RombelAktif(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="w-6/12 my-3 ">
            <SelectField 
                id='nama_rombel'
                value={currentData?.nama_rombel||""}
                 onChange={(e) => {
                    const rombelName = e.target.value;

                    const rombel = DataRombelUI.find(
                        r => r.rombelName === rombelName
                    );

                    setCurrentData(draft => {
                        draft.nama_rombel = rombelName;
                        draft.jenjang = rombel?.jenjang as number ?? "";
                    });
                }}
                labelSelect="Kelas/Rombel Saat ini"
            >
                {
                    DataRombelUI.filter(s=>s.active).map((m,i)=>(
                        <option key={i} value={m.rombelName}>
                            {m.rombelName}
                        </option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function JenjangAktif(){
    const {currentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="w-6/12 my-3 ">
            <InputText
                type="number"
                disabled
                readOnly
                value={currentData?.jenjang}
                label="Jenjang"/>
        </Fields>
    )
}

