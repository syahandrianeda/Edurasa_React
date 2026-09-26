import { setBankSoal, upsertBankSoal } from "~/context-reduct/global-state/bank-soal/bank-soal-slice";
import { setAtp, upsertAtp } from "~/context-reduct/global-state/kurikulum/atp-slice";
import { setCp, upsertCp } from "~/context-reduct/global-state/kurikulum/cp-slice";
import { setFaseA, upsertFaseA } from "~/context-reduct/global-state/kurikulum/tp-fase-a";
import { setFaseB, upsertFaseB } from "~/context-reduct/global-state/kurikulum/tp-fase-b";
import { setFaseC, upsertFaseC } from "~/context-reduct/global-state/kurikulum/tp-fase-c";
import { setJpMapel, upsertJpMapel } from "~/context-reduct/global-state/mapel/mapel-rombel-slice";
import { setDataMapel, upsertDataMapel } from "~/context-reduct/global-state/mapel/mapel-slice";
import { setAllSiswa, upsertAllSiswa, type DataSiswa } from "~/context-reduct/global-state/siswa-slice";
import { store } from "~/context-reduct/redux-provider";
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import type { jp_mapelSheet } from "~/types/mapel/jp_mapel";
import type { InterfaceMapelSheet } from "~/types/mapel/mapel";
import type { SiswaType } from "~/types/siswa";
import { namaTab } from "./nama-tab-environment";
import { setDataJadwalPelajaran, setJadwalMapel, upsertDataJadwalPelajaran } from "~/context-reduct/global-state/mapel/jadwal-pelajaran";
import type { jadwalMapelAccordTable } from "~/types/setting_jadwal/jadwal_mapel";
import { setSettingJadwalMapel, upsertSettingJadwalMapel } from "~/context-reduct/global-state/mapel/setting-jadwal-mapel-slice";
import type { settingJadwalSheet } from "~/types/setting_jadwal/setting_jadwal";
import { setDataJadwalPembiasaan, upsertDataJadwalPembiasaan } from "~/context-reduct/global-state/pembiasaan-kegiatan-sekolah/jadwal-pembiasaan";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan";
import { setDataProta, upsertDataProta } from "~/context-reduct/global-state/prota/prota-slice";
import type { protaSheet } from "~/types/kurikulum/prota-orm";
import {  setKaldikArray, upsertKaldik, upsertKaldikArray } from "~/context-reduct/global-state/kaldik-slice";
import type { KaldikSheetType, KaldikType } from "~/types/kaldik";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { setTaksonomiBloom, upsertTaksonomiBloom } from "~/context-reduct/global-state/taksonomi/taksonomi-slice";
import type { TaksonomiSheetType } from "~/types/taksonomi/taksonomi-sheet";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { setAbsensiRombel, upsertAbsensiRombel } from "~/context-reduct/global-state/absensi-slice";
import type { AbsensiSiswaSheetType } from "~/types/absensi-siswa";
import { setSiswaDapodik, upsertSiswaDapodik } from "~/context-reduct/global-state/sheet-dapodik-slice";
import type { SiswaDapodikAppToSheet } from "~/types/siswa-dapodik";
import { saveIsianSiswa } from "~/infrastructures/session-storage/isian-siswa";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import { setTabunganRombel, upsertTabunganRombel } from "~/context-reduct/global-state/tabungan/tabungan-slice";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";
import {  setKeuanganUser, upsertKeuanganUser } from "~/context-reduct/global-state/tabungan/keuangan-slice";
import type { KeuanganSheetType } from "~/types/tabungan/keuangan-sheet-type";
import { setKategoriAkses_keuangan, upsertKategoriAkses_keuangan } from "~/context-reduct/global-state/tabungan/kategori-keuangan-slice";
import type { KategoriKeuanganAppType, KategoriKeuanganSheetType } from "~/types/tabungan/kategori-keuangan-type";
import { setFokusAksesRombelKeuangan } from "~/context-reduct/global-state/tabungan/ui-akses-keuangan-slice";
import DtoKategoriKeuangan from "~/dtos/dto-kategori-keuangan";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { setSuratKeluar, upsertSuratKeluar } from "~/context-reduct/global-state/surat/surat-keluar-slice";
import type { RiwayatAkunSheetType } from "~/types/tendik/riwayat-akun-sheet-type";
import { setRiwayatIdAkun, upsertRiwayatIdAkun } from "~/context-reduct/global-state/tendik/riwayat-id-akun-slice";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
import { setSppd, upsertSppd } from "~/context-reduct/global-state/surat/sppd-slice";
import { setPangkatGolongan, upsertPangkatGolongan } from "~/context-reduct/global-state/tendik/pangkat-golongan-slice";
import type { PangkatGolonganSheetType } from "~/types/tendik/pangkat-golongan-sheet-type";
import { setSuratMasuk, upsertSuratMasuk } from "~/context-reduct/global-state/surat/surat-masuk-slice";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";
import { setRiwayatRombel, upsertRiwayatRombel } from "~/context-reduct/global-state/buku-induk/riwayat-rombel-slice";
import type { RiwayatRombelSheetType } from "~/types/buku-induk/riwayat-rombel";
import { setSerahTerimaDokumen, upsertSerahTerimaDokumen } from "~/context-reduct/global-state/galleries/serah-terima-dokumen-slice";
import type { SerahTerimaDokumenSheetType } from "~/types/galleries/serah-terima-dokumen-sheet-type";
import { setTransaksiSerahTerimaDokumen, upsertTransaksiSerahTerimaDokumen } from "~/context-reduct/global-state/galleries/transaksi-serah-terima-dokumen-slice";
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import { setPaketSoal, upsertPaketSoal } from "~/context-reduct/global-state/bank-soal/paket-soal-slice";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";
import { setPublikasiPaket, upsertPublikasiPaket } from "~/context-reduct/global-state/bank-soal/publikasi-paket-slice";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import { IndexDbTabNameRepository } from "~/infrastructures/iDb-vite/indexDb-tabname-repository";
import { getNumberFromString } from "./get-number";
import { upsertResponTagihan } from "~/context-reduct/global-state/respon-siswa/response-tagihan-slice";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";


