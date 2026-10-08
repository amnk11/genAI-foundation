import { inngest } from "./client.js";
import { auditLogs } from "../store.js";

export const onTodoCreated = inngest.createFunction(
  {
    id: "on todo created",
    triggers: [{ event: "todo/created" }],
  },
  async ({ event, step }) => {
    await step.run("audit", async () => {
      auditLogs.push({
        action: "created",
        todoId: event.data.todo.id,
        title: event.data.todo.title,
        timeStamp: new Date().toISOString(),
      });
      return { ok: true };
    });
  },
);

export const onTodoDeleted = inngest.createFunction(
  {
    id: "on todo deleted",
    retries: 3,
    triggers: [{ event: "todo/deleted" }],
  },
  async ({ event, step, attempt }) => {
    const todoId = event.data.todo.id;

    await step.run("Cleanup", async () => {
      if (attempt === 0) {
        throw new Error(`Failed to cleanup after deleting todo ${id}`);
      }
      return "Cleaned up successful";
    });

    await step.run("audit", async () => {
      auditLogs.push({
        action: "deleted",
        todoId,
      });
      return { ok: true };
    });
  },
);
