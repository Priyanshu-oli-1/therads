import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* ==========================================
            LEFT SIDE — FASHION IMAGE
        =========================================== */}
        <div className="relative hidden min-h-screen lg:block">
          <Image
            src="/images/auth/auth-image.jpg"
            alt="THREADS fashion collection"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>

        {/* ==========================================
            RIGHT SIDE — AUTHENTICATION CONTENT
        =========================================== */}
        <div className="flex min-h-screen flex-col bg-white">
          {/* Main authentication content */}
          <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20">
            <div className="w-full max-w-[620px]">
              {/* THREADS Logo / Brand */}
              <div className="mb-16">
                <h1 className="font-serif text-5xl font-semibold tracking-tight text-gray-800">
                  THREADS
                </h1>
              </div>

              {/* Page-specific content */}
              {children}
            </div>
          </div>

          {/* Terms and conditions */}
          <div className="px-6 pb-8 text-center sm:px-10 lg:px-16 xl:px-20">
            <p className="text-xs text-gray-600">
              THREADS Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}