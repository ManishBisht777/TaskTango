import React from "react";
import Tasks from "./tasks";
import { AddTask } from "./add-task";
import { getSession } from "@/lib/sessions";
import { prisma } from "@/lib/db";

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
      <AddTask />
      <div className="flex flex-col gap-4">
        {tasks &&
          tasks.map((task) => {
            return <Tasks key={task.id} task={task} />;
          })}
      </div>
    </div>
  );
};

export default TaskList;
