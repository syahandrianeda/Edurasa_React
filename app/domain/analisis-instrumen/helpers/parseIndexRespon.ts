export function parseIndexRespon(
    respon: string | null
): number | null {

    if (respon === null) {
        return null;
    }

    const value = respon.trim();

    if (value === '') {
        return null;
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed)) {
        return null;
    }

    return parsed;
}