import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { FilterValues } from "~/lib/filtering-koleksi-data/type";
import { useAppSelector } from "~/context-reduct/hook";
import { CurrentMapelInActiveRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { useCallback } from "react";

type BankSoalFilterKey =
    'bentuk_soal' | 'kode_mapel';

type BankSoalFilterType = FilterValues<
    Pick<
        BankSoalAppType,
        BankSoalFilterKey
    >
>;

export default function BankSoalFilter({
    setFilter,
    filters
}: {
    setFilter: <K extends BankSoalFilterKey>(
        key: K,
        value: BankSoalFilterType[K]
    ) => void;

    filters: BankSoalFilterType;
}) {
    const mapel = useAppSelector(CurrentMapelInActiveRombel);
    const definisiMapel = useCallback((kodemapel:string)=>{
        return mapel.data.find(s=>s.kode === kodemapel)?.nama_mapel
    },[mapel])
   
    return (
        <>
         {
            filters.kode_mapel ? (<h3 className="text-center font-bold uppercase mb-7">{definisiMapel(filters.kode_mapel as string) ?? 'Semua Mata Pelajaran'}</h3>):(<h3 className="text-center font-bold uppercase mb-7">Semua Mata Pelajaran</h3>)
        }
            <div className="flex gap-2 w-3/4 print:hidden mb-2">
                <Select
                    value={filters.bentuk_soal as string ?? ''}
                    onValueChange={value => {
                        setFilter(
                            'bentuk_soal',
                            value || undefined
                        );
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Bentuk Soal"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Pilih Semua Jenis Bentuk Soal</SelectItem>
                        {
                            ListBentukSoal.map((bentukSoal, ibentukSoal)=>
                                <SelectItem key={ibentukSoal} value={bentukSoal.name}>{bentukSoal.description}</SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>

                <Select
                    value={filters.kode_mapel as string ?? ''}
                    onValueChange={value => {
                        setFilter(
                            'kode_mapel',
                            value || undefined
                        );
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Mapel"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Pilih Semua Mapel</SelectItem>
                    {
                        mapel.data.map((m,i)=>
                            <SelectItem key={i} value={m.kode}>{m.nama_mapel}</SelectItem>
                        )
                    }

                    </SelectContent>
                </Select>
            </div>
        </>
    );
} 