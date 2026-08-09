import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import PrintSppd from "../surat/modals/templates/print-sppd";
import PrintSuratTugasSppd from "../surat/modals/templates/print-surat-tugas";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import FormatNotulaRapartSppd from "../surat/modals/templates/format-notula-sppd";
import PrintSuketNisn from "../surat/modals/templates/print-suket-nisn";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type { templateSuratType } from "~/domain/surat/template-surat";
import type { SiswaType } from "~/types/siswa";
import type TemplateSuratKeluar from "~/domain/surat-orm/infrastructure/template-surat-keluar";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";
import type { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import PrintSuketKelakuanBaik from "../surat/modals/templates/print-suket-kelakuan-baik";
import PrintSuketSiswaAktif from "../surat/modals/templates/print-suket-siswa-aktif";
import PrintFormatLampiranSuketSiswaAktif from "../surat/modals/templates/print-suket-siswa-aktif-lampiran";
import PrintFormatLampiranSuketNisn from "../surat/modals/templates/print-suket-nisn-lampiran";
import PrintSuketKelakuanBaikFormatLampiran from "../surat/modals/templates/print-suket-kelakuan-baik-lampiran";

export default function SwitchPrintPreviewPage(){
    const {state} = useModal()
    const type:ModalState['type'] = state.type;
    switch(type){
        case "PRINT PREVIEW SPPD":
            return <PrintSppd data={state.payload as unknown as SppdAppType}/>
        case "PRINT PREVIEW SURAT TUGAS":
            return <PrintSuratTugasSppd data={state.payload as unknown as DataOrmSuratKeluarType}/>
        case "NOTULA RAPAT":
            return <FormatNotulaRapartSppd data={state.payload as unknown as SppdAppType}  includeResume={false}/>
        case "PRINT NOTULA RAPAT":
            return <FormatNotulaRapartSppd data={state.payload as unknown as SppdAppType} includeResume={true}/>
        case "PRINT SUKET SISWA AKTIF":
            return <PrintSuketSiswaAktif data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        case "PRINT SUKET NISN":
            return <PrintSuketNisn data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        case "PRINT SUKET KELAKUAN BAIK":
            return <PrintSuketKelakuanBaik data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        case "PRINT SUKET SISWA AKTIF FORMAT LAMPIRAN":
            return <PrintFormatLampiranSuketSiswaAktif data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        case "PRINT SUKET NISN FORMAT LAMPIRAN":
            return <PrintFormatLampiranSuketNisn data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        case "PRINT SUKET KELAKUAN BAIK FORMAT LAMPIRAN":
            return <PrintSuketKelakuanBaikFormatLampiran data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        default:
            return <p>on proses {type}</p>
    }
}

