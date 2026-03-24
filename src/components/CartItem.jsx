import { useDispatch } from "react-redux";
import { addItem, removeItem, deleteItem } from "../redux/cartSlice";
 
function CartItem({ item }) {
  const dispatch = useDispatch();
 
  return (
    <div style={styles.row}>
      {/* Emoji thumbnail */}
      <div style={styles.thumb}>{item.emoji}</div>
 
      {/* Name + unit price */}
      <div style={styles.info}>
        <div style={styles.name}>{item.name}</div>
        <div style={styles.unitPrice}>₹{item.price} each</div>
      </div>
 
      {/* Quantity controls */}
      <div style={styles.controls}>
        <button style={styles.btn} onClick={() => dispatch(removeItem(item.id))}>−</button>
        <span style={styles.qty}>{item.quantity}</span>
        <button style={styles.btn} onClick={() => dispatch(addItem(item))}>+</button>
      </div>
 
      {/* Subtotal for this item */}
      <div style={styles.subtotal}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </div>
 
      {/* Delete button */}
      <button
        style={styles.deleteBtn}
        onClick={() => dispatch(deleteItem(item.id))}
        title="Remove item"
      >
        🗑️
      </button>
    </div>
  );
}
 
const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#fff",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  thumb: {
    fontSize: "36px",
    width: "56px", height: "56px",
    background: "#fff5f0",
    borderRadius: "12px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: { fontSize: "15px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" },
  unitPrice: { fontSize: "13px", color: "#999" },
  controls: {
    display: "flex", alignItems: "center", gap: "10px",
    background: "#f5f5f5", borderRadius: "8px", padding: "4px 8px",
  },
  btn: {
    background: "#ff6b35", color: "#fff",
    border: "none", borderRadius: "6px",
    width: "26px", height: "26px",
    fontSize: "16px", cursor: "pointer", fontFamily: "inherit",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  qty: { fontSize: "15px", fontWeight: 700, minWidth: "20px", textAlign: "center" },
  subtotal: { fontSize: "16px", fontWeight: 800, color: "#ff6b35", minWidth: "60px", textAlign: "right" },
  deleteBtn: {
    background: "none", border: "none",
    fontSize: "18px", cursor: "pointer", padding: "4px",
  },
};
 
export default CartItem;
