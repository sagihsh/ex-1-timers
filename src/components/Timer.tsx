import React, { useMemo } from "react";
import { createUseStyles } from "react-jss";
import playIcon from "../assets/play_icon.svg";
import pauseIcon from "../assets/pause_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";

type TimerProps = {
  elapsedSeconds: number,
  running: boolean,
  onPause: () => void,
  onDelete: () => void,
}

export const Timer: React.FC<TimerProps> = ({ elapsedSeconds, running, onPause, onDelete }) => {
  const classes = useStyles();

  const formattedElapsedTime = useMemo(() => {
    const minutes = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }, [elapsedSeconds]);

  return (
    <div className={classes.timer}>
      <span className={classes.time}>
        {formattedElapsedTime}
      </span>

      <div className={classes.buttonsContainer}>
        <button
          className={classes.iconButton}
        // onClick={() => onPause(id)}
        >

          {running ? <img src={pauseIcon} /> : <img src={playIcon} />}
        </button>

        <button
          className={classes.iconButton}
        // onClick={() => onDelete(id)}
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
    maxWidth: "300px",
    margin: "10px auto",
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
