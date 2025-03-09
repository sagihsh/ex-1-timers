import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Timer } from "../types/Timer";

type TimersMap = { [id: string]: Timer };

type TimerContextData = {
    timers: TimersMap;
    setTimers: React.Dispatch<React.SetStateAction<TimersMap>>;
};

export const TimersContext = createContext<TimerContextData | undefined>(undefined);

export const TimersProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [timers, setTimers] = useLocalStorage<TimersMap>("timers", {});

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
