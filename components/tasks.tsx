import React from "react";
import { PostOperations } from "./task-operation";

type Props = {};

const Tasks = (props: Props) => {
  return (
    <div className="flex gap-2 border rounded p-6">
      <div className="">
        <h3 className="inline-block font-bold font-heading text-lg lg:text-xl">
          Task One
        </h3>
        <p className="text-sm text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
          molestiae unde nemo animi delectus blanditiis vitae doloribus, facilis
          nesciunt optio non! Consectetur illum id sed facilis tempore
          voluptatibus perferendis odio?
        </p>
      </div>
      <PostOperations />
    </div>
  );
};

export default Tasks;
