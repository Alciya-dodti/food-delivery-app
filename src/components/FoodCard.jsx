import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/cartSlice";
 
function FoodCard({ food }) {
  // CONCEPT: useState — local UI state
  const [isHovered, setIsHovered] = useState(false);
 
  // CONCEPT: useDispatch — function to send actions to Redux
  const dispatch = useDispatch();
 
  // CONCEPT: useSelector — read how many of THIS item are in cart
  // We find this specific item by id in the cart items array
  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.id === food.id)
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;
 
  // CONCEPT: Event handling
  const handleAdd = () => {
    dispatch(addItem(food));    // sends { type: "cart/addItem", payload: food }
  };
 
  const handleRemove = () => {
    dispatch(removeItem(food.id));
  };
 
  return (
    <div
      style={{
        ...styles.card,
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 12px 32px rgba(0,0,0,0.2)"
          : "0 2px 8px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Food image (emoji for simplicity) */}
      <div style={styles.imageBox}>{food.emoji}</div>
 
      {/* Category tag */}
      <span style={styles.tag}>{food.category}</span>
 
      {/* Name & description */}
      <h3 style={styles.name}>{food.name}</h3>
      <p style={styles.desc}>{food.description}</p>
 
      {/* Price + rating row */}
      <div style={styles.row}>
        <span style={styles.price}>₹{food.price}</span>
        <span style={styles.rating}>⭐ {food.rating}</span>
      </div>
 
      {/* CONCEPT: Conditional Rendering
          If item is NOT in cart → show single "Add" button
          If item IS in cart    → show - qty + controls       */}
      {quantityInCart === 0 ? (
        <button style={styles.addBtn} onClick={handleAdd}>
          + Add to Cart
        </button>
      ) : (
        <div style={styles.qtyControls}>
          <button style={styles.qtyBtn} onClick={handleRemove}>−</button>
          <span style={styles.qty}>{quantityInCart}</span>
          <button style={styles.qtyBtn} onClick={handleAdd}>+</button>
        </div>
      )}
    </div>
  );
}
 
const styles = {
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    width: "260px",
    transition: "all 0.25s ease",
    cursor: "default",
    border: "1px solid #f0f0f0",
  },
  imageBox: {
    background: "linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)",
    fontSize: "64px",
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    display: "inline-block",
    background: "#fff0ea",
    color: "#ff6b35",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: "100px",
    margin: "12px 16px 0",
  },
  name: {
    fontSize: "17px",
    fontWeight: 700,
    color: "#1a1a2e",
    margin: "8px 16px 4px",
  },
  desc: {
    fontSize: "13px",
    color: "#888",
    margin: "0 16px 12px",
    lineHeight: 1.5,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px 12px",
  },
  price: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#1a1a2e",
  },
  rating: {
    fontSize: "13px",
    color: "#666",
  },
  addBtn: {
    width: "calc(100% - 32px)",
    margin: "0 16px 16px",
    padding: "10px",
    background: "#ff6b35",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background 0.2s",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    margin: "0 16px 16px",
    background: "#fff5f0",
    borderRadius: "10px",
    padding: "8px",
  },
  qtyBtn: {
    width: "32px",
    height: "32px",
    background: "#ff6b35",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1a1a2e",
    minWidth: "24px",
    textAlign: "center",
  },
};
 
export default FoodCard;
