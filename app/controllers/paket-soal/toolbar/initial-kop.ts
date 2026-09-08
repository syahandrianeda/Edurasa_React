import type { kopColumn } from "~/components/toolbars/kop-ttd/config-kop";

import logokota from '../../../images/kotadepok.webp'
import logoSekolah from '../../../images/ratujaya1.png';
import { ALAMAT_KECAMATAN, IDENTITAS_SEKOLAH, INSTANSI_OPD, INSTANSI_PEMERINTAH } from '~/domain/identitas_sekolah/identitas-sekolah';
import { currentTapel } from '~/lib/current-tapel';

export const initialKopSoal:kopColumn[] = [
    {
        isLogo:true,
        srcLogo:logokota
    }, 
    {
        isLogo:false,
        content:`<p class="text-center font-arial uppercase font-bold text-2xl mb-0 leading-none">ULANGAN</p>
        <p class="text-center font-arial uppercase font-extrabold text-4xl mb-0 leading-none">${IDENTITAS_SEKOLAH}</p>
        <p class="text-center font-arial uppercase font-extrabold text-2xl mb-1 mt-0 leading-none">${ALAMAT_KECAMATAN}</p>
        <p class="text-center font-arial text-xl mb-0 leading-none">${currentTapel({variant:'full'})}</p>`
    },
    {
        isLogo:true,
        srcLogo:logoSekolah
    }

]

export const initialStringKop:string[] =[
    'ULANGAN HARIAN',
    IDENTITAS_SEKOLAH.toUpperCase(),
    ALAMAT_KECAMATAN.toUpperCase(),
    currentTapel({variant:'full'})
]