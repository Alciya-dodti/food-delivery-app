import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
 
function OrderSuccess() {
  const navigate  = useNavigate();
  const [seconds, setSeconds] = useState(5); // countdown from 5
 
  // CONCEPT: useEffect with cleanup
  // The return function is the "cleanup" — it runs when the
  // component unmounts to prevent memory leaks
  useEffect(() => {
    // If already 0, navigate immediately
    if (seconds === 0) {
      navigate("/");
      return;
    }
 
    // Set a 1 second timer to decrease the counter
    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
 
    // Cleanup: cancel the timer if component unmounts
    return () => clearTimeout(timer);
  }, [seconds, navigate]); // re-runs every time `seconds` changes
 
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Animated checkmark */}
        <div style={styles.checkCircle}>✓</div>
 
        <h1 style={styles.title}>Order Placed! 🎉</h1>
        <p style={styles.sub}>
          Your food is being prepared and will arrive in ~30 minutes.
        </p>
 
        {/* Delivery info */}
        <div style={styles.infoBox}>
          <div style={styles.infoRow}>
            <span>🧑‍🍳</span>
            <span>Restaurant confirmed your order</span>
          </div>
          <div style={styles.infoRow}>
            <span>🚴</span>
            <span>Delivery partner assigned</span>
          </div>
          <div style={styles.infoRow}>
            <span>⏱️</span>
            <span>Estimated time: 25–35 minutes</span>
          </div>
        </div>
 
        {/* Countdown */}
        <p style={styles.countdown}>
          Redirecting to home in <strong style={{ color: "#ff6b35" }}>{seconds}</strong> seconds...
        </p>
 
        <button style={styles.btn} onClick={() => navigate("/")}>
          Back to Home
        </button>
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
    padding: "48px 40px", maxWidth: "440px", width: "100%",
    boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    textAlign: "center",
  },
  checkCircle: {
    width: "72px", height: "72px",
    background: "#22c55e", color: "#fff",
    borderRadius: "50%", fontSize: "36px",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 4px 16px rgba(34,197,94,0.35)",
  },
  title: { fontSize: "28px", fontWeight: 900, color: "#1a1a2e", marginBottom: "8px" },
  sub: { fontSize: "15px", color: "#666", marginBottom: "28px", lineHeight: 1.6 },
  infoBox: {
    background: "#f8f8f8", borderRadius: "14px",
    padding: "16px 20px", marginBottom: "24px", textAlign: "left",
  },
  infoRow: {
    display: "flex", gap: "12px", alignItems: "center",
    fontSize: "14px", color: "#555", marginBottom: "10px",
  },
  countdown: { fontSize: "14px", color: "#999", marginBottom: "20px" },
  btn: {
    background: "#ff6b35", color: "#fff",
    border: "none", padding: "12px 32px",
    borderRadius: "100px", fontSize: "15px",
    fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  },
};
 
export default OrderSuccess;
