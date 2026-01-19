"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FaTrash, FaArrowRight, FaShoppingBag } from "react-icons/fa";

export default function CartPage() {
  const { items, removeFromCart, clearCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="bg-white p-6 rounded-full shadow-sm inline-flex">
            <FaShoppingBag className="text-6xl text-zinc-300" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Your cart is empty</h2>
          <p className="text-zinc-500">Looks like you haven't added anything yet.</p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <ul className="divide-y divide-zinc-100">
            {items.map((item) => (
              <li key={item.product.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 flex-shrink-0 bg-zinc-100 rounded-xl overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-zinc-900">{item.product.name}</h3>
                  <p className="text-sm text-zinc-500">{item.quantity} x Rs {item.product.price}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-orange-600">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          <div className="bg-zinc-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
            <button
              onClick={clearCart}
              className="text-sm text-red-500 font-semibold hover:text-red-600 underline"
            >
              Clear Cart
            </button>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="block text-xs text-zinc-500 uppercase font-semibold">Total</span>
                <span className="text-2xl font-black text-zinc-900">
                  Rs {getCartTotal().toLocaleString()}
                </span>
              </div>
              
              <Link
                href="/checkout"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg"
              >
                Checkout <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
