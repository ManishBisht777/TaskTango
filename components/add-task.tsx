import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "./Icons";
import AddTaskForm from "./add-task-form";

export function AddTask() {
  return (
    <div className="flex justify-between my-4">
      <h3 className="font-bold text-xl">My Tasks</h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Icons.add className="w-4 h-4 mr-2" /> Add Tasks
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tasks</DialogTitle>
            <DialogDescription>
              Tasks tasks with different fields and labels and start a timer to
              boost your productivity
            </DialogDescription>
          </DialogHeader>
          <AddTaskForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