export default async function DispatchingResponseToStore(success:boolean, data:Record<string, any>[],detailResponse:Record<string,any>, rombelAktif?:string){
    // if(success){
        // ga boleh ada trial-nya, karena namanya bakal ngefek ke bawah
        const jenjang= getNumberFromString(rombelAktif ?? getSessionRombel());
        // const db = new IndexDbTabNameRepository(detailResponse.namaTab);
        
        if(detailResponse?.namaTab === namaTab('mapel')){
            store.dispatch(upsertDataMapel(data as unknown as InterfaceMapelSheet[]));
            // await db.saveBulkAgain(data as unknown as InterfaceMapelSheet[])
        };
        
        // boleh ada trialnya, tapi saat ini tidak ada trial karena fitur baru
        if(detailResponse?.namaTab === namaTab('bank_soal')){
            store.dispatch(upsertBankSoal(data as unknown as BankSoalSheetType[]))
            // await db.saveBulkAgain(data as unknown as BankSoalSheetType[])

        }
        // datasiswa ada trial-nya
        if(detailResponse?.namaTab === namaTab('datasiswa')){
            // const db = new IndexDbTabNameRepository(detailResponse.namaTab);
            store.dispatch(upsertAllSiswa({
                data : data as unknown as SiswaType[] ,
                loaded : true,
                source :'API',
                loading:true
    
            } as DataSiswa<SiswaType>));
            
            
            // if(detailResponse.source === 'API'){

            // }
            
            //simpan di session ini:
            
            const formatIsianSiswa = detailResponse?.objKosong
            saveIsianSiswa(formatIsianSiswa);
            const db = new IndDbSiswaRepository();
            await db.saveBulkAgain(data as unknown as SiswaType[]);
        }

        if(detailResponse?.namaTab === namaTab('dapodik')){
            store.dispatch(upsertSiswaDapodik(data as unknown as SiswaDapodikAppToSheet[]))
        }
    
        //taksonomi belum dibuatkan store-nya
        if(detailResponse?.namaTab === namaTab('taksonomi_bloom')){
            store.dispatch(upsertTaksonomiBloom(data as unknown as TaksonomiSheetType[]))
            // await db.saveBulkAgain(data as unknown as TaksonomiSheetType[]);

            
        }
        
        // ada trial-nya
        if(detailResponse?.namaTab === namaTab('faseA')){
            store.dispatch(upsertFaseA(data as unknown as FaseKurikulumType[]))
            // await db.saveBulkAgain(data as unknown as FaseKurikulumType[]);
            
        }
        
        // ada trial-nya;
        if(detailResponse?.namaTab === namaTab('faseB')){
            store.dispatch(upsertFaseB(data as unknown as FaseKurikulumType[]))
            // await db.saveBulkAgain(data as unknown as FaseKurikulumType[]);
        }
        
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('elemen_cp')){
            store.dispatch(upsertCp(data as unknown as ElemenCpType[]));
            // await db.saveBulkAgain(data as unknown as ElemenCpType[]);

        }
    
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('faseC')){
            store.dispatch(upsertFaseC(data as unknown as FaseKurikulumType[]))
            // await db.saveBulkAgain(data as unknown as FaseKurikulumType[])
        }
        
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('Atp')){
            store.dispatch(upsertAtp(data as unknown as AtpKurikulumType[]));
            // await db.saveBulkAgain(data as unknown as AtpKurikulumType[]);

        }
    
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('jp_mapel')){
            store.dispatch(upsertJpMapel(data as unknown as jp_mapelSheet[]));
            // await db.saveBulkAgain(data as unknown as jp_mapelSheet[])
        }
        
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('jadwal_mapel')){ 
            store.dispatch(upsertDataJadwalPelajaran(data as unknown as jadwalMapelAccordTable[]))
            // await db.saveBulkAgain(data as unknown as jadwalMapelAccordTable[])
        }
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('setting_jadwal')){
            store.dispatch(upsertSettingJadwalMapel(data as unknown as settingJadwalSheet[]))
            // await db.saveBulkAgain(data as unknown as settingJadwalSheet[]);
        }
        // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('kegiatan_nonkbm')){
            store.dispatch(upsertDataJadwalPembiasaan(data as unknown as pembiasaanSheet[]))
            // await db.saveBulkAgain(data as unknown as pembiasaanSheet[])
        }
            // ada trial-nya:
        if(detailResponse?.namaTab === namaTab('prota')){
            store.dispatch(upsertDataProta(data as unknown as protaSheet[]))
            // await db.saveBulkAgain(data as unknown as protaSheet[])
        }
        
        if(detailResponse?.namaTab === namaTab('kalender')){
            store.dispatch(upsertKaldikArray(data as unknown as KaldikType[]));
            // store.dispatch(upsertKaldik(data as unknown as KaldikType[]))
            // await db.saveBulkAgain(data as unknown as KaldikType[])

            // const repo = new IndDbKaldikRepository();
                
            //     await repo.saveBulkAgain(
            //       data as unknown as KaldikSheetType[]
            //     );
        }

        if(detailResponse?.namaTab === namaTab('kelas_'+rombelAktif)){
            
                store.dispatch(upsertAbsensiRombel(
                    {
                        nama_rombel:rombelAktif ?? getSessionRombel(),
                        data: detailResponse?.findTab? data as AbsensiSiswaSheetType[]:[]
                    }
                ))
            
        }
        
        /** tabungan */
        if(detailResponse?.namaTab === `${namaTab('tabungan_')}${rombelAktif}`){
            
            store.dispatch(upsertTabunganRombel(
                {
                    nama_rombel:rombelAktif ?? getSessionRombel(),
                    data: detailResponse?.findTab? data as TabunganSheetType[]:[]
                }
            ))
            
        }
        /** keuangan */
        if(detailResponse?.namaTab === `${namaTab('keuangan_')}${getSessionApp<UserPtk>()?.id}`){
            
                store.dispatch(upsertKeuanganUser(
                    {
                        user_id:getSessionApp<UserPtk>()?.id ?? undefined,
                        data: detailResponse?.findTab? data as KeuanganSheetType[] :[]
                    }
                ))
            
        }

        if(detailResponse?.namaTab === namaTab('kategori_akses')){
                store.dispatch(upsertKategoriAkses_keuangan({
                    data: data as KategoriKeuanganSheetType[],
                    loaded:true,
                    name:'kategori_akses'

                }));
                /** simpan store kelas awal jika ada,  */
                if(data.length>0 && !getSessionApp<UserPtk>()){
                    const found = (data as KategoriKeuanganSheetType[]).find(s=>s.user_id === getSessionApp<UserPtk>()?.id);
                    if(found){
                        const dto = DtoKategoriKeuangan.fromSheet(found);
                        store.dispatch(setFokusAksesRombelKeuangan({
                            value:{
                                kategori:dto.kategori ,
                                rombel:dto.akses_kelas[0]
                            },
                            name:'fokusRombelKategoriKeuangan',
                            loaded:true
                        }))

                    }else{
                        if(getSessionApp<UserPtk>()?.jabatan === 'Guru Kelas'){
                            store.dispatch(setFokusAksesRombelKeuangan({
                                value:{
                                    kategori:'tabungan' ,
                                    rombel:getSessionRombel()
                                },
                                name:'fokusRombelKategoriKeuangan',
                                loaded:true
                        }))
                        }
                    }
                }
            
        }
        
        if(detailResponse?.namaTab === namaTab('surat_keluar')){
            
            store.dispatch(upsertSuratKeluar(data as unknown as SuratKeluarSheetType[]))
        }
        
        if(detailResponse?.namaTab === namaTab('sppd')){
            store.dispatch(upsertSppd(data as unknown as SppdSheetType[]))
        }

        if(detailResponse?.namaTab === namaTab('riwayat_id_akun')){
            store.dispatch(upsertRiwayatIdAkun(data as unknown as RiwayatAkunSheetType[]))
        }
        if(detailResponse?.namaTab === namaTab('pangkat_golongan')){
            store.dispatch(upsertPangkatGolongan(data as unknown as PangkatGolonganSheetType[]))
        }
        if(detailResponse?.namaTab === namaTab('surat_masuk')){
            store.dispatch(upsertSuratMasuk(data as unknown as SuratMasukSheetType[]))
        }

        if(detailResponse?.namaTab === namaTab('riwayat_rombel')){
            
            store.dispatch(upsertRiwayatRombel(data as unknown as RiwayatRombelSheetType[]))
        }
        if(detailResponse?.namaTab === namaTab('serah_terima_dokumen')){
            
            store.dispatch(upsertSerahTerimaDokumen(data as unknown as SerahTerimaDokumenSheetType[]))
        }
        if(detailResponse?.namaTab === namaTab('transaksi_serah_terima')){
            
            store.dispatch(upsertTransaksiSerahTerimaDokumen(data as unknown as TransaksiSerahTerimaDokumenSheetType[]))
        }
         
        if(detailResponse?.namaTab === namaTab('paket_soal')){
            
            store.dispatch(upsertPaketSoal(data as unknown as PaketSoalSheetType[]));
            // store.dispatch(
            //     setPaketSoal(prev=>{
            //         if(!prev) return;
            //         prev.data = [...prev.data, data]
            //     }
                    
            //     )
            // )
            
            // await db.saveBulkAgain(data as unknown as PaketSoalSheetType[])

        }
        if(detailResponse?.namaTab === namaTab('publikasi_paket')){
            store.dispatch(upsertPublikasiPaket(data as unknown as PublikasiPaketSheetType[]))
            // await db.saveBulkAgain(data as unknown as PublikasiPaketSheetType[]);
        }
        
         if(detailResponse?.namaTab === namaTab('respon_tagihan_'+jenjang)){
            
                store.dispatch(upsertResponTagihan(
                    {
                        jenjang: jenjang,
                        data: detailResponse?.findTab? data as NilaiSiswaSheetType[]:[]
                    }
                ))
            
        }
        

        //indexDb
}
