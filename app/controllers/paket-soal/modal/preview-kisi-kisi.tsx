import type { ModalState } from "~/components/modals/modal-provider";
import type { DataCpKisiKisiType } from "~/domain/paket-soal/entities/kisi-kisi-nested-map-type";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";

export default function PreviewKisiKisi ({state, version}:{state:ModalState<PaketSoalDesign>, version:'v1'|'v2'}){
    console.log(state.payload)
    return (
        <div className="border">
            Hello Kisi-kisi
        </div>
    )
}