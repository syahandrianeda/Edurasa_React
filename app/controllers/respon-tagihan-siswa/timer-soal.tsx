import { useCurrentTime } from "~/hooks/use-current-time";

export default function TimerSoal(){
    const now = useCurrentTime();
    return (
        <div className="sticky top-12 bg-sky-300 text-center z-50 rounded-b-2xl">{now.toLocaleTimeString()}</div>
    )
}