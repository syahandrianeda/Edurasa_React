import type { AccesUser,  typeSidebarFiturKonten } from "~/types";

export default function PermissionFeature(permission:AccesUser[],level:string, menu: typeSidebarFiturKonten[]):typeSidebarFiturKonten[]{
    const PermissionGroup = permission.filter(s=>s.level === level && s.keterangan === 'group').map(p=>p.permission);
    const PermissionChild = permission.filter(s=>s.level === level && s.keterangan ==='').map(p=>p.permission);
    return menu.filter((m)=> PermissionGroup.includes(m.groupTitle))
        .map(l=>{
            const filteredBreadCrumb = l.breadCrumbs.filter(s=>{
                return PermissionChild.includes(s.permission as string);
            })
            return {
                ...l,
                breadCrumbs: filteredBreadCrumb
            }
        });
}