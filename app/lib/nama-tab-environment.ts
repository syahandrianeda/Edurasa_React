
const isDev = import.meta.env.DEV;
export const namaTab = (namaTab:string)=>isDev ?'trial_'+namaTab:namaTab;
