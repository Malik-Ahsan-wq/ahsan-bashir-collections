"use client";

import { useState,useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaMoneyBillWave } from "react-icons/fa";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
  });

  if (!isClient || items.length === 0) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalAmount: getCartTotal(),
        paymentMethod: "Cash on Delivery",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to place order");
      }

      clearCart();
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed successfully. We will contact you shortly.",
        icon: "success",
        confirmButtonColor: "#ea580c",
      }).then(() => {
        router.push("/");
      });
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 h-fit">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">Order Summary</h2>
            <ul className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
              {items.map((item) => (
                <li key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-zinc-600">
                    {item.product.name} <span className="text-zinc-400">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-zinc-900">
                    Rs {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-100 pt-4 flex justify-between items-center">
              <span className="font-bold text-zinc-900">Total</span>
              <span className="text-xl font-black text-orange-600">
                Rs {getCartTotal().toLocaleString()}
              </span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
              <input
                type="text"
                name="customerName"
                required
                className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
                placeholder="0300 1234567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                required
                rows={3}
                className="w-full rounded-lg border border-zinc-200 px-4 py-2.5 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all resize-none"
                placeholder="House #, Street, City"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-zinc-700 mb-2">Payment Method</label>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-orange-200 bg-orange-50 text-orange-800">
                <FaMoneyBillWave className="text-xl" />
                <span className="font-semibold text-sm">Cash on Delivery</span>
                <input type="radio" checked readOnly className="ml-auto text-orange-600 focus:ring-orange-600" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
