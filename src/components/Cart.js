function Cart({ cartItems, removeFromCart }) {

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((item, index) => (
        <div key={index}>
          <p>{item.name} - ₹{item.price}</p>
          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;

