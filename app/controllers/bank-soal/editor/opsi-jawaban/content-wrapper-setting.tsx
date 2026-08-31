import type { ReactNode } from "react";
import type { FormatElemen, ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";

export default function ContentWrapperOpsi({children, formatOpsi, bentukSoal}:{children:ReactNode, formatOpsi?:FormatElemen, bentukSoal:ListBentukSoalType}){
    
    return (
        <div className="border bg-white p-1 rounded text-xs flex flex-col md:flex-row gap-2 justify-between">
            <table className="w-full text-[10px]">
                <tbody>
                    <tr>
                        <td className="px-2 w-12 text-nowrap">Bentuk Soal</td>
                        <td className="w-1 px-2">:</td>
                        <td className="px-2">{bentukSoal.description}</td>
                    </tr>
                    <tr>
                        <td className="px-2 w-12 text-nowrap">Pengoreksian</td>
                        <td className="w-1 px-2">:</td>
                        <td className="px-2">{bentukSoal.way_correction}</td>
                    </tr>
                    {
                        ['pg', 'pg_kompleks', 'menjodohkan' ].includes(bentukSoal.name) && (
                            <tr>
                                <td className="px-2 w-12 text-nowrap">Format Opsi Pilihan</td>
                                <td className="w-1 px-2">:</td>
                                <td className="px-2">{formatOpsi === 'table'?'format opsi tabel':'format opsi umum (A, B, C, atau D seperti umumnya)'}</td>
                            </tr>

                        )
                    }
                </tbody>
            </table>
            <div className="flex justify-between w-1/2 gap-4 align-center">
            {
                children
            }
            </div>
            </div>
    )
}