import type { SiswaAppScriptDTO } from "~/dtos/dto-siswa";
import type { ExcelHeaderMap } from "./excel-header-map";
import type { SiswaType } from "~/types/siswa";
import { getGenderLabel } from "~/types/enums/gender";
import { formatTanggalIndonesia } from "~/lib/date-helper";
import { getAgamaLabel } from "~/types/enums/agama";
import type { SiswaTypeDapodik } from "~/types/siswa-dapodik";

export type HeaderDetectionResult = {
  headerRowIndex: number;
  headers: string[];
};

export function detectHeaderRow(
  rows: any[][],
  expectedHeaders: string[],
  maxScanRow = 10
): HeaderDetectionResult {
  for (let i = 0; i < Math.min(rows.length, maxScanRow); i++) {
    const row = rows[i];

    if (!row || row.length === 0) continue;

    const normalizedRow = row.map((cell) =>
      String(cell ?? '').toLowerCase().trim()
    );

    const matchCount = normalizedRow.filter((cell) =>
      expectedHeaders.includes(cell)
    ).length;

    // threshold: minimal 2 header cocok
    if (matchCount >= 2) {
      return {
        headerRowIndex: i,
        headers: normalizedRow,
      };
    }
  }

  throw new Error('Header Excel tidak ditemukan');
}


