import type { ApiResponse } from "~/configs/appscript-config";
import type { ParamUpdateRecord, ParamUpsert } from "~/configs/appscript-sheet";
import type {  SiswaDapodikAppToSheet, SiswaDapodikSheetToApp } from "~/types/siswa-dapodik";

export default interface DapodikRepositoryInterface{
    loadAllDapodik():Promise<ApiResponse<SiswaDapodikSheetToApp>|null>,
    saveAllDapodik(param: Record<string, any>):Promise<ApiResponse<SiswaDapodikSheetToApp>|null>
}