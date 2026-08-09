import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";

export default function DasarHukumSuratPerintahSpd({data}:{data:DataOrmSuratKeluarType}){
    return (
        <table className="my-4">
            <tbody>
                <tr>
                    <td className="align-top px-2">Dasar</td>
                    <td className="align-top px-2">:</td>
                    <td className="align-top px-2">
                        <p>Surat Undangan/Tugas dari {data?.dataSuratMasuk?.asalsurat}</p>
                        <p>No. {data?.dataSuratMasuk?.nosurat}</p>
                        <p>perihal {data.perihal}</p>
                    </td>
                </tr>
                <tr>
                    <td className="align-top px-2">Tanggal Surat</td>
                    <td className="align-top px-2">:</td>
                    <td className="align-top px-2">
                        {
                            data?.dataSuratMasuk?.tglsurat.toLocaleDateString('id-ID', {dateStyle:'full'})
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    )
}