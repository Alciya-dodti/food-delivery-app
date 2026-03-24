import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";
 
function Cart() {
  // Read entire cart state from Redux store
  const { items, totalAmount, totalQuantity } = useSelector((s) => s.cart);
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { user }   = useAuth();
 
  const deliveryFee = totalAmount > 299 ? 0 : 40;
  const grandTotal  = totalAmount + deliveryFee;
 
  const handlePlaceOrder = () => {
    // CONCEPT: Conditional Rendering trigger
    if (!user) {
      alert("Please log in to place an order!");
      navigate("/login");
      return;
    }
    dispatch(clearCart());       // clear Redux cart
    navigate("/order-success");  // redirect to success page
  };
 
  // CONCEPT: Conditional Rendering — empty cart screen
  if (items.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.emptyIcon}>🛒</div>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Add some delicious food to get started!</p>
        <button style={styles.browseBtn} onClick={() => navigate("/menu")}>
          Browse Menu →
        </button>
      </div>
    );
  }
 
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Your Cart 🛒</h1>
        <p style={styles.sub}>{totalQuantity} item{totalQuantity !== 1 ? "s" : ""}</p>
 
        <div style={styles.layout}>
          {/* Cart items list */}
          <div style={styles.itemsList}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
 
          {/* Order summary panel */}
          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
 
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
 
            <div style={styles.summaryRow}>
              <span>Delivery</span>
              {/* Conditional Rendering: free delivery message */}
              <span style={{ color: deliveryFee === 0 ? "#22c55e" : "#333" }}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>
 
            {/* Show free delivery tip if not yet qualifying */}
            {deliveryFee > 0 && (
              <p style={styles.freeTip}>
                Add ₹{(299 - totalAmount).toFixed(0)} more for free delivery!
              </p>
            )}
 
            <div style={styles.divider} />
 
            <div style={{ ...styles.summaryRow, fontWeight: 800, fontSize: "18px" }}>
              <span>Total</span>
              <span style={{ color: "#ff6b35" }}>₹{grandTotal.toFixed(2)}</span>
            </div>
 
            <button style={styles.orderBtn} onClick={handlePlaceOrder}>
              Place Order →
            </button>
 
            {/* Show login hint if not logged in */}
            {!user && (
              <p style={styles.loginHint}>
                ⚠️ You need to <span
                  style={{ color: "#ff6b35", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >log in</span> to place an order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
const styles = {
  page: { background: "#f8f8f8", minHeight: "100vh", paddingBottom: "60px" },
  container: { maxWidth: "1000px", margin: "0 auto", padding: "40px 32px" },
  title: { fontSize: "30px", fontWeight: 900, color: "#1a1a2e", marginBottom: "4px" },
  sub: { fontSize: "14px", color: "#888", marginBottom: "32px" },
  layout: { display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" },
  itemsList: { flex: 1, minWidth: "300px" },
  summary: {
    width: "300px", background: "#fff",
    borderRadius: "20px", padding: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)", flexShrink: 0,
  },
  summaryTitle: { fontSize: "18px", fontWeight: 800, color: "#1a1a2e", marginBottom: "20px" },
  summaryRow: {
    display: "flex", justifyContent: "space-between",
    fontSize: "14px", color: "#555", marginBottom: "12px",
  },
  freeTip: {
    background: "#fff8f5", color: "#ff6b35",
    fontSize: "12px", padding: "8px 12px",
    borderRadius: "8px", marginBottom: "12px",
    border: "1px dashed #ffcbb5",
  },
  divider: { borderTop: "1px solid #f0f0f0", margin: "12px 0" },
  orderBtn: {
    width: "100%", padding: "14px",
    background: "#ff6b35", color: "#fff",
    border: "none", borderRadius: "12px",
    fontSize: "15px", fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
    marginTop: "8px",
  },
  loginHint: { fontSize: "12px", color: "#999", textAlign: "center", marginTop: "10px" },
  emptyPage: {
    minHeight: "80vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: "12px",
  },
  emptyIcon: { fontSize: "64px" },
  emptyTitle: { fontSize: "24px", fontWeight: 800, color: "#1a1a2e" },
  emptyText: { fontSize: "15px", color: "#888" },
  browseBtn: {
    marginTop: "8px",
    background: "#ff6b35", color: "#fff",
    border: "none", padding: "12px 28px",
    borderRadius: "100px", fontSize: "15px",
    fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
  },
};
 
export default Cart;
