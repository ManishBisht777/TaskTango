"use client";
import { Task } from "@prisma/client";
import React, { useContext } from "react";
import Tasks from "./tasks";
import { TaskContext } from "@/context/TaskContext";

type Props = {
  tasks: Task[];
};

const TaskComp = ({ tasks }: Props) => {
  const { state, dispatch } = useContext(TaskContext);

  React.useEffect(() => {
    dispatch({
      type: "SET_ALL_TASKS",
      payload: {
        tasks: tasks,
      },
    });
  }, []);

  console.log(state);
  return (
    <div className="flex flex-col gap-4">
      {state.tasks &&
        state.tasks.map((task) => {
          return <Tasks key={task.id} task={task} />;
        })}
    </div>
  );
};

export default TaskComp;
