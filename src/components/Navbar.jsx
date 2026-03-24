import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";       // read Redux state
import { useAuth } from "../context/AuthContext"; // read Context
 
function Navbar() {
  // CONCEPT: useSelector — subscribe to Redux store
  // Re-renders this component when totalQuantity changes
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
 
  // CONCEPT: useContext (via custom hook)
  const { user, logout } = useAuth();
 
  // CONCEPT: useNavigate — programmatic navigation (go to a route in code)
  const navigate = useNavigate();
 
  const handleLogout = () => {
    logout();
    navigate("/");   // redirect to home after logout
  };
 
  return (
    <nav style={styles.nav}>
      {/* Logo — Link is the React Router way to navigate without page reload */}
      <Link to="/" style={styles.logo}>
        🍔 QuickBite
      </Link>
 
      {/* Nav links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/menu" style={styles.link}>Menu</Link>
 
        {/* CONCEPT: Conditional Rendering
            If user is logged in → show name + logout
            If not logged in    → show Login link        */}
        {user ? (
          <div style={styles.userSection}>
            <span style={styles.userName}>👋 {user.name}</span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
 
        {/* Cart icon with badge */}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart
          {/* CONCEPT: Conditional Rendering — only show badge when cart has items */}
          {totalQuantity > 0 && (
            <span style={styles.badge}>{totalQuantity}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
 
const styles = {
  nav: {
    position: "sticky", top: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 32px", height: "64px",
    background: "#1a1a2e",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
  },
  logo: {
    fontSize: "22px", fontWeight: 800, color: "#ff6b35",
    textDecoration: "none", letterSpacing: "-0.5px",
  },
  links: {
    display: "flex", alignItems: "center", gap: "24px",
  },
  link: {
    color: "#ccc", textDecoration: "none", fontSize: "14px",
    fontWeight: 500, transition: "color 0.2s",
  },
  userSection: {
    display: "flex", alignItems: "center", gap: "12px",
  },
  userName: {
    color: "#ff6b35", fontSize: "14px", fontWeight: 600,
  },
  logoutBtn: {
    background: "none", border: "1px solid #555", color: "#ccc",
    padding: "4px 12px", borderRadius: "6px", cursor: "pointer",
    fontSize: "13px", fontFamily: "inherit",
  },
  cartBtn: {
    position: "relative",
    background: "#ff6b35", color: "#fff",
    padding: "8px 18px", borderRadius: "100px",
    textDecoration: "none", fontSize: "14px", fontWeight: 600,
    display: "flex", alignItems: "center", gap: "6px",
  },
  badge: {
    position: "absolute", top: "-8px", right: "-8px",
    background: "#fff", color: "#ff6b35",
    width: "20px", height: "20px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "11px", fontWeight: 800,
  },
};
 
export default Navbar;
 
