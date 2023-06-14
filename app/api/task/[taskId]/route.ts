import { prisma } from "@/lib/db";
import { getSession } from "@/lib/sessions";
import { z } from "zod";
import { taskCreateSchema } from "../route";

const routeContextSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
});

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { params } = routeContextSchema.parse(context);

  try {
    await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { params } = routeContextSchema.parse(context);

  try {
    const json = await req.json();
    const body = taskCreateSchema.parse(json);

    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title: body.title,
        description: body.description,
        dueDate: body.dueDate,
        status: body.status,
        priority: body.priority,
      },
    });

    return new Response(JSON.stringify(task));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
