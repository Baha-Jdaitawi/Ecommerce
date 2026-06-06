function CartItem({ item, onUpdate, onDelete }) {
  const { id, name, price, quantity, image_url } = item;

  return (
    <div>
      <img src={image_url || '/placeholder.png'} alt={name} />

      <div>
        <h3>{name}</h3>
        <p>${price}</p>
      </div>

      <div>
        <button onClick={() => onUpdate(id, quantity - 1)} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onUpdate(id, quantity + 1)}>+</button>
      </div>

      <p>${(price * quantity).toFixed(2)}</p>

      <button onClick={() => onDelete(id)}>Remove</button>
    </div>
  );
}

export default CartItem;