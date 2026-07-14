import type { UserPtk } from "~/types"

export interface paramUpdateUserRepository{
    /**tab di ss akun */
    // tab:string
    /** idss: idss spreadSheet */
    // idss:string,
    /** JSON.stringify(Partial<UserPtk>) */
    data:string,
    action:'updateUser'
}

export interface paramUpdateUserService{
    /**tab di ss akun, tidak harus ada di service */
    // tab?:string
    // /** idss: idss spreadSheet */
    // idss?:string,
    /** JSON.stringify(Partial<UserPtk>) */
    data:Partial<UserPtk>,
    // action?:'updateUser'
}

export interface paramGetCredetnialRepository{
    // tab                 : string,
    // idss                : string,
    // data                : string,
    // action              : 'read',
    filter              : string,
    key_return          : string,
    action              : 'getItem'
}
export interface paramGetCredetnialService{
    id:number
}

