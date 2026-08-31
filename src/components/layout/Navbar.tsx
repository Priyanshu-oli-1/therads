"use client";
import Link from "next/link";
// import { useCart } from "../cart/cartContext";

export default function Navbar() {
  const { cart } = useCart();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Link href="/" className="text-xl font-bold tracking-wider">
          THREADS
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/products">Shop</Link>
          <Link href="/products">Categories</Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/products">Search</Link>
          <Link href="/cart" className="relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 text-xs">({cartCount})</span>
            )}
          </Link>
          <Link href="/profile">Profile</Link>
        </div>
      </nav>
    </header>
  );
}
