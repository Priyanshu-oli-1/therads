"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          type="button"
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-40 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
          aria-label="Back to top"
          title="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}