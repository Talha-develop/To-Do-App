import React, { useRef, useState } from "react";
import Button from "./components/Button";
import TaskList from "./components/TaskList";
import type { Task } from "./Types";
import { useLocalStorage } from "./hooks/useLocalStorage";

function uid() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("my-todo:tasks", []);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  function addTask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: uid(), text: trimmed, done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setDraft("");
    setOpen(false);
  }

  function toggle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function remove(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function update(id: string, text: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-600 to-red-500 p-6 flex items-start justify-center">
      <div className="w-full max-w-2xl mt-12 bg-white/6 backdrop-blur-sm rounded-3xl p-6 text-white shadow-xl">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold">To‑Do-List</h1>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setOpen((s) => !s);
                requestAnimationFrame(() => textareaRef.current?.focus());
              }}
            >
              {open ? "Close" : "Add Task"}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setTasks([]);
              }}
            >
              Clear All
            </Button>
          </div>
        </header>

        <section className="mt-6">
          {open && (
            <div className="mb-4">
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full rounded-xl p-3 bg-white/6 placeholder:text-white/60 text-white resize-none"
                rows={3}
                placeholder="Write your task here..."
              />

              <div className="mt-3 flex gap-2">
                <Button onClick={() => addTask(draft)} size="md">
                  Save Task
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDraft("");
                    setOpen(false);
                  }}
                  size="md"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <TaskList
            tasks={tasks}
            onToggle={toggle}
            onDelete={remove}
            onUpdate={update}
          />
        </section>

        <footer className="mt-6 text-sm text-white/70">
          Tasks are stored locally in your browser.
        </footer>
      </div>
    </div>
  );
}
