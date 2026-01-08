import type { User } from "~/types";
import type { AuthRepositoryInterface } from "./auth-repository-interface";

export default interface AuthServiceInterface{
    repo: AuthRepositoryInterface
    login(username: string, password: string): Promise<any | null>;
    getSession(): Promise<User | null>;
    getSessionSync(): User | null;
    logout(): void;
}