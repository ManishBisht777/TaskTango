import Pomodoro from "@/components/pomodoro";
import TaskList from "@/components/task-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center py-6 gap-4">
      <header className="flex justify-between items-center w-full">
        <p className="text-2xl font-bold">Pomodoro</p>
        <Link href="/login" className={cn(buttonVariants(), "px-6 mt-4")}>
          Login
        </Link>
      </header>

      <Pomodoro />

      <div className="w-full h-[30vh] border rounded-sm flex justify-center items-center flex-col my-4">
        <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-2xl lg:text-3xl lg:leading-[1.1]">
          Oops you have to login
        </h1>
        <p className="max-w-[750px] text-sm text-muted-foreground mt-1">
          Login To Add Task
        </p>
        <Link href="/login" className={cn(buttonVariants(), "px-6 mt-4")}>
          Login
        </Link>
      </div>

      <TaskList />
    </main>
  );
}
