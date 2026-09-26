import {useMemo} from 'react';
import {useCurrentTime} from './use-current-time';
import type { TimeStatus } from '~/lib/TimeStatus';

type CountdownResult = {
    status: TimeStatus;// 'upcoming' | 'ongoing' | 'elapsed';
    target: Date | null;
    totalSeconds: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
};

function getDuration(totalSeconds: number) {
    const seconds = Math.max(0, totalSeconds);

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return {
        totalSeconds: seconds,
        days,
        hours,
        minutes,
        seconds: remainingSeconds,
    };
}

function formatCountdown(
    days: number,
    hours: number,
    minutes: number,
    seconds: number
) {
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    if (days > 0) {
        return `${days} hari ${hh}:${mm}:${ss}`;
    }

    return `${hh}:${mm}:${ss}`;
}

export function useCountdown(
    startTime: Date,
    endTime: Date
): CountdownResult {
    const now = useCurrentTime();

    return useMemo(() => {
        let status: CountdownResult['status'];
        let target: Date | null;
        let totalSeconds: number;

        if (now < startTime) {
            status = 'upcoming';
            target = startTime;
            totalSeconds = Math.ceil(
                (startTime.getTime() - now.getTime()) / 1000
            );
        } else if (now < endTime) {
            status = 'ongoing';
            target = endTime;
            totalSeconds = Math.ceil(
                (endTime.getTime() - now.getTime()) / 1000
            );
        } else {
            status = 'elapsed';
            target = null;
            totalSeconds = 0;
        }

        const duration = getDuration(totalSeconds);

        return {
            status,
            target,
            ...duration,
            formatted: formatCountdown(
                duration.days,
                duration.hours,
                duration.minutes,
                duration.seconds
            ),
        };
    }, [now, startTime, endTime]);
}
