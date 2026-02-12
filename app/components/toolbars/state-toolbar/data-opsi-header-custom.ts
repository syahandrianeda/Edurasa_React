import type { SiswaType } from "~/types/siswa";
import type { OptionDesignTableToolbar } from "./interface-design-table";
import { formatTanggalIndonesia, getParseDateYYYYMMMDD, hitungUmurTahun } from "~/lib/date-helper";
import { getGenderLabel } from "~/types/enums/gender";
import { getAgamaLabel } from "~/types/enums/agama";

export const OptionsDesignTableDefaultProps:OptionDesignTableToolbar<SiswaType>[] = [
    {
        labelDefault: 'No. Urut',
        type: 'index',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center']
        
    },
    {
        labelDefault: 'Token',
        type: 'field',
        key: 'id',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center'],
        resolverNode: (row)=>row.id,
    },
    {
        labelDefault: 'Jenjang',
        type: 'field',
        key:'jenjang',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center'],
        resolverNode: (row)=>row.jenjang,
        
    },
    {
        labelDefault: 'Rombel',
        type: 'field',
        key:'nama_rombel',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center'],
        resolverNode: (row)=>row.nama_rombel,
        
    },
    {
        labelDefault: 'Status',
        type: 'field',
        key:'aktif',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center'],
        resolverNode: (row)=>row.aktif,
        
    },
    {
        labelDefault: 'Nomor Induk Siswa',
        type: 'field',
        key:'nis',
        resolverSort:(row) => Number(String(row.nis).slice(-3)),
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>row.nis,
        
    },
    {
        labelDefault: 'NISN',
        type: 'field',
        key:'nisn',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>row.nisn,
        
    },
    {
        labelDefault: 'NIK',
        type: 'field',
        key:'nik',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>row.nik,
        
    },
    {
        labelDefault: 'Nomor KK',
        type: 'field',
        key:'nokk',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>row.nokk,
        
    },
    {
        labelDefault: 'Nama Siswa',
        type: 'field',
        key:'pd_nama',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>row.pd_nama,
        
    },
    {
        labelDefault: 'Gender',
        type: 'field',
        key:'pd_jk',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>getGenderLabel(row.pd_jk),
        
    },
    {
        labelDefault: 'Agama',
        type: 'field',
        key:'pd_agama',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>getAgamaLabel(row.pd_agama),
        
    },
    {
        labelDefault: 'Tempat Lahir',
        type: 'field',
        key:'pd_tl',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>row.pd_tl,
        
    },
    {
        labelDefault: 'Tanggal Lahir',
        type: 'field',
        key:'pd_tanggallahir',
        resolverSort:(row) => getParseDateYYYYMMMDD(row.pd_tanggallahir) as number,
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-start'],
        resolverNode: (row)=>formatTanggalIndonesia(row.pd_tanggallahir,{dateStyle:'long'}),
        
    },
    {
        labelDefault: 'Umur',
        type: 'field',
        key:'pd_tanggallahir',
        resolverSort:(row)=> hitungUmurTahun(row.pd_tanggallahir),
        resolverNode:(row)=> hitungUmurTahun(row.pd_tanggallahir),
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center']
        
    },
    {
        labelDefault: 'Nama Ayah',
        type: 'field',
        key:'pd_namaayah',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center'],
        resolverNode: (row)=>row.pd_namaayah,
        
    },
    {
        labelDefault: 'Nama Ibu',
        type: 'field',
        key:'pd_namaibu',
        classNamesHeader: ['text-center'],
        classNamesColumn: ['text-center'],
        resolverNode: (row)=>row.pd_namaibu,
        
    }
] 
