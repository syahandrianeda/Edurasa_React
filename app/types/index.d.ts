import type { LucideIcon } from "lucide-react";
import type { To } from "react-router";
import type { FriendSheet } from "./akun-sheet";

export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at?: string | Date|null;
    two_factor_enabled?: boolean;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface AccesUser{
    idbaris: number,
    role: string,
    permission:string,
    level:string,
    keterangan: string
}
/**
 * 
export interface UserPtk extends User{
    jabatan: string,
    kelas_ampu: string[],
    nip: string,
    kode_mapel_ampu: string,
    roles: string,
    sekolah: string,
    kepsek_name: string,
    kepsek_nip: string,
    permission:AccesUser[],
    friends: UserFriends[]
}
*/

export interface UserFriends extends User{
    jabatan: string,
    kelas_ampu: string[],
    nip: string,
    kode_mapel_ampu: string,
    roles: string,
    sekolah: string,
    kepsek_name: string,
    kepsek_nip: string,
}

export interface UserPtk extends UserFriends{
    permission:AccesUser[],
    friends: UserFriends[]
}

export interface NavItem {
    title: string;
    href: NonNullable<To>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface typeKoleksiMenu {
    title: string;
    routeName: string;
    urlIcon: string|LucideIcon;
    permission?: string;
    hasRoute?:boolean
}

export interface FeatureType {
    title: string;
    href: string;
    description?: string;
    icon?: LucideIcon | string;
    permission?: string;
}
export interface typeSidebarFiturKonten {
    groupTitle: string
    breadCrumbs: FeatureType[];
    
}
