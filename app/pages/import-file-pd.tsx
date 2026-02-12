import { useMemo } from "react"
import { useAppSelector } from "~/context-reduct/hook"
import { selectSiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif"
import { TablePreviewImport } from "~/controllers/data-siswa-controller/import-file-pd/table-preview-import"
import TitleTableImportFilePDDapodik from "~/controllers/data-siswa-controller/import-file-pd/title-table-dapodik"
import { SincronizeDapodik } from "~/domain/dapodik/sincronize-data-dapodik"
import { useImportDapodik } from "~/infrastructures/excels/hook-use-import"


export default function ImportFilePdPage(){
    // const siswaWithValidation = useAppSelector(selectSiswaWithValidation);
    // // const {formDapodik, tampilan, propertyDapodik, configRender} = useImportDapodik();
    // const dataImport = useImportDapodik();
    // const instance = new SincronizeDapodik(dataImport, siswaWithValidation);
    const siswaWithValidation = useAppSelector(selectSiswaWithValidation);
    const dataImport = useImportDapodik();

    const instance = useMemo(() => {
        if (!dataImport?.formDapodik) return null;

        return new SincronizeDapodik(
            dataImport,
            siswaWithValidation//.filter(s=>s.data.aktif === 'aktif')
        );
    }, [
        dataImport.formDapodik,
        dataImport.tampilan,
        dataImport.propertyDapodik,
        dataImport.configRender,
        siswaWithValidation
    ]);
    
    if (!instance) return null;

    return (
        <div className="p-1">
            <TitleTableImportFilePDDapodik tampilan={dataImport?.tampilan || 'formDapodik'}/>
            <TablePreviewImport instance={instance} tampilan={dataImport?.tampilan || 'formDapodik'}/>
        </div>
    )
}