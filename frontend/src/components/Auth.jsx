import { useState } from "react";
import api from "../api";

export default function Auth({ onSuccess }) {
  const [mode, setMode] = useState("login"); // or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload =
        mode === "login" ? { email, password } : { name, email, password };

      const res = await api.post(endpoint, payload);
      onSuccess(res.data);
    } catch (e2) {
      setError(e2?.response?.data?.message || "Auth failed");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode("login")} disabled={mode === "login"}>
          Login
        </button>
        <button onClick={() => setMode("register")} disabled={mode === "register"}>
          Register
        </button>
      </div>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        {mode === "register" && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password (min 6)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

        <button type="submit">{mode === "login" ? "Login" : "Create account"}</button>
      </form>
    </div>
  );
}
