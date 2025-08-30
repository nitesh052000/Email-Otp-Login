"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState("");

  async function requestOtp() {
    const res = await fetch("/api/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.ok) {
      setStage("otp");
      setDevCode(data.devCode);
    }
  }

  async function verifyOtp() {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    if (res.ok) window.location.href = "/hello";
  }

  return (
   <main className="min-h-screen flex items-center justify-center  p-4">
  <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
    {stage === "email" && (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-black">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={requestOtp}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </div>
    )}

    {stage === "otp" && (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Enter OTP</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6-digit code"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
        <button
          onClick={verifyOtp}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
        >
          Verify
        </button>
        {devCode && (
          <p className="mt-2 text-sm text-red-500 text-center">Dev Only Code: {devCode}</p>
        )}
      </div>
    )}
  </div>
</main>

  );
}
