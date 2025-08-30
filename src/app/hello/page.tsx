"use client";

export default function Hello() {
  async function signout() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
  <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col items-center gap-6">
    <h1 className="text-3xl font-bold text-gray-800">Hello</h1>
    <button
      onClick={signout}
      className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600 transition"
    >
      Sign out
    </button>
  </div>
</main>

  );
}
