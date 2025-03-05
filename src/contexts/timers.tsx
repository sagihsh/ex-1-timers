import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Timer } from "../types/Timer";

type TimersMap = { [id: string]: Timer };

type TimerContextData = {
    timers: TimersMap;
    setTimers: React.Dispatch<React.SetStateAction<TimersMap>>;
};

// export const TimersContext = createContext<TimerContextData | undefined>(undefined);

const mockData: TimersMap = {
    "49078ac7-4848-419c-b220-bbe65e61fde4": {
        id: "49078ac7-4848-419c-b220-bbe65e61fde4",
        lastStartedAt: new Date("2025-03-05T15:22:24.443Z"),
        lastPausedWithSeconds: 0,
        running: true
    },
    "ffcdebc7-ddc7-4efd-81e6-4cd2f27c3b51": {
        id: "ffcdebc7-ddc7-4efd-81e6-4cd2f27c3b51",
        lastStartedAt: new Date("2025-03-05T15:21:26.443Z"),
        lastPausedWithSeconds: 0,
        running: true
    },
    "f54c779a-31f0-4c56-9d82-51a736f58649": {
        id: "f54c779a-31f0-4c56-9d82-51a736f58649",
        lastStartedAt: new Date("2025-03-05T15:20:06.443Z"),
        lastPausedWithSeconds: 0,
        running: true
    },
};

export const TimersContext = createContext<TimerContextData | undefined>(undefined);

export const TimersProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [timers, setTimers] = useLocalStorage<TimersMap>("timers", mockData);

    return (
        <TimersContext.Provider value={{ timers, setTimers }}>
            {children}
        </TimersContext.Provider>
    );
};

export const useTimerContext = () => {
    const context = useContext(TimersContext);
    if (!context) {
        throw new Error("useTimerContext must be used within a TimerProvider");
    }
    return context;
};
