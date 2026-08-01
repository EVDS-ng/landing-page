"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/api";

const API = API_BASE;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
  });

  const hasLowercase = /[a-z]/.test(formData.password);
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);
  const hasLength = formData.password.length >= 8;
  const passwordValid = hasLowercase && hasUppercase && hasNumber && hasLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordValid) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/vendor/auth/preflight`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          business_name: formData.businessName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      // Store password in sessionStorage so verify page can complete registration
      sessionStorage.setItem("vendor_reg_password", formData.password);
      sessionStorage.setItem("vendor_reg_business", formData.businessName);

      router.push(`/vendor/verify?email=${encodeURIComponent(formData.email)}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-primary hover:text-secondary-red transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-secondary-blue">Step 1 of 2</span>
          <div className="flex gap-1">
            <div className="h-1 w-16 bg-secondary-yellow rounded-full"></div>
            <div className="h-1 w-2 bg-yellow-200 rounded-full"></div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        Register as a <span className="text-secondary-red">Vendor</span>
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Start your journey as an Everyday Surprises vendor today.
      </p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-primary block">
            Business name
          </label>
          <input
            type="text"
            required
            placeholder="Enter business name"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue transition-all bg-transparent placeholder:text-gray-400"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-primary block">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="Enter email address"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue transition-all bg-transparent placeholder:text-gray-400"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-primary block">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue transition-all bg-transparent placeholder:text-gray-400"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 pb-4">
          {[
            { ok: hasLowercase, label: "1 lowercase letter" },
            { ok: hasUppercase, label: "1 uppercase letter" },
            { ok: hasNumber, label: "1 number" },
            { ok: hasLength, label: "8 characters" },
          ].map(({ ok, label }) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                ok ? "bg-light-blue-50 text-secondary-blue" : "bg-red-50 text-secondary-red"
              }`}
            >
              {ok ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
              {label}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={!passwordValid || loading}
          className="w-full bg-secondary-red hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Sending OTP...
            </span>
          ) : (
            <>Continue to step 2 <span className="text-lg leading-none">→</span></>
          )}
        </button>
      </form>

      {/* Social sign-in removed from web — Google & Apple sign-in is mobile only */}

      <div className="mt-12 text-center text-sm font-medium">
        Already have an account?{" "}
        <a href="#" className="text-secondary-red hover:underline">
          Sign in on mobile app
        </a>
      </div>
    </div>
  );
}
