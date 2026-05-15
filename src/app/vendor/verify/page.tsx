"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PencilLine } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    // Allow only digits
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    const nextEmpty = pasted.length < 6 ? pasted.length : 5;
    inputRefs.current[nextEmpty]?.focus();
  };

  const handleResend = async () => {
    setError("");
    try {
      const res = await fetch(`${API}/vendor/auth/preflight/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to resend OTP.");
        return;
      }
      setTimeLeft(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setError("Network error. Please try again.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: verify OTP → get session
      const verifyRes = await fetch(
        `${API}/vendor/auth/preflight/verify?email=${encodeURIComponent(email)}&token=${otpValue}`
      );
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        router.push("/vendor/error");
        return;
      }

      const session = verifyData.data?.verification_session;
      if (!session) {
        setError("Verification failed. Please try again.");
        setLoading(false);
        return;
      }

      // Step 2: register with session + password
      const password = sessionStorage.getItem("vendor_reg_password");
      if (!password) {
        setError("Session expired. Please go back and register again.");
        setLoading(false);
        return;
      }

      const registerRes = await fetch(`${API}/vendor/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session, password }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.message || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Clean up session storage
      sessionStorage.removeItem("vendor_reg_password");
      sessionStorage.removeItem("vendor_reg_business");

      router.push("/vendor/success");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const otpFilled = otp.join("").length === 6;

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.push("/vendor/register")}
          className="text-primary hover:text-secondary-red transition-colors"
        >
          ‹
        </button>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-secondary-blue">Step 2 of 2</span>
          <div className="flex gap-1">
            <div className="h-1 w-8 bg-secondary-yellow rounded-full"></div>
            <div className="h-1 w-8 bg-secondary-yellow rounded-full"></div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">
        Verify <span className="text-secondary-red">Your Account</span>
      </h1>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        An OTP has been sent to your email at{" "}
        <span className="text-secondary-blue font-semibold">{email}</span> for
        verification purpose.
      </p>

      <button
        onClick={() => router.push("/vendor/register")}
        className="flex items-center gap-1.5 text-secondary-red text-sm font-semibold hover:text-red-600 transition-colors mb-8"
      >
        Change email <PencilLine size={16} />
      </button>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-primary block">
            Enter OTP
          </label>
          <div className="flex gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-14 text-center text-2xl font-bold rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue transition-all bg-transparent"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Didn&apos;t receive code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-semibold ${
              timeLeft > 0
                ? "text-secondary-blue cursor-default"
                : "text-secondary-red hover:underline"
            }`}
          >
            Resend{" "}
            {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, "0")}` : ""}
          </button>
        </div>

        <button
          type="submit"
          disabled={!otpFilled || loading}
          className="w-full bg-secondary-red hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm mt-4"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Verifying...
            </span>
          ) : (
            <>Verify <span className="text-lg leading-none">→</span></>
          )}
        </button>
      </form>

      <div className="mt-24 text-center text-sm font-medium">
        Already have an account?{" "}
        <a href="#" className="text-secondary-red hover:underline">
          Sign in on mobile app
        </a>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md mx-auto text-center py-12">Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}
