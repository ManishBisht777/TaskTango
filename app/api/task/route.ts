import { prisma } from "@/lib/db";
import { getSession } from "@/lib/sessions";
import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string().min(3).max(128),
  description: z.string(),
  dueDate: z.string().nonempty(),
  status: z.string().nonempty(),
  priority: z.string().nonempty(),
});

export async function GET() {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const tasks = await prisma.task.findMany({
    where: {
      id: session.user.id,
    },
  });

  return new Response(JSON.stringify(tasks));
}

export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const json = await req.json();
  const body = taskCreateSchema.parse(json);

  try {
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        priority: body.priority,
        status: body.status,
        authorId: session.user.id,
        tomatoes: 0,
      },
    });

    return new Response(JSON.stringify(task));
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.message);
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
