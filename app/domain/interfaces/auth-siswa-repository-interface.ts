import type { ApiResponse } from "~/configs/appscript-config";
import type { AkunSiswaSheet, UserSiswa } from "~/types/user-siswa";

export interface AuthSiswaRepositoryInterface {
    login(token: string, typeToken: string): Promise<any | null>;
    responLoginSuccess(respon:Record<string, any>):ApiResponse<AkunSiswaSheet>
    getSession(): Promise<UserSiswa | null>;
    getSessionSync  (): UserSiswa | null;
    clearSession(): void;
}