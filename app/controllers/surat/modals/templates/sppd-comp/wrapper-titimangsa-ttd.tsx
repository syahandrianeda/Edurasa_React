import type { SppdAppType } from "~/types/surat/sppd-app-type";
import PenandaTanganSppd from "./penandatanganan-sppd";
import TitiMangsaSppd from "./titimangsa";

export default function WrapperTitimangsaTtd({data}:{data:SppdAppType}){
    return (
        <div className="flex justify-end mt-4">
            <div className="w-fit">
                <TitiMangsaSppd data={data}/>
                <PenandaTanganSppd atasan={data}/>
            </div>
        </div>
    )
}