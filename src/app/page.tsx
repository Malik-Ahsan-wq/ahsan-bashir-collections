"use client"; // Required for state

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";

// --- SUB-COMPONENT FOR INDIVIDUAL PRODUCTS ---
function ProductCard({ p }: { p: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = p.price * quantity;

  const handleAddToCart = () => {
    addToCart(p, quantity);
    Swal.fire({
      title: "Added to Cart!",
      text: `${quantity} ${p.name} added to your cart.`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  return (
    <div
      className=" group rounded-2xl border border-zinc-100 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      data-aos="fade-up"
    >
      <Link href={`/product/${p.slug}`} className="block overflow-hidden">
        <Image
          src={p.image}
          alt={p.name}
          width={400}
          height={320}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      
      <div className="p-5 flex flex-col gap-3">
        <Link href={`/product/${p.slug}`} className="font-bold text-lg text-zinc-800 hover:text-orange-600 transition-colors">
          {p.name}
        </Link>

        {/* --- QUANTITY CONTROLS --- */}
        <div className="flex items-center justify-between bg-zinc-50 rounded-lg p-2 border border-zinc-100">
          <span className="text-xs font-semibold text-zinc-500 uppercase ml-1">Quantity</span>
          <div className="flex items-center gap-4">
            <button 
              onClick={decrement}
              className="p-2 rounded-md bg-white border border-zinc-200 text-zinc-600 hover:bg-orange-50 hover:text-orange-600 transition-colors shadow-sm"
            >
              <FaMinus size={12} />
            </button>
            <span className="font-bold text-zinc-800 min-w-[20px] text-center">{quantity}</span>
            <button 
              onClick={increment}
              className="p-2 rounded-md bg-white border border-zinc-200 text-zinc-600 hover:bg-orange-50 hover:text-orange-600 transition-colors shadow-sm"
            >
              <FaPlus size={12} />
            </button>
          </div>
        </div>

        {/* --- DYNAMIC PRICE --- */}
        <div className="flex items-center justify-between pt-1">
          <p className="text-xl font-black text-zinc-900">
            Rs {totalPrice.toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 text-white px-4 py-3 text-sm font-bold transition-all hover:bg-orange-700 shadow-md active:scale-95 mt-1"
        >
          <FaShoppingCart className="text-base" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

// --- MAIN HOME COMPONENT ---
export default function Home() {
  return (
    <main className="bg-black-50 min-h-screen">
      {/* --- HERO SECTION (Keeping your CSS from previous step) --- */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-50 via-white to-rose-50 rounded-3xl mt-6 ">
        <div data-aos="fade-right" className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
            Discover <span className="text-orange-600">Signature Recipes</span> at AB Restaurant
          </h1>
          <p className="max-w-lg text-lg md:text-xl text-zinc-600 leading-relaxed">
            Fresh ingredients, crafted flavors, and beautiful plating for every occasion. Experience the art of fine dining.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="rounded-full bg-zinc-900 text-white px-8 py-3.5 text-sm font-semibold transition-all hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              Explore Menu
            </Link>
          </div>
        </div>
        
<div 
  className="relative group max-w-2xl mx-auto" 
  data-aos="fade-up" 
  data-aos-duration="1200"
>
  {/* 1. Animated Ambient Glow - Yeh peeche se halka sa move karega */}
  <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-rose-500/10 to-orange-500/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-110 animate-pulse"></div>

  {/* 2. Main Image Wrapper - Floating Animation ke saath */}
  <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/5 backdrop-blur-md shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-[-10px] group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.35)] animate-float">
    
    <Image
      src="/assets/headerimage.avif"
      alt="AB Restaurant hero"
      width={600}
      height={1000}
      className="w-full h-auto object-cover transform transition-all duration-[2000ms] ease-out group-hover:scale-110"
      priority
    />
    
    {/* 3. Shine Effect - Jab mouse upar aaye toh ek chamak guzre */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1500ms]"></div>
    </div>

    {/* Subtle Dark Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
  </div>

  {/* 4. Secondary Decorative Blur */}
  <div className="absolute -top-10 -left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl mix-blend-multiply filter animate-blob"></div>
</div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-zinc-900" data-aos="fade-up">
            Chef&apos;s Specials
          </h2>
          <div className="h-1 flex-grow ml-6 bg-gradient-to-r from-orange-100 to-transparent rounded-full hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.slice(0, 24).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
