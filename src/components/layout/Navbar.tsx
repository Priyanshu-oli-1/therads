// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../cart/cartContext";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAuth } from "../auth/authContext";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Deals", href: "#deals" },
  { label: "New Arrivals", href: "#new-arrivals" },
];

const LOGGED_IN_LINKS = [
  { label: "Store", href: "/products" },
  { label: "Profile", href: "/profile" },
  { label: "Packages", href: "/packages" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/cart");
    } else {
      router.push("/cart");
    }
  };

  const handleSectionLink = (href: string) => {
    const targetId =
      href.replace(/^\//, "").split("#")[1] || href.split("#")[1];
    if (!targetId) {
      return;
    }

    const section = document.getElementById(targetId);
    if (!section) {
      return;
    }

    const headerOffset = 96;
    const top =
      section.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    onClose?: () => void,
  ) => {
    if (onClose) onClose();

    if (href.startsWith("#")) {
      event.preventDefault();
      handleSectionLink(href);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const visibleNavLinks = isLoggedIn
    ? [{ label: "Home", href: "/" }, ...LOGGED_IN_LINKS]
    : NAV_LINKS;

  return (
    <header className="relative bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-4xl font-bold tracking-wide text-gray-800"
        >
          THREADS
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-15">
          {visibleNavLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-gray-800 hover:text-black transition-colors"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons (desktop) — grouped, close together */}
        <div className="hidden md:flex items-center gap-6">
          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className="relative text-gray-700 hover:text-black transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-sm font-medium text-gray-700 border border-gray-300
                         px-6 py-3 rounded-md hover:border-black hover:text-black
                         transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-700 border border-gray-300
                           px-6 py-3 rounded-md hover:border-black hover:text-black
                           transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-sm font-medium bg-black text-white px-7 py-3 rounded-md
                           hover:opacity-85 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-8 md:hidden z-50">
            {visibleNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-black transition-colors"
                onClick={(event) =>
                  handleNavClick(event, link.href, () => setIsOpen(false))
                }
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3">
              {/* Mobile Cart Button */}
              <button
                onClick={() => {
                  handleCartClick();
                  setIsOpen(false);
                }}
                className="relative text-gray-600 hover:text-black transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium text-gray-600 border border-gray-300
                             px-6 py-2.5 rounded-md hover:border-black hover:text-black
                             transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium text-gray-600 border border-gray-300
                               px-6 py-2.5 rounded-md hover:border-black hover:text-black
                               transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="text-sm font-medium bg-black text-white px-7 py-2.5 rounded-md
                               hover:opacity-85 transition-opacity"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
