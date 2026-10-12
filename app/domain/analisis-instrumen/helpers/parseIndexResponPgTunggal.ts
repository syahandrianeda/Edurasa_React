export function parseIndexResponPgTunggal(
    respon: string | null
): number | null {

    if (respon === null) {
        return null;
    }

const value = respon.trim();

    if (value === '') {
        return null;
    }
    const valueNumber = ["A","B", "C", "D", "E", "F"].findIndex(s=> s === value);
    const parsed = Number(valueNumber);

    if (!Number.isInteger(parsed)) {
        return null;
    }

    return parsed;
}