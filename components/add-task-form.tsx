"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/lib/validations/task";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Icons } from "./Icons";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Task } from "@prisma/client";
import { TaskContext } from "@/context/TaskContext";

type Props = {
  edit?: boolean;
  task?: Task;
};

type FormData = z.infer<typeof taskSchema>;

const AddTaskForm = ({ edit, task }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { dispatch } = useContext(TaskContext);

  const form = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate || "",
      priority: task?.priority || "",
      status: task?.status || "",
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const url = edit ? `/api/task/${task?.id}` : "/api/task";
    const method = edit ? "PATCH" : "POST";

    console.log(url, method);

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status,
      }),
    });

    setIsLoading(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: `Your task was not  ${
          edit ? "updated" : "Saved"
        } Please try again.`,
        variant: "destructive",
      });
    }

    const updatedTask = await response.json();

    dispatch({
      type: "ADD_TASK",
      payload: {
        task: updatedTask,
      },
    });

    router.refresh();
    return toast({
      description: `Your task has been ${edit ? "updated" : "Saved"}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <div className="grid gap-1">
          <p className="sr-only">Title</p>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-1">
          <p className="sr-only">Description</p>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-1">
          <p className="sr-only">Due Date</p>
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="date" placeholder="Due Date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2 grid-cols-2">
          <div className="grid gap-1">
            <p className="sr-only">Priority</p>
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-1">
            <p className="sr-only">Status</p>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="inprogress">In-Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {edit ? "Update" : "Create"}
        </button>
      </form>
    </Form>
  );
};

export default AddTaskForm;
