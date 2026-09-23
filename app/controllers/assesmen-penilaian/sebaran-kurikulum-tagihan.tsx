import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default function SebaranTagihanKurikulum({kurikulum, isMultiple=false}:{kurikulum:AtpAsOrm[], isMultiple:boolean}){
    const mapelCount = [...new Set([...kurikulum.map(m=>m.kodemapel)])].length;
    const cpCount = [...new Set([...kurikulum.map(m=>m.cp_id)])].length;
    const tpCount = [...new Set([...kurikulum.map(m=>m.tp_as_cp_id)])].length
    return (
        <div className="flex w-full flex-col">
            {
                isMultiple && (
                    <div className="flex w-full justify-between border-b">
                        <p>{mapelCount}</p>
                        <p>Mapel</p>
                    </div>
                )
            }
            <div className="flex w-full justify-between border-b">
                <p>{cpCount}</p>
                <p>CP</p>
            </div>
            <div className="flex w-full justify-between border-b">
                <p>{tpCount}</p>
                <p>TP</p>
            </div>
            <div className="flex w-full justify-between border-b">
                <p>{kurikulum.length}</p>
                <p>ATP</p>
            </div>
            <div className="flex w-full justify-end border-b">
                Lihat detail di aksi
            </div>
        </div>
    )
}