"use client";

import React, { useContext } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { TimerContext } from "@/context/TimerContext";
import { cn } from "@/lib/utils";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

async function updateTask(taskId: string, tomatoes: number) {
  const response = await fetch(`api/task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tomatoes: tomatoes,
    }),
  });

  if (!response.ok) {
    return toast({
      title: "Something went wrong",
      description: `${tomatoes} Tomatoes Spend in this task complete 1 tomato to finsih task`,
      variant: "destructive",
    });
  }

  return toast({
    description: "Task Updated",
  });
}

const Timer = (props: Props) => {
  const workTime = 0.05;
  const shortBreakTIme = 0.05;
  const longBreakTime = 0.05;

  const { state, dispatch } = useContext(TimerContext);

  const [isPaused, setIsPaused] = React.useState(true);
  const [secondsLeft, setSecondsleft] = React.useState(workTime * 60);
  const [mode, setMode] = React.useState("Work");
  let tomatoes = state.tomatoes;

  const secondsLeftRef = React.useRef(secondsLeft);
  const isPausedRef = React.useRef(isPaused);
  const modeRef = React.useRef(mode);
  const tomatoRef = React.useRef(tomatoes);

  const router = useRouter();
  function resetTimer() {
    secondsLeftRef.current = workTime * 60;
    setSecondsleft(workTime * 60);

    setMode("Work");
    modeRef.current = "Work";
  }

  React.useEffect(() => {
    function switchMode() {
      let nextMode;
      if (
        modeRef.current === "Work" &&
        tomatoRef.current > 0 &&
        tomatoRef.current % 4 === 0
      )
        nextMode = "LongBreak";
      else if (
        modeRef.current === "ShortBreak" ||
        modeRef.current === "LongBreak"
      )
        nextMode = "Work";
      else nextMode = "ShortBreak";

      let nextSeconds;

      if (nextMode === "Work") nextSeconds = workTime * 60;
      else if (nextMode === "ShortBreak") nextSeconds = shortBreakTIme * 60;
      else nextSeconds = longBreakTime * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsleft(nextSeconds);
      secondsLeftRef.current = nextSeconds;

      console.log(modeRef.current, tomatoRef.current);
    }

    const interval = setInterval(() => {
      if (isPausedRef.current) return null;

      if (secondsLeftRef.current == 0) {
        if (modeRef.current === "Work") {
          dispatch({ type: "INCREMENT" });
          tomatoRef.current++;
        }

        switchMode();
      }

      secondsLeftRef.current--;
      setSecondsleft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let totalSeconds;
  if (mode === "Work") totalSeconds = workTime * 60;
  else if (mode === "ShortBreak") totalSeconds = shortBreakTIme * 60;
  else totalSeconds = longBreakTime * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  return (
    <div className="flex flex-col items-center w-48">
      <h3 className="text-xl font-bold uppercase text-slate-600 my-4">
        {mode}
      </h3>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={4}
        styles={buildStyles({
          pathTransitionDuration: 0.5,
          pathColor:
            mode === "Work"
              ? `rgba(254,124,26, ${percentage / 100})`
              : mode === "ShortBreak"
              ? `rgba(128,107,206,${percentage / 100})`
              : `rgba(116,215,69,${percentage / 100})`,

          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      >
        <div
          className={cn(
            "flex flex-col gap-1 items-center",
            mode === "Work"
              ? "text-[rgb(254,124,26)]"
              : mode === "ShortBreak"
              ? "text-[rgb(128,107,206)]"
              : "text-[rgb(116,215,69)]"
          )}
        >
          <p className="font-bold text-4xl">{minutes + ":" + seconds}</p>
          <p className="text-sm">
            {mode === "Work"
              ? "Keep-going"
              : mode === "ShortBreak"
              ? "Refresh"
              : "Chill"}
          </p>
        </div>
      </CircularProgressbarWithChildren>

      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="secondary"
          className="rounded-full w-12 h-12 flex justify-center items-center p-1"
          onClick={() => {
            if (!state.taskId)
              return toast({
                title: "Not Possible",
                description: "Please Select a task to focus",
                variant: "destructive",
              });

            setIsPaused(true);
            isPausedRef.current = true;
            updateTask(state.taskId, state.tomatoes);
            dispatch({ type: "RESET" });
            resetTimer();
            router.refresh();
          }}
        >
          <Icons.reset className="w-4 h-4 text-slate-600" />
        </Button>
        <Button
          className="rounded-full w-12 h-12 flex justify-center items-center p-1"
          onClick={() => {
            if (!state.taskId)
              return toast({
                title: "Not Possible",
                description: "Please Select a task to focus",
                variant: "destructive",
              });

            setIsPaused(!isPaused);
            isPausedRef.current = !isPaused;
          }}
        >
          {isPaused ? (
            <Icons.play className="w-4 h-4 text-white" />
          ) : (
            <Icons.pause className="w-4 h-4 text-white" />
          )}
        </Button>
        <Button
          variant="secondary"
          className="rounded-full w-12 h-12 flex justify-center items-center p-1"
        >
          <Icons.cross className="w-4 h-4 text-slate-600" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
