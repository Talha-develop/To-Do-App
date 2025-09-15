import React, { useRef, useState } from "react";
import type { Task } from "../Types.ts";
import { EditIcon, TrashIcon } from "./Icons";
import cn from "clsx";

export type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function startEdit() {
    setDraft(task.text);
    setEditing(true);
    // focus after render
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function save() {
    const trimmed = draft.trim();
    if (trimmed.length === 0) {
      alert("Task cannot be empty");
      return;
    }
    onUpdate(task.id, trimmed);
    setEditing(false);
  }

  function askDelete() {
    if (confirm("Are you sure you want to delete this task?"))
      onDelete(task.id);
  }

  return (
    <li className="flex items-start gap-4 p-3 rounded-xl bg-white/6 hover:bg-white/8 transition-colors">
      <input
        aria-label={`Mark ${task.text} as done`}
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 rounded text-green-400"
      />

      <div className="flex-1">
        {!isEditing ? (
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "break-words text-lg",
                task.done && "line-through text-white/60"
              )}
            >
              {task.text}
            </p>

            <div className="flex items-center gap-3 ml-4">
              <button
                aria-label="Edit"
                onClick={startEdit}
                className="p-2 rounded-md hover:bg-white/10"
              >
                <EditIcon className="w-5 h-5" />
              </button>
              <button
                aria-label="Delete"
                onClick={askDelete}
                className="p-2 rounded-md hover:bg-white/10"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full resize-none rounded-md bg-white/5 p-2 text-white placeholder:text-white/60"
              rows={2}
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={save}
                className="px-3 py-1 rounded-md bg-green-500 text-white"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1 rounded-md bg-gray-700 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-1 text-xs text-white/60">
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
    </li>
  );
}
