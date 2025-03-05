import { Timer as ITimer } from "../types/Timer";

export function Timer({ id, lastPausedWithSeconds, lastStartedAt, running }: ITimer) {
  return (<>
    <h1>I'm a Timer</h1>

    <span>{id}</span>
    <span>{lastPausedWithSeconds}</span>
    <span>{lastStartedAt.toLocaleTimeString()}</span>
    <span>{running}</span>
  </>
  )
}
