import { useDragOverlayMeasuring } from "@dnd-kit/core/dist/hooks/utilities";
import { Task } from "./types";
import { useDraggable } from "@dnd-kit/core";

type TaskProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px,${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="cursor-grab rounded-lg bg-slate-400 p-4 shadow-sm hover:shadow-md  ">
      <h3 className="font-medium text-white">{task.title}</h3>
      <p className="mt-2 text-sm  text-neutral-300">{task.description}</p>
    </div>
  );
}
