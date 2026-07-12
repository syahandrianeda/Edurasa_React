import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { Soal } from "../type";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";


type Props = {
    data: Soal[];
};

export function PreviewSoalTable({
    data,
}: Props) {
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>No</ThEdura>
                    <ThEdura>TP</ThEdura>
                    <ThEdura>Indikator</ThEdura>
                    <ThEdura>LK</ThEdura>
                    <ThEdura>Soal</ThEdura>
                    <ThEdura>Opsi</ThEdura>
                    <ThEdura>Jawaban</ThEdura>
                </TRowEdura>
            </thead>

            <tbody>
                {data.map(
                    (item, index) => (
                        <TRowEdura key={index}>
                            <TdEdura>
                                {index + 1}
                            </TdEdura>

                            <TdEdura>
                                <div  className="text-wrap"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item.tp,
                                    }}
                                />
                            </TdEdura>
                            <TdEdura>
                                <div  className="text-wrap"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item.indikator_soal,
                                    }}
                                />
                            </TdEdura>
                            <TdEdura>
                                <div  className="text-wrap"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item.lk,
                                    }}
                                />
                            </TdEdura>

                            <TdEdura>
                                <div  className="text-wrap"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item.soal,
                                    }}
                                />
                            </TdEdura>

                            <TdEdura>
                                {item.opsi.map(
                                    (
                                        opsi
                                    ) => (
                                        <div className="flex gap-2"
                                            key={
                                            
                                                opsi.kode
                                            }
                                        >
                                            <b>
                                                {
                                                    opsi.kode
                                                }
                                            </b>

                                            <div  className="text-wrap"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        opsi.isi,
                                                }}
                                            />
                                        </div>
                                    )
                                )}
                            </TdEdura>

                            <TdEdura>
                                <div className="text-wrap"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            item.jawaban,
                                    }}
                                />
                            </TdEdura>
                        </TRowEdura>
                    )
                )}
            </tbody>
        </TableWithScrolling>
    );
}