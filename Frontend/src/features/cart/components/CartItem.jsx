const CartItem = ({ item, onUpdate, onDelete }) => {
  const { id, name, price, quantity, image_url } = item;

  return (
    <div className="flex gap-6 border-b border-gray-200 pb-6">

      {/* Image */}
      <div className="bg-gray-100 w-28 h-28 flex-shrink-0 overflow-hidden">
        <img
          src={image_url || '/placeholder.png'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-black tracking-wide uppercase text-sm">{name}</h3>
          <p className="font-bold text-black text-lg">${(price * quantity).toFixed(2)}</p>
        </div>

        <p className="text-gray-400 text-sm">${price} each</p>

        <div className="flex items-center justify-between mt-2">

          {/* Quantity Controls */}
          <div className="flex items-center border-2 border-black">
            <button
              onClick={() => onUpdate(id, quantity - 1)}
              disabled={quantity <= 1}
              className="px-4 py-2 text-black font-bold hover:bg-black hover:text-white transition-colors disabled:opacity-30"
            >
              -
            </button>
            <span className="px-4 py-2 font-semibold text-sm tracking-widest">{quantity}</span>
            <button
              onClick={() => onUpdate(id, quantity + 1)}
              className="px-4 py-2 text-black font-bold hover:bg-black hover:text-white transition-colors"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => onDelete(id)}
            className="text-xs font-semibold tracking-widest uppercase text-red-500 hover:text-red-700 transition-colors border-b border-red-500"
          >
            Remove
          </button>

        </div>
      </div>
    </div>
  );
};

export default CartItem;