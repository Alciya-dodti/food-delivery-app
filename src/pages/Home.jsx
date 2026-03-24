import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 
// Categories for quick filter buttons
const CATEGORIES = ["All", "🍕 Pizza", "🍔 Burgers", "🌮 Tacos", "🍜 Noodles", "🍰 Desserts"];
 
function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();  // read from Context
 
  // CONCEPT: useState
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [offerIndex, setOfferIndex] = useState(0);
 
  // Banner offers to cycle through
  const offers = [
    { text: "🎉 50% OFF on first order!", sub: "Use code FIRST50" },
    { text: "🚀 Free delivery above ₹299", sub: "No minimum order value" },
    { text: "🍕 Buy 2 Get 1 Free on Pizzas", sub: "Valid till midnight" },
  ];
 
  // CONCEPT: useEffect
  // Runs once when component mounts (empty [] dependency array)
  // Simulates an API loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer); // cleanup on unmount
  }, []);
 
  // CONCEPT: useEffect with interval
  // Cycles through banner offers every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 3000);
    return () => clearInterval(interval); // cleanup = stop interval
  }, []);
 
  // CONCEPT: Event handling
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    // Navigate to Menu page with the selected category as a URL parameter
    navigate(`/menu?category=${encodeURIComponent(cat)}`);
  };
 
  // CONCEPT: Conditional Rendering — show spinner while loading
  if (isLoading) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.spinner}></div>
        <p style={{ color: "#666", marginTop: "16px" }}>Loading QuickBite...</p>
      </div>
    );
  }
 
  return (
    <div style={styles.page}>
 
      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          {/* Conditional Rendering: personalized if logged in */}
          <h1 style={styles.heroTitle}>
            {user ? `Hey ${user.name}! 👋` : "Hungry? 🍔"}
          </h1>
          <h2 style={styles.heroSub}>
            Fresh food delivered to your door in 30 mins
          </h2>
          <button style={styles.heroCta} onClick={() => navigate("/menu")}>
            Order Now →
          </button>
        </div>
        <div style={styles.heroEmoji}>🍕</div>
      </section>
 
      {/* ── OFFER BANNER (auto-rotating) ── */}
      <div style={styles.offerBanner}>
        <div style={styles.offerText}>{offers[offerIndex].text}</div>
        <div style={styles.offerSub}>{offers[offerIndex].sub}</div>
      </div>
 
      {/* ── CATEGORY PILLS ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>What are you craving?</h2>
        <div style={styles.categoryRow}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.catBtn,
                // Conditional style: highlight selected category
                background: selectedCategory === cat ? "#ff6b35" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#333",
                borderColor: selectedCategory === cat ? "#ff6b35" : "#e0e0e0",
              }}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
 
      {/* ── HOW IT WORKS ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <div style={styles.stepsRow}>
          {[
            { icon: "🔍", step: "1", title: "Browse Menu",    desc: "Explore 100+ dishes" },
            { icon: "🛒", step: "2", title: "Add to Cart",    desc: "Pick your favourites" },
            { icon: "💳", step: "3", title: "Pay Securely",   desc: "Multiple payment options" },
            { icon: "🚀", step: "4", title: "Fast Delivery",  desc: "At your door in 30 min" },
          ].map((s) => (
            <div key={s.step} style={styles.stepCard}>
              <div style={styles.stepIcon}>{s.icon}</div>
              <div style={styles.stepNum}>Step {s.step}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>
 
    </div>
  );
}
 
const styles = {
  page: { background: "#f8f8f8", minHeight: "100vh" },
  loadingScreen: {
    minHeight: "80vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
  },
  spinner: {
    width: "40px", height: "40px",
    border: "4px solid #ffe0d4",
    borderTop: "4px solid #ff6b35",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  hero: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    padding: "64px 40px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    maxWidth: "1100px", margin: "0 auto",
    borderRadius: "0 0 32px 32px",
  },
  heroContent: { flex: 1 },
  heroTitle: { fontSize: "48px", fontWeight: 900, color: "#fff", marginBottom: "12px" },
  heroSub: { fontSize: "18px", color: "#aaa", fontWeight: 400, marginBottom: "28px" },
  heroCta: {
    background: "#ff6b35", color: "#fff", border: "none",
    padding: "14px 32px", borderRadius: "100px",
    fontSize: "16px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  },
  heroEmoji: { fontSize: "100px", flexShrink: 0 },
  offerBanner: {
    background: "linear-gradient(90deg, #ff6b35, #ff8c60)",
    padding: "16px 40px", textAlign: "center",
    transition: "all 0.5s",
  },
  offerText: { color: "#fff", fontSize: "18px", fontWeight: 700 },
  offerSub: { color: "rgba(255,255,255,0.85)", fontSize: "13px", marginTop: "4px" },
  section: { maxWidth: "1100px", margin: "0 auto", padding: "48px 32px" },
  sectionTitle: { fontSize: "26px", fontWeight: 800, color: "#1a1a2e", marginBottom: "24px" },
  categoryRow: { display: "flex", flexWrap: "wrap", gap: "12px" },
  catBtn: {
    padding: "10px 20px", borderRadius: "100px",
    border: "1.5px solid", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
  },
  stepsRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
  stepCard: {
    flex: 1, minWidth: "200px",
    background: "#fff", borderRadius: "16px",
    padding: "24px", textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  stepIcon: { fontSize: "36px", marginBottom: "8px" },
  stepNum: { fontSize: "11px", fontWeight: 700, color: "#ff6b35", letterSpacing: "0.1em", marginBottom: "4px" },
  stepTitle: { fontSize: "15px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" },
  stepDesc: { fontSize: "13px", color: "#888" },
};
 
export default Home;
