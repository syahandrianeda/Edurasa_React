import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import {Fragment} from 'react';


export default function ListPtkSuratPerintah({data}:{data:DataOrmSuratKeluarType}){
    return (
        <table className="inline mt-2">
                <tbody>
                    {
                        data.dataTemplate?.personalSppdType && data.dataTemplate?.personalSppdType.map((m,i)=>
                            <Fragment key={i}>
                                    <tr>
                                        <td rowSpan={5} className="align-top px-2">{i+1}.</td>
                                    </tr>

                                    <tr>
                                        <td className="px-2">Nama</td>
                                        <td className="px-2">:</td>
                                        <td className="px-2">{m.ptk_nama}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2">Pangkat/Golongan</td>
                                        <td className="px-2">:</td>
                                        <td className="px-2">{m.ptk_golongan}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2">NIP</td>
                                        <td className="px-2">:</td>
                                        <td className="px-2">{m.ptk_nip}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2">Jabatan</td>
                                        <td className="px-2">:</td>
                                        <td className="px-2">{m.ptk_jabatan}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>&nbsp;</td>
                                    </tr>
                            </Fragment>
                        )
                    }
                </tbody>
            </table>
    )
}