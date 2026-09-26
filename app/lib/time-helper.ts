import type { TimeStatus } from "./TimeStatus";

export type WithTimeStatus<T> = T & {
    timeStatus: TimeStatus;
};
export function getTimeStatus(
    startTime: Date,
    endTime: Date,
    now = new Date()
): TimeStatus {
    if (now < startTime) {
        return 'upcoming';
    }

    if (now < endTime) {
        return 'ongoing';
    }

    return 'elapsed';
}

export function isToday(
    date: Date,
    now = new Date()
): boolean {
    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    );
}

export function filterTodayByTime<T extends {
    start_time: Date;
    end_time: Date;
}>(
    data: T[],
    now = new Date()
): WithTimeStatus<T>[] {
    return data
        .filter((item) => isToday(item.start_time, now))
        .map((item) => ({
            ...item,
            timeStatus: getTimeStatus(
                item.start_time,
                item.end_time,
                now
            ),
        }));
}