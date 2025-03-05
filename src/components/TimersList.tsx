import { useEffect, useState } from "react";
import { useTimerContext } from "../contexts/timers";
import { Timer } from "./Timer";
import { Timer as ITimer } from "../types/Timer";
import { differenceInSeconds } from "date-fns";

export function TimersList() {
  const { timers, setTimers } = useTimerContext();
  const [, forceRender] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      forceRender(Date.now()); // Triggers re-render every second
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getElapsedSeconds = (timer: ITimer) => {
    if (!timer.running) {
      return timer.lastPausedWithSeconds;
    }

    return timer.lastPausedWithSeconds + differenceInSeconds(new Date(), timer.lastStartedAt);
  };

  return (
    <>
      {Object.values(timers).map(timer => (
        <Timer
          key={timer.id}
          elapsedSeconds={getElapsedSeconds(timer)}
          running={timer.running}
          onPause={() => null}
          onDelete={() => null}
        />
      ))}
    </>
  );
}
