import type { ApiResponse } from "~/configs/appscript-config";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";

export default interface AtpRepositoryInterface {
        update(param:Record<string,any>): Promise<ApiResponse<AtpKurikulumType>>
        create(param:Record<string,any>): Promise<ApiResponse<AtpKurikulumType>>
}