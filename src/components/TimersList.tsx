import { useEffect, useState } from "react";
import { useTimerContext } from "../contexts/timers";
import { Timer } from "./Timer";
import { Timer as ITimer } from "../types/Timer";
import { differenceInSeconds } from "date-fns";
import { createUseStyles } from "react-jss";
import { v4 as uuid } from "uuid";

export function TimersList() {
  const { timers, setTimers } = useTimerContext();
  const [, forceRender] = useState<number>(Date.now());

  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      forceRender(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getElapsedSeconds = (timer: ITimer) => {
    if (!timer.running) {
      return timer.lastPausedWithSeconds;
    }

    return timer.lastPausedWithSeconds + differenceInSeconds(new Date(), timer.lastStartedAt);
  };

  const addNewTimer = () => {
    const newTimerId = uuid();

    setTimers(prevTimers => ({
      ...prevTimers,
      [newTimerId]: {
        id: newTimerId,
        lastPausedWithSeconds: 0,
        lastStartedAt: new Date(),
        running: true,
      }
    }));
  }

  const pauseTimer = (timer: ITimer) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [timer.id]: {
        ...prevTimers[timer.id],
        lastPausedWithSeconds: getElapsedSeconds(timer),
        running: false,
      }
    }));
  }

  const resumeTimer = (timer: ITimer) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [timer.id]: {
        ...prevTimers[timer.id],
        lastStartedAt: new Date(),
        running: true,
      }
    }));
  }

  const resetTimer = (timer: ITimer) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [timer.id]: {
        ...prevTimers[timer.id],
        lastStartedAt: new Date(),
        lastPausedWithSeconds: 0,
        running: true,
      }
    }));
  }

  const deleteTimer = (timer: ITimer) => {
    setTimers(prevTimers => {
      const newTimers = { ...prevTimers };
      delete newTimers[timer.id];
      return newTimers;
    });
  }

  return (
    <div className={classes.timersContainer}>
      {Object.values(timers).map(timer => (
        <Timer
          key={timer.id}
          elapsedSeconds={getElapsedSeconds(timer)}
          running={timer.running}
          onPause={() => pauseTimer(timer)}
          onResume={() => resumeTimer(timer)}
          onReset={() => resetTimer(timer)}
          onDelete={() => deleteTimer(timer)}
        />
      ))}

      <button className={classes.addButton} onClick={addNewTimer}>
        Add a new timer +
      </button>
    </div>
  );
}

const useStyles = createUseStyles({
  timersContainer: {
    maxWidth: "300px",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e0e0e0",
    padding: "12px 20px",
    borderRadius: "12px",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    width: "100%",
    margin: "10px auto",
    cursor: "pointer",
    fontWeight: "bold",
    textAlign: "center",
    transition: "background 0.2s",
    "&:hover": {
      background: "#d6d6d6",
    },
    "&:active": {
      background: "#c2c2c2",
    }
  }

});