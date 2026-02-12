import { useMemo } from "react";
import { useAppSelector } from "~/context-reduct/hook"
import { selectSiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { selectSiswaDapodikDTO } from "~/context-reduct/selectores/siswa-dapodik-selector";
import TableSinkronDapodik from "~/controllers/data-siswa-controller/sinkron-dapodik/table-sinkron-dapodik";
import { SincronizeDapodik } from "~/domain/dapodik/sincronize-data-dapodik";
import { DTOSiswaFileDapodik } from "~/dtos/dto-siswa-file-dapodik";
import type { typeImportDapodik } from "~/infrastructures/excels/detect-header-dapodik";
import type { SiswaTypeDapodik } from "~/types/siswa-dapodik";

export default function SinkronDapodikPage(){
    const dataImport = useAppSelector(selectSiswaDapodikDTO);
    const siswaWithValidation = useAppSelector(selectSiswaWithValidation);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    
    
    const instance = useMemo(() => {
        if (!dataImport) return null;
        const dataImportConvert:typeImportDapodik<SiswaTypeDapodik> = {
            formDapodik: DTOSiswaFileDapodik.fromApiArray(dataImport),
            propertyDapodik:[],
            configRender:[],


        }
        return new SincronizeDapodik(
            dataImportConvert,
            siswaWithValidation//.filter(s=>s.data.aktif === 'aktif')
        );
    }, [
        dataImport,
        siswaWithValidation
    ]);
    
    if (!instance) return null;
    const data = instance.dataValidationSiswaWithDapodikSheet(rombel??'1A');
    
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center mb-0">Data Sinkron Aplikasi dan Dapodik</h3>
            <h4 className="text-2xl text-center mb-5">Kelas {rombel}</h4>
            <TableSinkronDapodik data={data}/>

        </div>
    )
}