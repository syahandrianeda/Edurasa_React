import type { UserSiswa } from "~/types/user-siswa";
import type { AuthSiswaRepositoryInterface } from "./auth-siswa-repository-interface";



export default interface AuthSiswaServiceInterface{
    repo: AuthSiswaRepositoryInterface
    login(token: string, typeToken: string): Promise<any | null>;
    getSession(): Promise<UserSiswa | null>;
    getSessionSync(): UserSiswa | null;
    logout(): void;
}