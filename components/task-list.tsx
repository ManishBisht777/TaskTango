import React from "react";
import { AddTask } from "./add-task";

import { getSession } from "@/lib/sessions";
import { prisma } from "@/lib/db";
import Filter from "./filter";
import TaskComp from "./task-comp";

type Props = {};

const TaskList = async (props: Props) => {
  const session = await getSession();

  if (!session)
    return (
      <div>
        <h1>Login to see Tasks</h1>
      </div>
    );

  const tasks = await prisma.task.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-2">
        <Filter />
        <AddTask />
      </div>
      <TaskComp tasks={tasks} />
    </div>
  );
};

export default TaskList;
