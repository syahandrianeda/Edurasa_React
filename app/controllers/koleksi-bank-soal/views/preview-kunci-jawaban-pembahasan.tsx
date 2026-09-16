import {useMemo} from 'react';
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import KunciJawabanPreview from './kunci-jawaban-preview';
import { cn } from '~/lib/utils';

export default function PreviewKunciJawaban({data, className}:{data:BankSoalAppType, className?:string}){
    const isExistKunciJawaban= useMemo(()=>['pg', 'pg_kompleks','menjodohkan', 'benar_salah'].includes(data.bentuk_soal),[data.bentuk_soal]);
    return (
        <div className={cn('mt-2', className)}>
            {
                isExistKunciJawaban && (
                    <div className='flex gap-2'>
                        <strong>Kunci Jawaban: </strong>
                        <div>
                            <KunciJawabanPreview data={data.jawaban as string[]}/>
                        </div>
                    </div>
                )
            }
            <div className='font-bold'>Pembahasan/Penskoran:</div>
            <div dangerouslySetInnerHTML={{__html:data.pembahasan_penskoran}} className='text-wrap'/>
        </div>
    )
}