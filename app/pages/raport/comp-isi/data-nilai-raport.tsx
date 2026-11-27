import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { DtoMapelSelector } from "~/context-reduct/selectores/mapel-selector";
import {Fragment, useMemo} from 'react';
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { SiswaType } from "~/types/siswa";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import { MapelRaportCurrentRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";

type Props = {
    siswa:SiswaType|null
}
export default function DataNilaiRaport({siswa}:Props){
    const mapelSelector = useAppSelector(MapelRaportCurrentRombel)?.data;
    const koleksiMapel = useMemo(()=>{
        if(!mapelSelector) return [];
        const mapelSiswa = mapelSelector?.filter(s=>s.data_students.some(peserta=>peserta.id === siswa?.id));
        const mapperKelompok = new Map<string, jp_mapelApp[]>();
        for(const mapel of mapelSiswa){
            const currentMapel = getOrCreateMap(mapperKelompok, mapel.source.grup, ()=>([]));
            currentMapel.push(mapel)
        }
        return [...mapperKelompok.entries()].map(([kelompok, dataMapel])=>{
            return {
                kelompok, 
                dataMapel
            }
        })
    }, [mapelSelector, siswa])
    return(
        <TableWithScrolling className="w-full">
            <thead>
                <TRowEdura>
                    <ThEdura className="">No</ThEdura>
                    <ThEdura className="w-3/12">Mata Pelajaran</ThEdura>
                    <ThEdura className="">Nilai Akhir</ThEdura>
                    <ThEdura className="w-7/12">Capaian Pembelajaran</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    koleksiMapel.map((mapel, iMapel)=>
                        mapel.dataMapel.map((dataMapel, iData)=>

                        <Fragment key={mapel.kelompok + iMapel + dataMapel.kode + iData}>
                            {
                                iData === 0 && (
                                    <TRowEdura>
                                        <TdEdura colSpan={4}>Kelompok {mapel.kelompok}</TdEdura>
                                    </TRowEdura>
                                )
                            }
                            <TRowEdura>
                                <TdEdura className="text-center">{dataMapel.index_in_rombel +1}</TdEdura>
                                <TdEdura className="text-wrap">{dataMapel.nama_mapel_ijazah}</TdEdura>
                                <TdEdura/>
                                <TdEdura/>
                            </TRowEdura>
                        </Fragment>
                        )
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}