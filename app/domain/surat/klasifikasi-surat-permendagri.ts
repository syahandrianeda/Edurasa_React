export type KlasifikasiSuratKemendegriType = {
    idbaris?:number
    value: string,
    description: string,
    source?:string
    template?:string
}

export const KlasifikasiNoSurat:KlasifikasiSuratKemendegriType[]=[
    {
        value:'421.2',
        description:'Umum (untuk SD:422.1)',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'005',
        description:'Undangan',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'424.1',
        description:'Surat Keputusan (Administrasi Tanaga Pengajar)',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'424.2',
        description:'Surat Tugas (Administrasi Tenaga Pengajar)',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'424.3',
        description:'SPPD (Administrasi Tenaga Pengajar)',
        source:'Permendagri No.78 Th.2012',
        template:'SPPD'
    },
    {
        value:'424.4',
        description:'Surat Perintah Lainnya',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'424.5',
        description:'Surat Pengantar',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'422',
        description:'Surat Keterangan (umum)',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'422.6',
        description:'Surat Keterangan Siswa',
        source:'Permendagri No.78 Th.2012',
        template:'Surat Keterangan Aktif'
    },
    {
        value:'422.6.2',
        description:'Surat Keterangan Berkelakuan Baik',
        source:'Permendagri No.78 Th.2012',
        template:'Surat Keterangan Berkelakuan Baik'
    },
    {
        value:'422.7',
        description:'Surat Keterangan NISN',
        source:'Permendagri No.78 Th.2012',
        template: 'Surat Keterangan NISN'
    },
    {
        value:'422.8',
        description:'Surat Keterangan Diterima di sekolah',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'422.9',
        description:'Surat Keterangan Pindah sekolah',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'425',
        description:'Surat Sapras (Sarana dan Prasarana)',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'425.3',
        description:'Surat Permohonan Sapras (Sarana dan Prasarana)',
        source:'Permendagri No.78 Th.2012'
    },
    {
        value:'manual',
        description:'Input Manual',
        source:'Versi Guru'
    },
]