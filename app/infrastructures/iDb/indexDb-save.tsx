import type { ApiResponse } from "~/configs/appscript-config";
import { IndDbSiswaRepository } from "../indexDb/db-datasiswa-repository";
import type { SiswaType } from "~/types/siswa";
import { IndDbKaldikRepository } from "./idb-kaldik";
import type { KaldikSheetType } from "~/types/kaldik";
import { namaTab } from "~/lib/nama-tab-environment";

export default async function SaveResponseToIndexedDB(
  response: ApiResponse<any>
) {
  if (!response.success) return;

  if (response.source !== "API") return;

  const tab = response.detailResponse?.namaTab;

//   if (namaTab === namaTab("datasiswa")) {
//     const repo = new IndDbSiswaRepository();

//     await repo.saveBulkAgain(
//       response.data as SiswaType[]
//     );

//     return;
//   }
    console.log(tab)
  if (tab === namaTab("kalender")) {
    const repo = new IndDbKaldikRepository();
    console.log({tab})
    await repo.saveBulk(
      response.data as KaldikSheetType[]
    );

    return;
  }
//   if(detailResponse?.namaTab === namaTab('mapel')){
//               store.dispatch(setDataMapel(data as unknown as InterfaceMapelSheet[]));
//           };
          
//           // boleh ada trialnya, tapi saat ini tidak ada trial karena fitur baru
//           if(detailResponse?.namaTab === namaTab('bank_soal')){
//               store.dispatch(setBankSoal(data as unknown as BankSoalSheetType[]))
//           }
//   if (namaTab === namaTab("kurikulum")) {
//     const repo = new IndDbKurikulumRepository();

//     await repo.saveBulkAgain(
//       response.data as KurikulumType[]
//     );

//     return;
//   }
}