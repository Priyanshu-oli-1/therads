"use client";

export default function BackToTop() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-100"
    >
      Back to Top
    </button>
  );
}