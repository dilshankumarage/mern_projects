import { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : "");

  const save = async () => {
    await onUpdate(task._id, {
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    });
    setEditing(false);
  };

  const toggle = async () => {
    await onUpdate(task._id, { completed: !task.completed });
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        gap: 12
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={task.completed} onChange={toggle} />
          {!editing ? (
            <strong style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </strong>
          ) : (
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          )}
        </div>

        <div style={{ marginTop: 6, fontSize: 14, opacity: 0.85 }}>
          {!editing ? (
            <>
              <span>Priority: {task.priority}</span>
              <span style={{ marginLeft: 12 }}>
                Due: {task.dueDate ? task.dueDate.slice(0, 10) : "—"}
              </span>
            </>
          ) : (
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {!editing ? (
          <button onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        )}
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
