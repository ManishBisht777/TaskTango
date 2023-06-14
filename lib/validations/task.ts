import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string(),
  dueDate: z.string().nonempty(),
  status: z.string().nonempty(),
  priority: z.string().nonempty(),
});
