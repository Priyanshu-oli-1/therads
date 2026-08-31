export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

        <p className="mt-4 text-sm text-gray-500">
          Loading...
        </p>
      </div>
    </main>
  );
}