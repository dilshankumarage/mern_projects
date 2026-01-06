import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(""); // yyyy-mm-dd
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    setError("");

    await onAdd({
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    });

    setTitle("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, margin: "16px 0" }}>
      <input
        style={{ flex: 1 }}
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

      <button type="submit">Add</button>

      {error ? <span style={{ color: "crimson" }}>{error}</span> : null}
    </form>
  );
}
