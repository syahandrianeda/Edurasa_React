import { useModal } from "~/components/modals/modal-provider";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";

export default function InfoResumeSuratKeluarLainnya(){
    const {state, actions } = useModal<DataOrmSuratKeluarType>()
    const dataForm = state.payload
    
    
    return (
        <div className="border m-3 flex flex-col gap-2  max-h-svh overflow-y-auto scrol-h-custom">
            <h3 className="font-bold uppercase text-center mb-3">Informasi Surat Keluar</h3>
            <TableWithScrolling className="border-none md:w-10/12 w-full mx-auto">
                <tbody>
                    <tr>
                        <td className="px-1 w-3/12 text-nowrap">Jenis Surat</td>
                        <td className="w-1">:</td>
                        <td className="px-1 w-9/12">{dataForm?.indekssurat || 'Lainnya (belum diindex)'}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">No Surat Keluar</td>
                        <td>:</td>
                        <td className="px-1">{dataForm?.nosurat ?? ''}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Tanggal dikeluarkan</td>
                        <td>:</td>
                        <td className="px-1">{dataForm?.tglsurat.toLocaleDateString('id-ID', {dateStyle:'full'})}</td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Surat Ditujukan Kepada</td>
                        <td>:</td>
                        <td className="px-1">
                            {dataForm?.ditujukkankepada}
                        </td>
                    </tr>
                    <tr>
                        <td className="px-1 text-nowrap">Dibuat/diarsipkan oleh</td>
                        <td>:</td>
                        <td className="px-1">
                            {dataForm?.oleh}
                        </td>
                    </tr>
                </tbody>
            </TableWithScrolling>
        </div>
    )
}