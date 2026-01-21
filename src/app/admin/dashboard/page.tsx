"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { OrderData } from "@/lib/orderStorage";
import { FaBox, FaClock, FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin");
      return;
    }

    fetchOrders();
    const interval = setInterval(() => fetchOrders(true), 5000);
    return () => clearInterval(interval);
  }, [router]);

  const fetchOrders = async (isPolling = false) => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        if (isPolling) {
          setOrders(prev => {
            if (data.orders.length > prev.length) {
               const latestPrev = prev[0];
               const latestNew = data.orders[0];
               // Check if the top order is new
               if (!latestPrev || (latestNew && latestNew._id !== latestPrev._id)) {
                  Swal.fire({
                     toast: true,
                     position: 'top-end',
                     icon: 'success',
                     title: 'your new order Arrived perfectly',
                     showConfirmButton: false,
                     timer: 3000
                  });
                }
            }
            return data.orders;
          });
        } else {
          setOrders(data.orders);
        }
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      if (!isPolling) setLoading(false);
    }
  };

  const filteredOrders = filter === "All" 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-zinc-900">Admin Dashboard</h1>
          <div className="flex gap-2 bg-white p-1 rounded-lg border border-zinc-200 shadow-sm">
            {["All", "Pending", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === status
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div key={order._id as unknown as string} className="bg-white rounded-xl shadow-sm border border-zinc-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-zinc-900">Rs {order.totalAmount.toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{order.customerName}</p>
                    <p className="text-sm text-zinc-500">{order.phone}</p>
                    <p className="text-sm text-zinc-500 truncate">{order.address}</p>
                  </div>

                  <div className="border-t border-zinc-100 pt-3">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-2">Items</p>
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-zinc-700 flex justify-between">
                          <span>{item.productName} <span className="text-zinc-400">x{item.quantity}</span></span>
                          <span>Rs {item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-100 flex justify-between items-center">
                 <span className="text-xs font-medium text-zinc-500">{order.paymentMethod}</span>
                 {/* Future: Add buttons to update status */}
              </div>
            </div>
          ))}
        </div>
        
        {filteredOrders.length === 0 && (
            <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">No orders found.</p>
            </div>
        )}
      </div>
    </div>
  );
}
