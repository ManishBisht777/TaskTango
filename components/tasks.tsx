"use client";

import React from "react";
import { TaskOperations } from "./task-operation";
import { Task } from "@prisma/client";
import { TimerContext } from "@/context/TimerContext";
import { Icons } from "./Icons";

type Props = { task: Task };
const Tasks = ({ task }: Props) => {
  const { state } = React.useContext(TimerContext);

  return (
    <div className="flex gap-2 border rounded p-6 justify-between">
      <div className="w-5/6">
        <div className="flex items-center gap-2">
          <h3 className="inline-block font-bold font-heading text-lg lg:text-xl">
            {task.title}
          </h3>
          <span className="py-1 text-sm rounded-full px-4 bg-slate-300">
            {task.priority}
          </span>
          <span className="py-1 text-sm rounded-full px-4 bg-purple-300">
            {task.status}
          </span>
          {task.status === "done" && (
            <span className="text-green-500 flex gap-1 items-center">
              <Icons.cherry className="w-4 h-4" />
              <p>{task.tomatoes}</p>
            </span>
          )}
          {state.taskId && task.id == state.taskId && (
            <span className="text-purple-500 flex gap-1 items-center">
              <Icons.cherry className="w-4 h-4" />
              <p>{state.tomatoes}</p>
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-3">{task.description}</p>
      </div>
      <TaskOperations task={task} />
    </div>
  );
};

export default Tasks;
