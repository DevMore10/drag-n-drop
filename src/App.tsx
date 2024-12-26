import { useState } from "react";
import type { Task, Column as ColumnType } from "./types";
import { Column } from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To DO" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Research Project", description: "Gather requirements", status: "TODO" },
  {
    id: "2",
    title: "Code Review",
    description: "Review pull requests for the dashboard project",
    status: "IN_PROGRESS",
  },
  {
    id: "3",
    title: "Team Meeting",
    description: "Discuss sprint progress and blockers",
    status: "DONE",
  },
  {
    id: "4",
    title: "Write Documentation",
    description: "Document API endpoints for the payment gateway",
    status: "TODO",
  },
  {
    id: "5",
    title: "Fix Bugs",
    description: "Resolve high-priority issues reported in the mobile app",
    status: "IN_PROGRESS",
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );

    console.log(tasks);
  }

  return (
    <>
      <div className="p-4 ">
        <div className="flex gap-8">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => {
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              );
            })}
          </DndContext>
        </div>
      </div>
    </>
  );
}
