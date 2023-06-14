import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string(),
  dueDate: z.date(),
  status: z.string(),
});
