export function mean(data: number[]): number {
    if (data.length === 0) {
        return 0;
    }

    return (
        data.reduce((total, value) => total + value, 0) /
        data.length
    );
}