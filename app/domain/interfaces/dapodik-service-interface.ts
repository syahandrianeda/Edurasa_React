import type { ApiResponse } from "~/configs/appscript-config";
import type { ParamUpdateRecord, ParamUpsert } from "~/configs/appscript-sheet";
import type { SiswaDapodikAppToSheet, SiswaDapodikSheetToApp } from "~/types/siswa-dapodik";

export default interface DapodikServiceInterface{
    loadAllDapodik():Promise<ApiResponse<SiswaDapodikSheetToApp>|null>,
    saveAllDapodik(param:Partial<ParamUpsert<SiswaDapodikAppToSheet>>):Promise<ApiResponse<SiswaDapodikSheetToApp>|null>
}