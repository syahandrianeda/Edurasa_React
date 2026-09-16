import type { kopKontentType } from "./config-kop";
import logokota from '../../../images/kotadepok.webp'
import logoSekolah from '../../../images/ratujaya1.png';
import { currentTapel } from "~/lib/current-tapel";
import { ALAMAT_DIGITAL, ALAMAT_JALAN, ALAMAT_KECAMATAN, IDENTITAS_SEKOLAH, INSTANSI_OPD, INSTANSI_PEMERINTAH } from "~/domain/identitas_sekolah/identitas-sekolah";

export const SampleDefaultKontenKop: kopKontentType[] =[
    { type:'none',
        label:'Tidak Menyertakan',
        description:'Jangan ada KOP Surat'
    },
    { type: 'kop1',
        label:'KOP 1',
        description: 'KOP 1 berisi logo Kota dan Identitas Instansi',
        dataColumn:[
            {
                isLogo:true,
                srcLogo: logokota,
            },
            {
                isLogo:false,
                content: <TextKontenKop/>
            }

        ]
    },
    { type: 'kop2',
        label:'KOP 2',
        description: 'KOP 2 berisi logo Kota, Identitas Instansi, dan logo sekolah',
        dataColumn:[
            {
                isLogo:true,
                srcLogo: logokota,
            },
            {
                isLogo:false,
                content: <TextKontenKop/>
            },
            {
                isLogo:true,
                srcLogo:logoSekolah
            }

        ]
    },
    { type: 'kop3',
        label:'KOP 3',
        description: 'KOP 3 berisi logo Kota, Identitas Instansi, dan logo sekolah. Umumnya dipakai untuk KOP Soal',
        dataColumn:[
            {
                isLogo:true,
                srcLogo: logokota,
            },
            {
                isLogo:false,
                content: <TextKontenKopSoal/>
            },
            {
                isLogo:true,
                srcLogo: logoSekolah
            }

        ]
    },
]
export function TextKontenKop({
    pertama     = INSTANSI_PEMERINTAH,//'Pemerintah Kota Depok',
    kedua       = INSTANSI_OPD,//'Dinas Pendidikan',
    ketiga      = IDENTITAS_SEKOLAH,//'UPTD SDN Ratujaya 1',
    alamat_1    = 'Alamat: '+ ALAMAT_JALAN,//'Alamat: Jl. SMP Ratujaya No. 41, RT 05/RW 03, Kel. Ratujaya',
    alamat_2    = ALAMAT_DIGITAL,//'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net'
}:{
    pertama?: string,
    kedua?: string,
    ketiga?: string,
    alamat_1?:string,
    alamat_2?: string

}){
    return (
        <>
            <p className="text-center font-arial uppercase font-bold text-2xl mb-0 leading-none">{pertama}</p>
            <p className="text-center font-arial uppercase font-bold text-2xl mb-0 leading-none">{kedua}</p>
            <p className="text-center font-arial uppercase font-extrabold text-4xl mb-1 mt-0 leading-none">{ketiga}</p>
            <p className="text-center font-arial text-sm mb-0 leading-none">{alamat_1}</p>
            <p className="text-center font-arial text-sm mb-0 leading-none">{alamat_2}</p>
        </>
    )
}

export function TextKontenKopSoal({
    pertama     = 'Naskah Soal',
    kedua       = IDENTITAS_SEKOLAH,//'UPTD SDN Ratujaya 1',
    ketiga      = ALAMAT_KECAMATAN,//'Kecamatan Cipayung',
    alamat_1    = currentTapel({variant:'full'}),
    alamat_2   ,// = 'NPSN: 20228914 | Email: uptdsdnratujaya1@gmail.com, web: www.sdnratujaya1.net'
}:{
    pertama?: string,
    kedua?: string,
    ketiga?: string,
    alamat_1?:string,
    alamat_2?: string

}){
    return (
        <>
        <p contentEditable={true} spellCheck={false} suppressContentEditableWarning className="text-center font-arial uppercase font-bold text-2xl mb-0 leading-none">{pertama}</p>
        <p contentEditable={true} spellCheck={false} suppressContentEditableWarning className="text-center font-arial uppercase font-bold text-4xl mb-0 leading-none">{kedua}</p>
        <p contentEditable={true} spellCheck={false} suppressContentEditableWarning className="text-center font-arial uppercase font-extrabold text-2xl mb-1 mt-0 leading-none">{ketiga}</p>
        <p contentEditable={true} spellCheck={false} suppressContentEditableWarning className="text-center font-arial text-xl mb-0 leading-none">{alamat_1}</p>
            {alamat_2 && <p className="text-center font-arial  mb-0 leading-none">{alamat_2}</p>}
        </>
    )
}