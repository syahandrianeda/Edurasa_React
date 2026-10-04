import { TRowEdura, TdEdura } from "~/components/tabels/tabel-components";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import ItemSoalPreview from "~/controllers/paket-soal/components/item-soal-preview";
import { abjadToIndex, hitungSkorPgTunggal, type HandleUpdateResponKoreksi } from "~/domain/bank-soal/koreksi";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { DataTemplateKoreksiSiswa } from "~/types/penilaian/DataTemplateKoreksiSiswa";

export function KoreksiPgBody({ data, handleUpdate }: { data: DataTemplateKoreksiSiswa[]; handleUpdate: HandleUpdateResponKoreksi; }) {
    const countPg3 = data.every(m => m.soal.json_alat_jawab?.OpsiPilihanJawaban[3]?.content === '');

    const showPopOver = (soal:BankSoalAppType)=>{
        console.log(soal)
    }
    return (
        <tbody>
            {data.map(({ soal, no_prefix, respon }, index) => {
                const valid = soal.json_alat_jawab?.valid as number[] | undefined;
                const responSaatIni = respon?.respon ?? '';
                const skorSaatIni = hitungSkorPgTunggal(valid, abjadToIndex(responSaatIni));
                return (
                    <TRowEdura key={no_prefix}>
                        <TdEdura>{no_prefix}</TdEdura>
                        {soal.json_alat_jawab?.OpsiPilihanJawaban?.map((opsi) => {
                            const abjad = String.fromCharCode(opsi.index + 65);
                            const isSelected = abjad === responSaatIni;
                            const radioId = "pg_" + no_prefix + "_" + abjad;
                            if (opsi.index > 3 && countPg3) return null;

                            return (
                                <TdEdura key={opsi.index} className={isSelected ? 'bg-green-300' : 'bg-inherits'}>
                                    <label htmlFor={radioId} className="h-full w-full cursor-pointer">{abjad}</label>
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
                        }

                        )}
                        <TdEdura className={`${skorSaatIni ? 'bg-sky-300' : 'bg-rose-300'} border-x-2 border-x-double text-center`}>{responSaatIni}</TdEdura>
                        <TdEdura className="text-center">{(valid ?? []).map(m => String.fromCharCode(m + 65)).join(',')}</TdEdura>

                        <TdEdura className="text-center">{skorSaatIni}</TdEdura>
                        <TdEdura className="text-center">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="py-0 px-1 text-[10px] h-4 bg-sky-600 cursor-pointer"
                                    >
                                        Lihat Soal
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="md:max-w-160 text-[10px] overflow-y-auto scrol-h-custom">
                                    <div className="space-y-3">
                                        <h4 className="font-semibold">
                                            Soal No. {no_prefix}
                                        </h4>
                                        <div className="text-wrap">
                                            <ItemSoalPreview data={{index, no_soal:no_prefix, data_soal:soal,showStimulus:true, format_display:'vertical' }}/>
                                            <p className="border-t-2">Jawaban: {soal.jawaban.join('')}</p>
                                            <div className="editor-dokument" dangerouslySetInnerHTML={{__html:soal.pembahasan_penskoran}}/>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TdEdura>
                    </TRowEdura>

                );
            }

            )}
        </tbody>
    );
}