export const headerDapodk = [
'no',
'pd_nama',
'nis',
'pd_jk',
'nisn',
'pd_tl',
'pd_tanggallahir',
'nik',
'pd_agama',
'pd_alamat',
'dapo_rt',
'dapo_rw',
'dapo_dusun',
'dapo_kelurahan',
'dapo_kecamatan',
'dapo_kodepos',
'dapo_jenistinggal',
'dapo_alattransportasi',
'dapo_telepon',
'pd_hp',
'dapo_email',
'dapo_skhun',
'dapo_penerimakps',
'dapo_nokps',
'pd_namaayah',
'dapo_tahunlahirayah',
'dapo_jenjangpendidikanayah',
'dapo_pekerjaanayah',
'dapo_penghasilanayah',
'dapo_nikayah',
'pd_namaibu',
'dapo_tahunlahiribu',
'dapo_jenjangpendidikanibu',
'dapo_pekerjaanibu',
'dapo_penghasilanibu',
'dapo_nikibu',
'dapo_namawali',
'dapo_tahunlahirwali',
'dapo_jenjangpendidikanwali',
'dapo_pekerjaanwali',
'dapo_penghasilanwali',
'dapo_nikwali',
'nama_rombel',
'dapo_nopesertaujiannasional',
'dapo_noseriijazah',
'dapo_penerimakip',
'dapo_nomorkip',
'dapo_namadikip',
'dapo_nomorkks',
'dapo_noregistrasiaktalahir',
'dapo_bank',
'dapo_nomorrekeningbank',
'dapo_rekeningatasnama',
'dapo_layakpip',
'dapo_alasanlayakpip',
'dapo_kebutuhankhusus',
'dapo_sekolahasal',
'dapo_anakkeberapa',
'dapo_lintang',
'dapo_bujur',
'nokk',
'dapo_beratbadan',
'dapo_tinggibadan',
'dapo_lingkarkepala',
'dapo_jumlahsaudarakandung',
'dapo_jarakrumahkesekolah',
];
export const headerMapDapodik:ExcelHeaderMap<SiswaTypeDapodik>[]=[
    {key: 'index',                              configRender:{type:'index', id: 'index'},                               aliases:['no']},
    {key: 'pd_nama',                            configRender:{type:'field', id: 'pd_nama',                            render:(row)=>row.pd_nama},                        aliases:['nama']},
    {key: 'nis',                                configRender:{type:'field', id: 'nis',                                render:(row)=>row.nis},                            aliases:['nipd']},
    {key: 'pd_jk',                              configRender:{type:'field', id: 'pd_jk',                              render:(row)=>getGenderLabel(row.pd_jk)},          aliases:['jk']},
    {key: 'nisn',                               configRender:{type:'field', id: 'nisn',                               render:(row)=>row.nisn},                           aliases:['nisn']},
    {key: 'pd_tl',                              configRender:{type:'field', id: 'pd_tl',                              render:(row)=>row.pd_tl},                          aliases:['tempat lahir']},
    {key: 'pd_tanggallahir',                    configRender:{type:'field', id: 'pd_tanggallahir',                    render:(row)=>formatTanggalIndonesia(row.pd_tanggallahir)}, aliases:['tanggal lahir']},
    {key: 'nik',                                configRender:{type:'field', id: 'nik',                                render:(row)=>row.nik},                            aliases:['nik']},
    {key: 'pd_agama',                           configRender:{type:'field', id: 'pd_agama',                           render:(row)=>getAgamaLabel(row.pd_agama)},        aliases:['agama']},
    {key: 'pd_alamat',                          configRender:{type:'field', id: 'pd_alamat',                          render:(row)=>row.pd_alamat},                      aliases:['alamat']},
    {key: 'dapo_rt',                            configRender:{type:'field', id: 'dapo_rt',                            render:(row)=>row.dapo_rt},                        aliases:['rt']},
    {key: 'dapo_rw',                            configRender:{type:'field', id: 'dapo_rw',                            render:(row)=>row.dapo_rw},                               aliases:['rw']},
    {key: 'dapo_dusun',                         configRender:{type:'field', id: 'dapo_dusun',                         render:(row)=>row.dapo_dusun},                               aliases:['dusun']},
    {key: 'dapo_kelurahan',                     configRender:{type:'field', id: 'dapo_kelurahan',                     render:(row)=>row.dapo_kelurahan},                               aliases:['kelurahan','desa']},
    {key: 'dapo_kecamatan',                     configRender:{type:'field', id: 'dapo_kecamatan',                     render:(row)=>row.dapo_kecamatan},                               aliases:['kecamatan']},
    {key: 'dapo_kodepos',                       configRender:{type:'field', id: 'dapo_kodepos',                       render:(row)=>row.dapo_kodepos},                               aliases:['kode pos']},
    {key: 'dapo_jenistinggal',                  configRender:{type:'field', id: 'dapo_jenistinggal',                  render:(row)=>row.dapo_jenistinggal},                               aliases:['jenis tinggal']},
    {key: 'dapo_alattransportasi',              configRender:{type:'field', id: 'dapo_alattransportasi',              render:(row)=>row.dapo_alattransportasi},                               aliases:['alat transportasi']},
    {key: 'dapo_telepon',                       configRender:{type:'field', id: 'dapo_telepon',                       render:(row)=>row.dapo_telepon},                               aliases:['telepon']},
    {key: 'pd_hp',                              configRender:{type:'field', id: 'pd_hp',                              render:(row)=>row.pd_hp},                               aliases:['hp']},
    {key: 'dapo_email',                         configRender:{type:'field', id: 'dapo_email',                         render:(row)=>row.dapo_email},                               aliases:['e-mail']},
    {key: 'dapo_skhun',                         configRender:{type:'field', id: 'dapo_skhun',                         render:(row)=>row.dapo_skhun},                               aliases:['skhun']},
    {key: 'dapo_penerimakps',                   configRender:{type:'field', id: 'dapo_penerimakps',                   render:(row)=>row.dapo_penerimakip},                               aliases:['penerima kps']},
    {key: 'dapo_nokps',                         configRender:{type:'field', id: 'dapo_nokps',                         render:(row)=>row.dapo_nokps},                               aliases:['no. kps']},
    {key: 'pd_namaayah',                        groupColumn:'data ayah', configRender:{type:'field', id: 'pd_namaayah',                        render:(row)=>row.pd_namaayah},                               aliases: ['data ayah nama',] },
    {key: 'dapo_tahunlahirayah',                groupColumn:'data ayah', configRender:{type:'field', id: 'dapo_tahunlahirayah',                render:(row)=>row.dapo_tahunlahirayah===0?"":formatTanggalIndonesia(new Date(row.dapo_tahunlahirayah,0,1),{year:"numeric"})},                               aliases: ['data ayah tahun lahir'] },
    {key: 'dapo_jenjangpendidikanayah',         groupColumn:'data ayah', configRender:{type:'field', id: 'dapo_jenjangpendidikanayah',         render:(row)=>row.dapo_jenjangpendidikanayah},                               aliases: ['data ayah jenjang pendidikan'] },
    {key: 'dapo_pekerjaanayah',                 groupColumn:'data ayah', configRender:{type:'field', id: 'dapo_pekerjaanayah',                 render:(row)=>row.dapo_pekerjaanayah},                               aliases: ['data ayah pekerjaan'] },
    {key: 'dapo_penghasilanayah',               groupColumn:'data ayah', configRender:{type:'field', id: 'dapo_penghasilanayah',               render:(row)=>row.dapo_penghasilanayah},                               aliases: ['data ayah penghasilan'] },
    {key: 'dapo_nikayah',                       groupColumn:'data ayah', configRender:{type:'field', id: 'dapo_nikayah',                       render:(row)=>row.dapo_nikayah},                               aliases: ['data ayah nik'] },
    {key: 'pd_namaibu',                         groupColumn:'data ibu', configRender:{type:'field', id: 'pd_namaibu',                         render:(row)=>row.pd_namaibu},                               aliases:['data ibu nama']},
    {key: 'dapo_tahunlahiribu',                 groupColumn:'data ibu', configRender:{type:'field', id: 'dapo_tahunlahiribu',                 render:(row)=>row.dapo_tahunlahiribu===0?"":formatTanggalIndonesia(new Date(row.dapo_tahunlahiribu,0,1),{year:'numeric'})},                               aliases:['data ibu tahun lahir']},
    {key: 'dapo_jenjangpendidikanibu',          groupColumn:'data ibu', configRender:{type:'field', id: 'dapo_jenjangpendidikanibu',          render:(row)=>row.dapo_jenjangpendidikanibu},                               aliases:['data ibu jenjang pendidikan']    },
    {key: 'dapo_pekerjaanibu',                  groupColumn:'data ibu', configRender:{type:'field', id: 'dapo_pekerjaanibu',                  render:(row)=>row.dapo_pekerjaanibu},                               aliases:['data ibu pekerjaan']},
    {key: 'dapo_penghasilanibu',                groupColumn:'data ibu', configRender:{type:'field', id: 'dapo_penghasilanibu',                render:(row)=>row.dapo_penghasilanibu},                               aliases:['data ibu penghasilan']},
    {key: 'dapo_nikibu',                        groupColumn:'data ibu', configRender:{type:'field', id: 'dapo_nikibu',                        render:(row)=>row.dapo_nikibu},                               aliases:['data ibu nik']},
    {key: 'dapo_namawali',                      groupColumn:'data wali', configRender:{type:'field', id: 'dapo_namawali',                      render:(row)=>row.dapo_namawali},                               aliases:['data wali nama']},
    {key: 'dapo_tahunlahirwali',                groupColumn:'data wali', configRender:{type:'field', id: 'dapo_tahunlahirwali',                render:(row)=>row.dapo_tahunlahirwali===0?"":formatTanggalIndonesia(new Date(row.dapo_tahunlahirwali,0,1),{year:'numeric'})},                               aliases:['data wali tahun lahir']},
    {key: 'dapo_jenjangpendidikanwali',         groupColumn:'data wali', configRender:{type:'field', id: 'dapo_jenjangpendidikanwali',         render:(row)=>row.dapo_jenjangpendidikanwali},                               aliases:['data wali jenjang pendidikan']    },
    {key: 'dapo_pekerjaanwali',                 groupColumn:'data wali', configRender:{type:'field', id: 'dapo_pekerjaanwali',                 render:(row)=>row.dapo_pekerjaanwali},                               aliases:['data wali pekerjaan']},
    {key: 'dapo_penghasilanwali',               groupColumn:'data wali', configRender:{type:'field', id: 'dapo_penghasilanwali',               render:(row)=>row.dapo_penghasilanwali},                               aliases:['data wali penghasilan']},
    {key: 'dapo_nikwali',                       groupColumn:'data wali', configRender:{type:'field', id: 'dapo_nikwali',                       render:(row)=>row.dapo_nikwali},                               aliases:['data wali nik']},
    {key: 'nama_rombel',                        configRender:{type:'field', id: 'nama_rombel',                        render:(row)=>row.nama_rombel},                               aliases:['rombel saat ini']},
    {key: 'dapo_nopesertaujiannasional',        configRender:{type:'field', id: 'dapo_nopesertaujiannasional',        render:(row)=>row.dapo_nopesertaujiannasional},                               aliases:['no peserta ujian nasional']        },
    {key: 'dapo_noseriijazah',                  configRender:{type:'field', id: 'dapo_noseriijazah',                  render:(row)=>row.dapo_noseriijazah},                               aliases:['no seri ijazah']},
    {key: 'dapo_penerimakip',                   configRender:{type:'field', id: 'dapo_penerimakip',                   render:(row)=>row.dapo_penerimakip},                               aliases:['penerima kip']},
    {key: 'dapo_nomorkip',                      configRender:{type:'field', id: 'dapo_nomorkip',                      render:(row)=>row.dapo_nomorkip},                               aliases:['nomor kip']},
    {key: 'dapo_namadikip',                     configRender:{type:'field', id: 'dapo_namadikip',                     render:(row)=>row.dapo_namadikip},                               aliases:['nama di kip']},
    {key: 'dapo_nomorkks',                      configRender:{type:'field', id: 'dapo_nomorkks',                      render:(row)=>row.dapo_nomorkks},                               aliases:['nomor kks']},
    {key: 'dapo_noregistrasiaktalahir',         configRender:{type:'field', id: 'dapo_noregistrasiaktalahir',         render:(row)=>row.dapo_noregistrasiaktalahir},                               aliases:['no registrasi akta lahir']    },
    {key: 'dapo_bank',                          configRender:{type:'field', id: 'dapo_bank',                          render:(row)=>row.dapo_bank},                               aliases:['bank']},
    {key: 'dapo_nomorrekeningbank',             configRender:{type:'field', id: 'dapo_nomorrekeningbank',             render:(row)=>row.dapo_nomorrekeningbank},                               aliases:['nomor rekening bank']},
    {key: 'dapo_rekeningatasnama',              configRender:{type:'field', id: 'dapo_rekeningatasnama',              render:(row)=>row.dapo_rekeningatasnama},                               aliases:['rekening atas nama']},
    {key: 'dapo_layakpip',                      configRender:{type:'field', id: 'dapo_layakpip',                      render:(row)=>row.dapo_layakpip},                               aliases:['layak pip (usulan dari sekolah)']},
    {key: 'dapo_alasanlayakpip',                configRender:{type:'field', id: 'dapo_alasanlayakpip',                render:(row)=>row.dapo_alasanlayakpip},                               aliases:['alasan layak pip']},
    {key: 'dapo_kebutuhankhusus',               configRender:{type:'field', id: 'dapo_kebutuhankhusus',               render:(row)=>row.dapo_kebutuhankhusus},                               aliases:['kebutuhan khusus']},
    {key: 'dapo_sekolahasal',                   configRender:{type:'field', id: 'dapo_sekolahasal',                   render:(row)=>row.dapo_sekolahasal},                               aliases:['sekolah asal']},
    {key: 'dapo_anakkeberapa',                  configRender:{type:'field', id: 'dapo_anakkeberapa',                  render:(row)=>row.dapo_anakkeberapa},                               aliases:['anak ke-berapa']},
    {key: 'dapo_lintang',                       configRender:{type:'field', id: 'dapo_lintang',                       render:(row)=>row.dapo_lintang},                               aliases:['lintang']},
    {key: 'dapo_bujur',                         configRender:{type:'field', id: 'dapo_bujur',                         render:(row)=>row.dapo_bujur},                               aliases:['bujur']},
    {key: 'nokk',                               configRender:{type:'field', id: 'nokk',                               render:(row)=>row.nokk},                               aliases:['no kk']},
    {key: 'dapo_beratbadan',                    configRender:{type:'field', id: 'dapo_beratbadan',                    render:(row)=>row.dapo_beratbadan},                               aliases:['berat badan']},
    {key: 'dapo_tinggibadan',                   configRender:{type:'field', id: 'dapo_tinggibadan',                   render:(row)=>row.dapo_tinggibadan},                               aliases:['tinggi badan']},
    {key: 'dapo_lingkarkepala',                 configRender:{type:'field', id: 'dapo_lingkarkepala',                 render:(row)=>row.dapo_lingkarkepala},                               aliases:['lingkar kepala']},
    {key: 'dapo_jumlahsaudarakandung',          configRender:{type:'field', id: 'dapo_jumlahsaudarakandung',          render:(row)=>row.dapo_jumlahsaudarakandung},                               aliases:['jml. saudara kandung']    },
    {key: 'dapo_jarakrumahkesekolah',           configRender:{type:'field', id: 'dapo_jarakrumahkesekolah',           render:(row)=>row.dapo_jarakrumahkesekolah},                               aliases:['jarak rumah ke sekolah (km)']    },

]