import React from "react";
import TaskItem from "./TaskItem";
import type { Task } from "../Types.ts";

export type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
}: TaskListProps) {
  if (tasks.length === 0)
    return (
      <div className="py-8 text-center text-white/70">
        No tasks yet — add your first one!
      </div>
    );

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
