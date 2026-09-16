import { FormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";
import KalendarMasukTanggal from "../forms/fields/tanggal-diterima";
import NamaSiswa from "../forms/fields/nama-siswa";
import TempatLahir from "../forms/fields/tempat-lahir-siswa";
import KalendarTanggalLahir from "../forms/fields/tanggal-lahir-siswa";
import SelectGender from "../forms/fields/gender-siswa";
import SelectAgama from "../forms/fields/agama-siswa";
import SelectAbk from "../forms/fields/status-abk-siswa";
import { Gender } from "~/types/enums/gender";
import NoNis from "../forms/fields/nis-siswa";
import NoNisn from "../forms/fields/nisn-siswa";
import NoNIK from "../forms/fields/nik-siswa";
import SelectJenisTinggal from "../forms/fields/jenis-tinggal";
import SelectModaTransportasi from "../forms/fields/moda-transportasi";
import { AlamatDusun, AlamatJalan, AlamatKecamatan, AlamatKelurahan, AlamatKota, AlamatProvinsi, AlamatRT, AlamatRW } from "../forms/fields/alamat-fields";
import { AsalPindahan, AsalSekolahTK } from "../forms/fields/sekolah-asal";
import { HubunganWalidanSiswa, KalendarTanggalLahirAyah, KalendarTanggalLahirIbu, KalendarTanggalLahirWali, NamaAyah, NamaIbu, NamaWali, NoNIKAyah, NoNIKIbu, NoNIKWali, SelectPekerjaanAyah, SelectPekerjaanIbu, SelectPekerjaanWali, SelectPendidikanAyah, SelectPendidikanIbu, SelectPendidikanWali } from "../forms/fields/orang-tua-siswa";
import { PenghasilanAyah, PenghasilanIbu, PenghasilanWali } from "../forms/fields/penghasilan";
import { FilePreviewProvider, SectionPreview} from "~/components/form-custom/files-input";
import { ConditionalFieldInput, FileAkteKelahiran, FileKartuKeluarga, FilePoto, SectionPreviewPoto } from "../forms/fields/upload-file-dokumen";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { useSiswaCrud } from "../kesiswaan-controller";
import SendTambah from "../forms/send-tambath";
import { useMemo } from "react";
import AwalKelasSiswaBaru from "../forms/fields/awal-kelas-siswa-baru";
import { getNumberFromString } from "~/lib/get-number";

export default function FormPesertaDidikBaru({data}:{data:SiswaType}){
    const {state} = useSiswaCrud();
    const rombel = getSessionRombel();
    const DataDefault:SiswaType = {...data, 
        aktif:'aktif',
        pd_jk:Gender.UNKNOWN,
        awal_kelas:rombel,
        nama_rombel: rombel,
        jenjang: getNumberFromString(rombel) as number,
        masuk_tgl:new Date(),
        time_stamp:new Date(),
    };
    const formSeed = useMemo(() => DataDefault, []);
    return (
        <FormEdura<SiswaType> data={formSeed}>
            <fieldset disabled={state.isSubmitting}>
                <div className="bg-linear-to-tr from-sky-300 to-sky-100 p-1 rounded-xl">
                    <h5 className="text-center">Pertama kali diterima</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm flex flex-col gap-2 md:flex-row justify-around items-center">
                        <KalendarMasukTanggal/>
                        <AwalKelasSiswaBaru activeOnly={true} className="w-9/12 md:w-4/12 mt-6"/>
                    </div>
                    <h5 className="text-center">Sekolah Asal</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm flex flex-col md:flex-row gap-2">
                        <AsalSekolahTK/>
                        <AsalPindahan/>
                    </div>
                    <h5 className="text-center">Identitas Peserta Didik</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm flex flex-col">
                        <NamaSiswa className="w-full"/>
                        <div className="flex gap-2">
                            <TempatLahir className="w-full"/>
                            <KalendarTanggalLahir className="md:w-2/6"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <SelectGender className="w-full"/>
                            <SelectAgama className="w-full"/>
                            <SelectAbk className="w-full"/>
                        </div>
                    </div>
                    <h5 className="text-center">Nomor Register</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm flex flex-col md:flex-row gap-2">
                        <NoNis/>
                        <NoNisn/>
                        <NoNIK/>
                    </div>
                    <h5 className="text-center">Alamat</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm flex-1 flex-col md:flex-row gap-2">
                        <div className="flex flex-col md:flex-row justify-between gap-1 mx-auto">
                            <AlamatJalan className="w-full"/>
                            <AlamatDusun className="w-full"/>
                        </div>
                        <div className="flex  flex-col md:flex-row  justify-between gap-1 mx-auto">
                            <AlamatKelurahan className="w-full"/>
                            <div className="flex  justify-between">
                                <AlamatRT className="w-full"/>
                                <AlamatRW className="w-full"/>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row  justify-between gap-1  mx-auto">
                            <AlamatKecamatan className="w-full"/>
                            <AlamatKota className="w-full"/>
                            <AlamatProvinsi className="w-full"/>
                        </div>
                    </div>
                    <h5 className="text-center">Jenis Tinggal dan Moda Perjalanan</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm flex flex-col md:flex-row gap-2">
                        <SelectJenisTinggal className="w-full"/>
                        <SelectModaTransportasi className="w-full"/>
                    </div>
                    <h5 className="text-center">Data Orang Tua/Wali</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm gap-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 justify-center items-center">
                            <div className="border rounded-2xl p-1 w-full">
                                <h6 className="text-center font-extrabold uppercase">Ayah Kandung</h6>
                                <NamaAyah className="w-full"/>
                                <KalendarTanggalLahirAyah/>
                                <NoNIKAyah className="w-full"/>
                                <SelectPendidikanAyah className="w-full"/>
                                <SelectPekerjaanAyah className="w-full"/>
                                <PenghasilanAyah className="w-full"/>
                            </div>
                            <div className="border rounded-2xl p-1 w-full">
                            <h6 className="text-center font-extrabold uppercase">Ibu Kandung</h6>
                                <NamaIbu className="w-full"/>
                                <KalendarTanggalLahirIbu/>
                                <NoNIKIbu className="w-full"/>
                                <SelectPendidikanIbu className="w-full"/>
                                <SelectPekerjaanIbu className="w-full"/>
                                <PenghasilanIbu className="w-full"/>
                            </div>
                            <div className="col-span-2 border rounded-2xl p-1 w-1/2 mx-auto">
                                <h6 className="text-center font-extrabold uppercase">Wali</h6>
                                <HubunganWalidanSiswa className="w-full"/>
                                <NamaWali className="w-full"/>
                                <KalendarTanggalLahirWali/>
                                <NoNIKWali className="w-full"/>
                                <SelectPendidikanWali className="w-full"/>
                                <SelectPekerjaanWali className="w-full"/>
                                <PenghasilanWali className="w-full"/>
                            </div>
                        </div>
                    </div>
                    <h5 className="text-center">Arsip Dokumen</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm gap-2">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <FilePreviewProvider>

                                <div className="border rounded-2xl flex flex-col h-full justify-center items-center gap-2">
                                    <FileAkteKelahiran/>
                                    <FileKartuKeluarga/>
                                </div>
                                <div className="row-span-2 border h-full">
                                    <SectionPreview/>
                                </div>
                                <div className="border rounded-2xl">
                                    <ConditionalFieldInput/>
                                </div>
                            </FilePreviewProvider>
                        </div>
                    </div>
                    <h5 className="text-center">Poto Profil Siswa</h5>
                    <div className="bg-linear-to-tr from-sky-600 to-sky-100 p-1 rounded-sm gap-2">
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            <div className="border rounded-2xl flex flex-col h-full justify-center items-center gap-2">
                                <FilePoto/>
                            </div>
                            <div className="row-span-2 border h-full">
                                <SectionPreviewPoto/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-linear-to-tr from-sky-300 to-sky-100 p-1 rounded-xl">
                    <SendTambah/>
                </div>
            </fieldset>
        </FormEdura>
    )
}