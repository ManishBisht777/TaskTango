"use client";

import React from "react";
import { TaskOperations } from "./task-operation";
import { Task } from "@prisma/client";
import { TimerContext } from "@/context/TimerContext";

type Props = { task: Task };
const Tasks = ({ task }: Props) => {
  const { state } = React.useContext(TimerContext);

  console.log(state);
  return (
    <div className="flex gap-2 border rounded p-6 justify-between">
      <div className="">
        <h3 className="inline-block font-bold font-heading text-lg lg:text-xl">
          {task.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
        {task.status === "done" && <p>{task.tomatoes}</p>}
        {state.taskId && task.id == state.taskId && (
          <div>
            <p>{state.taskId}</p>
            <p>{state.tomatoes}</p>
          </div>
        )}
      </div>
      <TaskOperations task={task} />
    </div>
  );
};

export default Tasks;
