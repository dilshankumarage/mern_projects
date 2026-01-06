import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdate, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
