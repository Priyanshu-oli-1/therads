// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Deals", href: "/deals" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Packages", href: "/packages" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-16 py-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-bold tracking-wide text-gray-800"
        >
          THREADS
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-gray-400 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons (desktop) — grouped, close together */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-600 border border-gray-300
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-black transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3">
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}