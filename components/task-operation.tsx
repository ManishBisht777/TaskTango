"use client";

import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./Icons";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import AddTaskForm from "./add-task-form";
import { Task } from "@prisma/client";

interface TaskOperationsProps {
  task: Task;
}

async function deletePost(postId: string) {
  const response = await fetch(`/api/task/${postId}`, {
    method: "DELETE",
  });

  if (!response?.ok) {
    return toast({
      title: "Something went wrong.",
      description: "Your task was not deleted. Please try again.",
      variant: "destructive",
    });
  }

  return toast({
    description: "Your task has been Deleted.",
  });
}

export function TaskOperations({ task }: TaskOperationsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = React.useState<boolean>(false);

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.elipses className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setShowEditDialog(true)}
          >
            <button className="flex gap-2 items-center">
              <Icons.edit className="w-4 h-4" />
              Edit
            </button>
            {/* <AddTask /> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            <Icons.delete className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this Task?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                setIsDeleteLoading(true);
                const deleted = await deletePost(task.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.delete className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Tasks tasks with different fields and labels and start a timer to
              boost your productivity
            </DialogDescription>
          </DialogHeader>
          <AddTaskForm edit task={task} />
        </DialogContent>
      </Dialog>

      <Dialog open></Dialog>
    </>
  );
}
