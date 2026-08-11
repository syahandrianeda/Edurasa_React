import { useModal } from "~/components/modals/modal-provider"
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components"
import TableWithScrolling from "~/components/tabels/table-with-scrolling"
import { useAppSelector } from "~/context-reduct/hook"
import { OrmTendikInstance } from "~/context-reduct/selectores/orm-tendik-selector"
import SwitchTriggerModalEditAkun from "~/controllers/tendik/triger-modal/edit-pangkat-golongan"

export default function GolonganPangkatPtkGuruPage(){
    const Data = useAppSelector(OrmTendikInstance)
    const {actions} = useModal()
    return (
        <div className="p-1">
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <THEduraFreeze stateFreeze={true} rowSpan={2} className="print:hidden">Aksi</THEduraFreeze>
                        <ThEdura rowSpan={2}>No</ThEdura>
                        <ThEdura rowSpan={2}>Nama Guru</ThEdura>
                        <ThEdura rowSpan={2}>Jabatan</ThEdura>
                        <ThEdura rowSpan={2}>NIP</ThEdura>
                        <ThEdura rowSpan={2}>Status</ThEdura>
                        <ThEdura colSpan={4}>Golongan Pangkat Terakhir</ThEdura>
                        <ThEdura rowSpan={2}>Tgl Mulai di Sekolah</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                            <ThEdura>Tgl</ThEdura>
                            <ThEdura>Pangkat</ThEdura>
                            <ThEdura>Golongan</ThEdura>
                            <ThEdura>Ruang</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        Data.getIdDanPangkatCurrent(new Date()).map((item, i)=>
                            <TRowEdura key={item.idbaris}>
                                <TdEduraFreeze stateFreeze={true}>
                                    < SwitchTriggerModalEditAkun actions={actions} data={item}/>
                                </TdEduraFreeze>
                                <TdEdura>{i+1}</TdEdura>
                                <TdEdura>{item.nama_guru}</TdEdura>
                                <TdEdura>{item.jabatan}</TdEdura>
                                <TdEdura>{item.nip}</TdEdura>
                                <TdEdura className="uppercase">{item.asn}</TdEdura>
                                <TdEdura>{item.current_golongan_pangkat?.start_at?.toLocaleDateString('id-ID',{dateStyle:'long'})}</TdEdura>
                                <TdEdura>{item.current_golongan_pangkat?.pangkat}</TdEdura>
                                <TdEdura>{item.current_golongan_pangkat?.golongan}</TdEdura>
                                <TdEdura>{item.current_golongan_pangkat?.ruang}</TdEdura>
                                <TdEdura>{item.start_at_school?.toLocaleDateString('id-ID', {dateStyle:'long'})}</TdEdura>
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
        </div>
    )
}