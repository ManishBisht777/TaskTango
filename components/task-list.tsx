import React from "react";
import Tasks from "./tasks";
import { AddTask } from "./add-task";

type Props = {};

const TaskList = (props: Props) => {
  return (
    <div>
      <AddTask />
      <div className="flex flex-col gap-4">
        <Tasks />
        <Tasks />
      </div>
    </div>
  );
};

export default TaskList;
