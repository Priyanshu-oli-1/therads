export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold">
        My Profile
      </h1>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">Guest User</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">guest@example.com</p>
        </div>
      </div>
    </main>
  );
}