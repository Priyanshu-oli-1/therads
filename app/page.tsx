// app/page.tsx
import BrandsStrip from "@/components/home/BrandsStrip";
import DealsOfTheMonth from "@/components/home/DealsOfTheMonth";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import InstagramGallery from "@/components/home/InstagramGallery";
import NewArrivals from "@/components/home/NewArrivals";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/layout/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/components/auth/authContext";

export default function Home() {
  return (
    <ProtectedRoute>
    <AuthProvider>
    <main>
      <Hero />
      <BrandsStrip />
      <DealsOfTheMonth />
      <NewArrivals />
      <FeaturedCollection />
      <InstagramGallery />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
    </AuthProvider>
    </ProtectedRoute>
  );
}