import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
function Login() {
  // CONCEPT: Controlled inputs
  // React owns the input value — it lives in state, not the DOM
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
 
  const { login } = useAuth();    // get login function from Context
  const navigate  = useNavigate();
 
  // CONCEPT: Event handling — form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page from reloading (default form behaviour)
 
    // Simple validation
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
 
    // Call login from AuthContext — updates global user state
    login(name.trim(), email.trim());
 
    // Redirect to home page after login
    navigate("/");
  };
 
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>🍔</div>
        <h2 style={styles.title}>Welcome back!</h2>
        <p style={styles.sub}>Log in to place your order</p>
 
        <form onSubmit={handleSubmit} style={styles.form}>
 
          <div style={styles.field}>
            <label style={styles.label}>Your Name</label>
            <input
              type="text"
              placeholder="e.g. Priya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
 
          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
 
          {/* CONCEPT: Conditional Rendering — show error only when set */}
          {error && <p style={styles.error}>⚠️ {error}</p>}
 
          <button type="submit" style={styles.btn}>
            Login →
          </button>
 
        </form>
 
        <p style={styles.note}>
          (This is a demo — no real authentication)
        </p>
      </div>
    </div>
  );
}
 
const styles = {
  page: {
    minHeight: "100vh", display: "flex",
    alignItems: "center", justifyContent: "center",
    background: "#f8f8f8", padding: "24px",
  },
  card: {
    background: "#fff", borderRadius: "24px",
    padding: "48px 40px", maxWidth: "400px", width: "100%",
    boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  icon: { fontSize: "48px", marginBottom: "12px" },
  title: { fontSize: "26px", fontWeight: 800, color: "#1a1a2e", marginBottom: "6px" },
  sub: { fontSize: "14px", color: "#888", marginBottom: "32px" },
  form: { textAlign: "left" },
  field: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#555", marginBottom: "6px" },
  input: {
    width: "100%", padding: "12px 14px",
    border: "1.5px solid #e0e0e0", borderRadius: "10px",
    fontSize: "14px", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  error: {
    background: "#fff0ea", color: "#e74c3c",
    padding: "10px 14px", borderRadius: "8px",
    fontSize: "13px", marginBottom: "16px",
    border: "1px solid #ffd0c0",
  },
  btn: {
    width: "100%", padding: "14px",
    background: "#ff6b35", color: "#fff",
    border: "none", borderRadius: "12px",
    fontSize: "15px", fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },
  note: { fontSize: "12px", color: "#bbb", marginTop: "20px" },
};
 
export default Login;
