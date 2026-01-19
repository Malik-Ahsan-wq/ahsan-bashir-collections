"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FaShoppingCart, FaUserShield } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Menu" },
  { href: "/ourStory", label: "Our Story" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="  sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-lg border-b border-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-xl transition-transform group-hover:rotate-12">
              A
            </div>
            <span className="text-xl font-black tracking-tight text-zinc-900 uppercase">
              AB <span className="text-orange-600">Restaurant</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors hover:text-orange-600 ${
                    isActive ? "text-orange-600" : "text-zinc-600"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-[31px] left-0 w-full h-1 bg-orange-600 rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/admin/dashboard"
              className="hidden sm:inline-flex items-center gap-2 text-zinc-600 hover:text-orange-600 font-medium transition-colors"
            >
              <FaUserShield className="text-xl" />
              <span className="hidden lg:inline">Admin</span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-zinc-600 hover:text-orange-600 transition-colors"
            >
              <FaShoppingCart className="text-2xl" />
              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-full bg-zinc-900 text-white px-6 py-2.5 text-sm font-bold">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden text-zinc-600 hover:text-orange-600"
            >
              <HiMenuAlt3 size={28} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden mt-4 rounded-xl border border-zinc-200 bg-white shadow-lg">
            <nav className="flex flex-col divide-y">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-5 py-4 text-sm font-semibold ${
                    pathname === link.href
                      ? "text-orange-600"
                      : "text-zinc-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
