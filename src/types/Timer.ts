export interface Timer {
    id: string,
    running: boolean,
    lastStartedAt: Date,
    lastPausedWithSeconds: number,
}