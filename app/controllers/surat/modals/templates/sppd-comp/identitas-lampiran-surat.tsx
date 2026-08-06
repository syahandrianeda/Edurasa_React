export default function IdentitasLampiranSuratKeluar({lembarKe, prefix, nomorSurat}:{lembarKe:number, prefix:string, nomorSurat:string}){
    return(
        <div className="flex justify-end mt-4 mb-2">
            <table className="w-fit leading-4 text-[12px]">
                <tbody>
                    <tr>
                        <td className="px-2">Lembar ke</td>
                        <td>:</td>
                        <td className="px-2 text-end">{lembarKe}</td>
                    </tr>
                    <tr>
                        <td className="px-2">Kode No</td>
                        <td>:</td>
                        <td className="px-2 text-end">{prefix}</td>
                    </tr>
                    <tr>
                        <td className="px-2">Nomor</td>
                        <td>:</td>
                        <td className="px-2 text-end">{nomorSurat}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}