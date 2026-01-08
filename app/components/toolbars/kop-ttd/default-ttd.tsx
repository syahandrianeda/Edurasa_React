import type { ttdKontenType } from "./config-ttd";

export const SampleKontenTtdType:ttdKontenType[] = [
    {type:'none',
        label:'Tidak Disertakan',
        forRole:[
            'admin',
            'Kepala Sekolah',
            'Guru Kelas',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Jangan tampilkan tanda tangan'
    },
    {type: 'kepsek',
        label: 'Kepala Sekolah',
        forRole:[
            'admin',
            'Kepala Sekolah',
            'Guru Kelas',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan Tanda tangan Kepala sekolah',
        column: 1,
        dataColumns:[
            {
                side:'right',
                typePerson:'Kepala Sekolah',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Kepala Sekolah</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya',
        label: 'Saya',
        forRole:[
            'admin',
            'Kepala Sekolah',
            'Guru Kelas',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tampilkan Kolom Tanda tangan untuk saya',
        column: 1,
        dataColumns:[
            {
                side:'right',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Jabatan Saya</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'walas',
        label: 'Wali Kelas',
        forRole:[
            'admin',
            'Kepala Sekolah',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan Tanda Tangan Wali Kelas ini',
        column: 1,
        dataColumns:[
            {
                side:'right',
                typePerson:'walas',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya_kepsek',
        label: 'Saya dan Kepsek',
        forRole:[
            'admin',
            'Guru Kelas',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan kolom Tanda tangan Saya dan Kepala Sekolah',
        column: 2,
        dataColumns:[
            {
                side:'left',
                typePerson:'Kepala Sekolah',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Mengetahui,
                    </p>
                    <p className="text-center font-medium">Kepala Sekolah</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Jabatan Saya</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'walas_kepsek',
        label: 'Walikelas dan Kepsek',
        forRole:[
            'admin',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan kolom Wali kelas ini dan Kepala Sekolah',
        column: 2,
        dataColumns:[
            {
                side:'left',
                typePerson:'walas',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Mengetahui,
                    </p>
                    <p className="text-center font-medium">Kepala Sekolah</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'Kepala Sekolah',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Jabatan Saya</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya_walas',
        label: 'Saya dan Walikelas',
        forRole:[
            'admin',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan kolom tanda tangan saya dan Wali Kelas',
        column: 2,
        dataColumns:[
            {
                side:'left',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Jabatan Saya (Guru Bidang Studi),
                    </p>
                    <p className="text-center font-medium">Nama Tugas/Jabatan/Mata pelajaran</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'walas',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya_ortu',
        label: 'Saya dan Orang Tua',
        forRole:[
            'admin',
            'Kepala Sekolah',
            'Guru Kelas',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan kolom Tanda tangan antara saya dan Orang Tua/Forkom',
        column: 2,
        dataColumns:[
            {
                side:'left',
                typePerson:'ortu',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Jabatan Saya (Guru Bidang Studi),
                    </p>
                    <p className="text-center font-medium">Nama Tugas/Jabatan/Mata pelajaran</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'walas_ortu',
        label: 'Guru Kelas dan Orang Tua',
        forRole:[
            'admin',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan kolom tanda tangan antara Walikelas dan Orang Tua',
        column: 2,
        dataColumns:[
            {
                side:'left',
                typePerson:'ortu',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Jabatan Saya (Guru Bidang Studi),
                    </p>
                    <p className="text-center font-medium">Nama Tugas/Jabatan/Mata pelajaran</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'walas',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya_walas_ortu',
        label: 'Saya, Guru Kelas, dan Orang Tua',
        forRole:[
            'admin',
            'Kepala Sekolah',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan 3 kolom tanda tangan antara Saya, Wali Kelas ini, dan Orang Tua/Forkom',
        column: 3,
        dataColumns:[
            {
                side:'left',
                typePerson:'ortu',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Jabatan Saya (Guru Bidang Studi),
                    </p>
                    <p className="text-center font-medium">Nama Tugas/Jabatan/Mata pelajaran</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'middle',
                typePerson:'walas',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya_kepsek_walas',
        label: 'Saya, Guru Kelas, dan Kepala Sekolah',
        forRole:[
            'admin',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tambahkan 3 kolom tanda tangan antara Saya, Wali Kelas ini, dan Kepala Sekolah',
        column: 3,
        dataColumns:[
            {
                side:'left',
                typePerson:'Kepala Sekolah',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Jabatan Saya (Guru Bidang Studi),
                    </p>
                    <p className="text-center font-medium">Nama Tugas/Jabatan/Mata pelajaran</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'middle',
                typePerson:'walas',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
    {type: 'saya_kepsek_ortu',
        label: 'Saya, Kepala Sekolah, dan Orang Tua',
        forRole:[
            'admin',
            'Guru Kelas',
            'Guru Mapel',
            'Operator Sekolah',
            'TU'
        ],
        description:'Tampilkan 3 kolom tanda tangan antara Saya, Orang Tua/Forkom, dan Kepala Sekolah',
        column: 3,
        dataColumns:[
            {
                side:'left',
                typePerson:'Kepala Sekolah',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Jabatan Saya (Guru Bidang Studi),
                    </p>
                    <p className="text-center font-medium">Nama Tugas/Jabatan/Mata pelajaran</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'middle',
                typePerson:'ortu',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            },
            {
                side:'right',
                typePerson:'saya',
                contentTop:(<>
                    <p className="text-center" contentEditable={true}>
                        Kota Depok, {new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}
                    </p>
                    <p className="text-center font-medium">Wali Kelas</p>
                </>),
                countBreak: 5,
                contentBottom:(
                    <>
                    <p className="text-center font-bold underline">Yoce Magdalena, S.Pd.SD</p>
                    <p>NIP. </p>
                    </>
                ),
            }
        ]
    },
];