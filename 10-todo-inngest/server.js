import "dotenv/config";
import express from "express";
import { todos, createTodo, getTodo, updateTodo, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onTodoCreated, onTodoDeleted } from "./inngest/functions.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
  "/api/inngest",
  serve({ client: inngest, functions: [onTodoCreated, onTodoDeleted] }),
);

app.get("/health", (_, res) => {
  res.json({ message: "all okay " });
});

app.get("/todos", (req, res) => {
  res.json({
    success: true,
    data: todos,
  });
});

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = getTodo(id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.json({
    success: true,
    data: todo,
  });
});

app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  const todo = createTodo(title);

  await inngest.send({
    name: "todo/created",
    data: { todo },
  });

  res.status(201).json({
    success: true,
    data: todo,
  });
});

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = updateTodo(id, req.body);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.json({
    success: true,
    data: todo,
  });
});

app.delete("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const todo = deleteTodo(id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  await inngest.send({
    name: "todo/deleted",
    data: { todo },
  });

  res.json({
    success: true,
    data: todo,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
