import React, { useMemo } from "react";
import { createUseStyles } from "react-jss";
import playIcon from "../assets/play_icon.svg";
import pauseIcon from "../assets/pause_icon.svg";
import resetIcon from "../assets/refresh_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";

type TimerProps = {
  elapsedSeconds: number,
  running: boolean,
  onPause: () => void,
  onResume: () => void,
  onReset: () => void,
  onDelete: () => void,
}

export const Timer: React.FC<TimerProps> = ({ elapsedSeconds, running, onPause, onResume, onReset, onDelete }) => {
  const classes = useStyles();

  const formattedElapsedTime = useMemo((): string => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const secs = elapsedSeconds % 60;
  
    return [hours, minutes, secs]
      .map(unit => unit.toString().padStart(2, "0"))
      .join(":");
  }, [elapsedSeconds]);

  return (
    <div className={classes.timer}>
      <span className={classes.time}>
        {formattedElapsedTime}
      </span>

      <div className={classes.buttonsContainer}>
        <button
          className={classes.iconButton}
          onClick={running ? onPause : onResume}
        >

          {running ? <img src={pauseIcon} /> : <img src={playIcon} />}
        </button>

        <button
          className={classes.iconButton}
          onClick={onReset}
        >
          <img src={resetIcon} />
        </button>

        <button
          className={classes.iconButton}
          onClick={onDelete}
        >
          <img src={deleteIcon} />
        </button>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  timer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f8f8f8",
    padding: "12px 20px",
    borderRadius: "12px",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    margin: "10px auto",
    width: "100%",
    boxSizing: "border-box",
  },
  time: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background 0.2s ease-in-out',

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.1)',
    },

    '&:focus': {
      outline: 'none',
    }
  }
});
