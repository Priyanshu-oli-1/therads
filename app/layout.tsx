import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/components/cart/cartContext";
import { AuthProvider } from "@/components/auth/authContext";
import BackToTop from "@/components/products/BackToTop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threads",
  description: "Threads is a modern e-commerce platform that offers a wide range of high-quality products, from fashion to electronics. Our mission is to provide a seamless shopping experience with exceptional customer service.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Navbar/>
            {children}
            <BackToTop />
          </CartProvider>
        </AuthProvider>
        </body>
    </html>
  );
}
