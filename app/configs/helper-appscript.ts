import macro from "../macro.json";

export function getDbTodayAkun(){
    const keyCurrent = currentMacroKey();
    const dataMacro = getDataMacro(keyCurrent);
    const tab = import.meta.env.DEV?'trial_user':'user';
    return {
        idss:dataMacro.ss_user,
        tab
    }
}

export function getDataMacro(key: keyof typeof macro):Record<string, string>{
    return macro[key]
}
export function currentMacroKey():keyof typeof macro{
        const now = new Date();
        const month = now.getMonth(); // 0-based
        const semester = month > 5 ? 1 : 2;

        const yearStart =
        semester === 1 ? now.getFullYear() : now.getFullYear() - 1;
        const yearEnd =
        semester === 1 ? now.getFullYear() + 1 : now.getFullYear();

        return `t_${yearStart.toString().slice(2)}${yearEnd
        .toString()
        .slice(2)}_s_${semester}` as keyof typeof macro
    }