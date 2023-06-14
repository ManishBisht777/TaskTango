import React from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

type Props = {};

const Timer = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      Timer
      <p>Timer comp</p>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="secondary"
          className="rounded-full w-10 h-10 flex justify-center items-center p-1"
        >
          <Icons.reset className="w-4 h-4 text-slate-600" />
        </Button>
        <Button className="rounded-full w-10 h-10 flex justify-center items-center p-1">
          <Icons.pause className="w-4 h-4 text-white" />
        </Button>
        <Button
          variant="secondary"
          className="rounded-full w-10 h-10 flex justify-center items-center p-1"
        >
          <Icons.cross className="w-4 h-4 text-slate-600" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
