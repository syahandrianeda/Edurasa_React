import { TRowEdura, TdEdura } from "~/components/tabels/tabel-components";
import { abjadToIndex, hitungSkorPgTunggal, type HandleUpdateResponKoreksi } from "~/domain/bank-soal/koreksi";
import { cn } from "~/lib/utils";
import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";
import PopoverPreviewSoalPgKoreksian from "./popover-preview-soal-pg-koreksian";
import { useAppSelector } from "~/context-reduct/hook";
import { DtoBankSoalSelector } from "~/context-reduct/selectores/bank-soal-selector";
import { useMemo } from "react";

export function KoreksiPgBody({ data, handleUpdate }: { data: DataTemplateKoreksiSiswa[]; handleUpdate: HandleUpdateResponKoreksi; }) {
    // const bankSoal = useAppSelector(DtoBankSoalSelector);
    // const data = useMemo(()=>{
    //     if(!bankSoal) return [];
        
    //     return dataAsal.map(m=>{
    //         const soal = bankSoal.find(s=>s.idbaris === m.soal?.idbaris)
    //         return {
    //             ...m,
    //             soal
    //         }
    //     })
    // },[dataAsal,bankSoal])
    const countPg3 = data.every(m => m?.soal?.json_alat_jawab?.OpsiPilihanJawaban[3]?.content === '');
    

    return (
        <tbody>
            {data.map(({ soal, no_prefix, respon }, index) => {
                const valid = soal?.json_alat_jawab?.valid as number[] | undefined;
                const responSaatIni = respon?.respon ?? '';
                const skorSaatIni = hitungSkorPgTunggal(valid, abjadToIndex(responSaatIni));
                return (
                    <TRowEdura key={no_prefix}>
                        <TdEdura>{no_prefix}</TdEdura>
                        {

                            soal ? (soal?.json_alat_jawab?.OpsiPilihanJawaban?.map((opsi) => {
                                const abjad = String.fromCharCode(opsi.index + 65);
                                const isSelected = abjad === responSaatIni;
                                const radioId = "pg_" + no_prefix + "_" + abjad;
                                if (opsi.index >= 3 && countPg3) return null;

                                return (
                                    <TdEdura key={opsi.index} className={cn('p-0 align-middle text-center',isSelected?'bg-green-400':'bg-inherit')}>
                                        <label htmlFor={radioId} className="p-2 cursor-pointer">{abjad}</label>
                                        <input
                                            type="radio"
                                            id={radioId}
                                            name={"pg_" + no_prefix}
                                            className="hidden"
                                            value={abjad}
                                            checked={isSelected}
                                            onChange={()=>handleUpdate('pg', no_prefix, {
                                                respon: abjad,
                                                skor: hitungSkorPgTunggal(valid, opsi.index)
                                            })}
                                        />
                                    </TdEdura>
                                );
                            } )):(
                                <TdEdura colSpan={countPg3?3:4}/>
                            )
                        }
                        <TdEdura className={`${skorSaatIni ? 'bg-sky-300' : 'bg-rose-300'} border-x-2 border-x-double text-center`}>{responSaatIni}</TdEdura>
                        <TdEdura className="text-center">{(valid ?? []).map(m => String.fromCharCode(m + 65)).join(',')}</TdEdura>

                        <TdEdura className="text-center">{skorSaatIni}</TdEdura>
                        <TdEdura className="text-center">
                            {/* <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="py-0 px-1 text-[10px] h-4 bg-sky-600 cursor-pointer"
                                    >
                                        Lihat Soal
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="md:w-160 md:max-h-90 text-[10px] overflow-y-auto scrol-h-custom">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold">
                                            Soal No. {no_prefix}
                                        </h4>
                                        <div className="text-wrap">
                                            <ItemSoalPreview data={{index, no_soal:no_prefix, data_soal:soal,showStimulus:true, format_display:'vertical' }}/>
                                            <p className="border-t-2">Jawaban: {soal?.jawaban.join('')}</p>
                                            <div className="editor-dokument" dangerouslySetInnerHTML={{__html:soal?.pembahasan_penskoran ?? ''}}/>
                                        </div>
                                        {
                                            soal && <UbahKunciJawabanDiKoreksian dataSoal={soal}/>
                                        }
                                    </div>
                                </PopoverContent>
                            </Popover> */}
                            <PopoverPreviewSoalPgKoreksian soal={soal} no_prefix={no_prefix} index={index}/>
                        </TdEdura>
                    </TRowEdura>

                );
            }

            )}
        </tbody>
    );
}
