export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      {/* Footer Main */}
      <div className="mx-auto flex min-h-[78px] max-w-[1200px] items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <div className="font-serif text-[18px] font-semibold tracking-wide text-[#4a4a4a]">
          FASCO
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#"
            className="text-[9px] text-gray-600 transition hover:text-black"
          >
            Support Center
          </a>

          <a
            href="#"
            className="text-[9px] text-gray-600 transition hover:text-black"
          >
            Invoicing
          </a>

          <a
            href="#"
            className="text-[9px] text-gray-600 transition hover:text-black"
          >
            Contract
          </a>

          <a
            href="#"
            className="text-[9px] text-gray-600 transition hover:text-black"
          >
            Careers
          </a>

          <a
            href="#"
            className="text-[9px] text-gray-600 transition hover:text-black"
          >
            Blog
          </a>

          <a
            href="#"
            className="text-[9px] text-gray-600 transition hover:text-black"
          >
            FAQs
          </a>
        </nav>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100 py-5 text-center">
        <p className="text-[7px] text-gray-500">
          Copyright © 2022 Xpro. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}