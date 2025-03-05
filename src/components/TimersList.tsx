import { useTimerContext } from "../contexts/timers";
import { Timer } from "./Timer";

export function TimersList() {
  const { timers, setTimers } = useTimerContext();

  return (
    <>
      { Object.values(timers).map(timer => (
        <Timer key={timer.id} {...timer} />
      ))}
    </>
  );
}
