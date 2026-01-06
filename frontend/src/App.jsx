import { useEffect, useState } from "react";
import api, { setAuthToken } from "./api";
import Auth from "./components/Auth";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthToken(token);
    if (token) fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchTasks = async () => {
    try {
      setError("");
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load tasks");
    }
  };

  const handleAuthSuccess = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setTasks([]);
    setAuthToken(null);
  };

  const addTask = async (taskPayload) => {
    const res = await api.post("/tasks", taskPayload);
    setTasks((prev) => [res.data, ...prev]);
  };

  const updateTask = async (id, updates) => {
    const res = await api.put(`/tasks/${id}`, updates);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  if (!token) {
    return (
      <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "system-ui" }}>
        <h1>Task Manager</h1>
        <Auth onSuccess={handleAuthSuccess} />
      </div>
    );
  }

 return (
  <div className="app-container">
    <header className="app-header">
      <h1 className="app-title">Task Manager</h1>

      <div className="app-user">
        <span className="user-name">Hi, {user?.name}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>

    {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

    <TaskForm onAdd={addTask} />
    <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
  </div>
);

}
