import type { TimeStatus } from "./TimeStatus";


export type CountdownResult = {
    status: TimeStatus;
    totalSeconds: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
};

function formatCountdown(
    days: number,
    hours: number,
    minutes: number,
    seconds: number
): string {
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    if (days > 0) {
        return `${days} hari ${hh}:${mm}:${ss}`;
    }

    return `${hh}:${mm}:${ss}`;
}

export function getCountdown(
    startTime: Date,
    endTime: Date,
    now: Date
): CountdownResult {
    let status: TimeStatus;
    let totalSeconds: number;

    if (now < startTime) {
        status = 'upcoming';

        totalSeconds = Math.ceil(
            (startTime.getTime() - now.getTime()) / 1000
        );
    } else if (now < endTime) {
        status = 'ongoing';

        totalSeconds = Math.ceil(
            (endTime.getTime() - now.getTime()) / 1000
        );
    } else {
        status = 'elapsed';
        totalSeconds = 0;
    }

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        status,
        totalSeconds,
        days,
        hours,
        minutes,
        seconds,
        formatted: formatCountdown(
            days,
            hours,
            minutes,
            seconds
        ),
    };
}
