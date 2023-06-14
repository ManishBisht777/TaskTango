import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div> */}

          <AddTaskForm />

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
