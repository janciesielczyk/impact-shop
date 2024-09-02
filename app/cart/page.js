'use client';
import { useCart } from '../context/CartContext';

export default function Page() {
  const { cart, totalValue, removeFromCart, updateQuantity } = useCart();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="mb-4 flex justify-between items-center">
                <div>
                  <h4 className="text-lg">{item.title}</h4>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border p-1 text-center mr-4"
                  />
                  <button
                    className="bg-red-500 text-white px-4 py-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
                      <h3 className='text-lg font-bold'>Total: {totalValue}</h3>

        </div>
    </main>
  );
}
