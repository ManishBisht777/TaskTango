import React from "react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./Icons";
import { Button } from "./ui/button";

type Props = {};

const Filter = (props: Props) => {
  return (
    <div className="flex-1 flex gap-3">
      <Input className="" placeholder="Search tasks" />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>
            <Icons.filter className="w-4 h-4 mr-1" /> Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filter;
