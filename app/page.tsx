import Pomodoro from "@/components/pomodoro";
import Tasks from "@/components/tasks";
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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Pomodoro />
      <div className="flex flex-col gap-4">
        <Tasks />
        <Tasks />
        <Tasks />
        <Tasks />
      </div>
    </main>
  );
}
