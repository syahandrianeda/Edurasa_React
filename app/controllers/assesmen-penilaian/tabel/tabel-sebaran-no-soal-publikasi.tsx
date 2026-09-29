import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmen, GroupSebaranNoSoalFromPropertyKurikulum } from "~/domain/penilaian/model/grouping-kurikulum-by-bentuksoal";

export default function TableSebaranNoSoalPadaPublikasi ({data}:{data: GroupSebaranNoSoalFromPropertyKurikulum}){
    const {koleksiBentukSoal, data:sourceData} = data
    return (
        <TableWithScrolling inModal={true}>
            <thead>
                <TRowEdura>
                        <ThEdura className="capitalize" rowSpan={2}>Mata Pelajaran</ThEdura>
                        <ThEdura rowSpan={2}>CP</ThEdura>
                        <ThEdura rowSpan={2}>TP</ThEdura>
                        <ThEdura rowSpan={2}>ATP</ThEdura>
                        <ThEdura className="text-wrap capitalize" colSpan={koleksiBentukSoal.length}>Sebaran no. Soal pada Bentuk Soal</ThEdura>
                        {/* <ThEdura rowSpan={2} className="text-wrap capitalize">Skor Maksimal</ThEdura> */}
                    </TRowEdura>
                    <TRowEdura>
                        {
                            koleksiBentukSoal.map((bentukSoal, iBentukSoal)=>
                                <ThEdura key={bentukSoal.name}>{bentukSoal.description}</ThEdura>
                            )
                        }
                    </TRowEdura>
            </thead>
            <tbody>
                {
                    sourceData.map((mapel, iMapel)=>
                        mapel.dataCp.map((Cp, iCp)=>
                            Cp.dataTp.map((Tp, iTp)=>
                                Tp.dataAtp.map((Atp, iAtp)=>
                                    <TRowEdura key={iAtp+'_'+iTp+'_'+iCp+'_'+iMapel}>
                                        {
                                            iCp === 0 && iTp === 0 && iAtp === 0 && (
                                                <TdEdura className="text-wrap" rowSpan={mapel.slotRow}>{mapel.mapelName} ({Tp.dataAtp.length})</TdEdura>
                                            )
                                        }
                                        {
                                            iTp === 0 && iAtp === 0 && (
                                                <TdEdura className="text-wrap" rowSpan={Cp.slotRow}>{Cp.cp_description}</TdEdura>
                                            )
                                        }
                                        {
                                            iAtp === 0 && (
                                                <TdEdura className="text-wrap" rowSpan={Tp.slotRow}>{Tp.tp_description}</TdEdura>
                                            )
                                        }
                                        <TdEdura className="text-wrap">[{Atp.atp_id}] {Atp.atp_description}</TdEdura>
                                        {
                                            koleksiBentukSoal.map((bentuk, iName)=>{
                                                const founded = Atp.dataBentukSoal.find(s=>s.bentukSoal===bentuk.name)
                                                return (
                                                    <TdEdura className="text-wrap" key={bentuk.name}>{founded && founded.data.map((soal, iSoal)=>
                                                        <span key={soal + '_'+iSoal}>{soal.no_soal}, </span>
                                                    )}</TdEdura>
                                                )
                                            }
                                            )
                                        }
                                    </TRowEdura>
                            )
                        ))
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}