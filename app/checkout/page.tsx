import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
  return (
    <>
    <ProtectedRoute>
      <CheckoutForm />
      <Newsletter />
      <Footer />
    </ProtectedRoute>
    </>
  );
}