"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import Swal from "sweetalert2";

type Props = {
  product: Product;
};

export default function QuantitySelector({ product }: Props) {
  const [qty, setQty] = useState<number>(1);
  const { addToCart } = useCart();

  const inc = () => setQty((q) => Math.min(q + 1, 20));
  const dec = () => setQty((q) => Math.max(q - 1, 1));
  const setPreset = (n: number) => setQty(n);
  const total = product.price * qty;

  const handleAddToCart = () => {
    addToCart(product, qty);
    Swal.fire({
      title: "Added to Cart!",
      text: `${qty} ${product.name} added to your cart.`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPreset(1)}
          className={`rounded-md px-3 py-2 text-sm border ${
            qty === 1 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-900 border-zinc-300"
          }`}
        >
          1
        </button>
        <button
          onClick={() => setPreset(2)}
          className={`rounded-md px-3 py-2 text-sm border ${
            qty === 2 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-900 border-zinc-300"
          }`}
        >
          2
        </button>
        <button
          onClick={() => setPreset(5)}
          className={`rounded-md px-3 py-2 text-sm border ${
            qty === 5 ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-900 border-zinc-300"
          }`}
        >
          5
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={dec}
          className="rounded-md border border-zinc-300 w-10 h-10 flex items-center justify-center text-lg hover:bg-zinc-50"
          aria-label="decrement"
        >
          −
        </button>
        <div className="text-lg font-medium">{qty}</div>
        <button
          onClick={inc}
          className="rounded-md border border-zinc-300 w-10 h-10 flex items-center justify-center text-lg hover:bg-zinc-50"
          aria-label="increment"
        >
          +
        </button>
      </div>
      <div className="text-xl font-semibold">Total: Rs {total.toLocaleString()}</div>
      <button
        onClick={handleAddToCart}
        className="inline-flex items-center gap-2 rounded-md bg-orange-600 text-white px-4 py-2 text-sm hover:bg-orange-700 w-fit font-bold transition-all shadow-md active:scale-95"
      >
        <FaShoppingCart /> Add to Cart
      </button>
      <p className="text-xs text-zinc-500">Price shown per item</p>
    </div>
  );
}

