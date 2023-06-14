import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timer from "./timer";

type Props = {};

const Pomodoro = (props: Props) => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
        <TabsTrigger value="short">Short break</TabsTrigger>
        <TabsTrigger value="long">Lonk Break</TabsTrigger>
      </TabsList>
      <TabsContent value="pomodoro">
        <Timer />
      </TabsContent>
      <TabsContent value="short">
        <Timer />
      </TabsContent>
      <TabsContent value="long">
        <Timer />
      </TabsContent>
    </Tabs>
  );
};

export default Pomodoro;
