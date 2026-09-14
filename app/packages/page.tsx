import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PackagesPage() {
  return (
    <ProtectedRoute>
      <div>
        this is the packages page
      </div>
    </ProtectedRoute>
  );
}