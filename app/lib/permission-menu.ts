import type { AccesUser, typeKoleksiMenu } from "~/types";

export default function PermissionMenu(permission:AccesUser[], menu: typeKoleksiMenu[]):typeKoleksiMenu[]{
    const onlyPermission = permission.filter(s=>s.level === 'menu').map(m=>m.permission);
    return menu.filter(s=>onlyPermission.includes(s.permission as string))
    
}