"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { FaWhatsapp, FaStar, FaRegStar, FaPlus, FaMinus } from "react-icons/fa";

// --- REUSABLE PRODUCT CARD COMPONENT ---
function ProductCard({ p }: { p: Product }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = p.price * quantity;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ordering ${quantity}kg of ${p.name}. Total Price: Rs ${totalPrice.toLocaleString()}`
  );

  return (
    <div
      className="group rounded-2xl border border-zinc-100 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${p.slug}`} className="block">
          <Image
            src={p.image}
            alt={p.name}
            width={400}
            height={320}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {/* Rating Badge Overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-orange-600 shadow-sm">
          <FaStar className="text-[10px]" /> {p.rating}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div>
          <Link href={`/product/${p.slug}`} className="font-bold text-lg text-zinc-800 hover:text-orange-600 transition-colors line-clamp-1">
            {p.name}
          </Link>
          <div className="flex items-center gap-0.5 text-amber-500 mt-1 text-xs">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(p.rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
            )}
          </div>
        </div>

        {/* --- QUANTITY CONTROLS --- */}
        <div className="flex items-center justify-between bg-zinc-50 rounded-xl p-2 border border-zinc-100">
          <span className="text-[10px] font-bold text-zinc-400 uppercase ml-2 tracking-wider">Qty</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={decrement}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm active:scale-90"
            >
              <FaMinus size={10} />
            </button>
            <span className="font-bold text-zinc-800 text-sm">{quantity} <small className="text-[10px] font-normal text-zinc-500">kg</small></span>
            <button 
              onClick={increment}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:bg-orange-50 hover:text-orange-600 transition-all shadow-sm active:scale-90"
            >
              <FaPlus size={10} />
            </button>
          </div>
        </div>

        {/* --- DYNAMIC PRICE --- */}
        <div className="flex items-baseline justify-between pt-1">
          <p className="text-xl font-black text-zinc-900">
            Rs {totalPrice.toLocaleString()}
          </p>
          <span className="text-xs text-zinc-400 font-medium">Rs {p.price}/kg</span>
        </div>

        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white px-4 py-3 text-sm font-bold transition-all hover:bg-green-700 shadow-md active:scale-95 mt-1"
        >
          <FaWhatsapp className="text-lg" /> Order via WhatsApp
        </a>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function ProductsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div data-aos="fade-right">
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">
              Our Full <span className="text-orange-600">Menu</span>
            </h1>
            <p className="text-zinc-500 mt-2 max-w-md italic">
              Explore our wide variety of signature dishes, crafted with the finest ingredients and culinary passion.
            </p>
          </div>
          <div className="h-px flex-grow bg-zinc-100 mb-4 mx-8 hidden lg:block"></div>
          <div className="text-sm font-medium text-zinc-400 uppercase tracking-widest" data-aos="fade-left">
            {products.length} Items Available
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
