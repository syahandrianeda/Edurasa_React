import type { ApiResponse } from "~/configs/appscript-config";
import type { User, UserPtk } from "~/types";
import type { AkunSheet } from "~/types/akun-sheet";

export interface AuthRepositoryInterface {
    login(username: string, password: string): Promise<any | null>;
    responLoginSuccess(respon:Record<string, any>):ApiResponse<AkunSheet>
    getSession(): Promise<UserPtk | null>;
    getSessionSync  (): UserPtk | null;
    clearSession(): void;
}