import Link from "next/link";

export default function CartHeader() {
  return (
    <header className="text-center">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-black sm:text-4xl">
        Shopping Cart
      </h1>

      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-gray-500 sm:text-xs">
        <Link href="/" className="transition hover:text-black">
          Home
        </Link>

        <span>›</span>

        <span className="font-medium text-gray-700">Your Shopping Cart</span>
      </div>
    </header>
  );
}