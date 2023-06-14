import React from "react";
import { TaskOperations } from "./task-operation";
import { Task } from "@prisma/client";

type Props = { task: Task };
const Tasks = async ({ task }: Props) => {
  return (
    <div className="flex gap-2 border rounded p-6 justify-between">
      <div className="">
        <h3 className="inline-block font-bold font-heading text-lg lg:text-xl">
          {task.title}
        </h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
      <TaskOperations task={task} />
    </div>
  );
};

export default Tasks;
