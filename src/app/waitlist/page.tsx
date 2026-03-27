"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  X,
  Loader2,
  ArrowRight,
  Gift,
  Star,
  Sparkles,
  Users,
  Clock,
} from "lucide-react";

interface FormData {
  full_name: string;
  email: string;
  phone: string;
}

interface ModalState {
  type: "success" | "error" | null;
  message?: string;
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center animate-modal-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle
              className="text-green-500 w-10 h-10"
              strokeWidth={1.5}
            />
          </div>
          {/* Confetti dots */}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-red-500" />
          <span className="absolute top-1 -left-2 w-2 h-2 rounded-full bg-blue-500" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          You&apos;re on the list! 🎉
        </h3>
        <p className="text-gray-500 leading-relaxed mb-2">
          Welcome to the Everyday Surprises family! We&apos;ll notify you as
          soon as we launch.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Keep an eye on your inbox — exciting things are coming.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#072147] hover:bg-[#0a2d5e] text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-lg"
        >
          Awesome, thanks!
        </button>
      </div>
    </div>
  );
}

function ErrorModal({
  message,
  onClose,
  onRetry,
}: {
  message: string;
  onClose: () => void;
  onRetry: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center animate-modal-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <XCircle className="text-red-500 w-10 h-10" strokeWidth={1.5} />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-500 leading-relaxed mb-8">
          {message ||
            "We couldn't add you to the waitlist right now. Please try again."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3.5 rounded-2xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onRetry}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-lg"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

// Floating particle component
function FloatingParticles() {
  const particles = [
    {
      size: "w-3 h-3",
      color: "bg-yellow-400",
      top: "10%",
      left: "8%",
      delay: "0s",
      duration: "7s",
    },
    {
      size: "w-2 h-2",
      color: "bg-red-400",
      top: "20%",
      left: "90%",
      delay: "1s",
      duration: "9s",
    },
    {
      size: "w-4 h-4",
      color: "bg-white/20",
      top: "60%",
      left: "5%",
      delay: "2s",
      duration: "8s",
    },
    {
      size: "w-2 h-2",
      color: "bg-yellow-300",
      top: "80%",
      left: "92%",
      delay: "0.5s",
      duration: "6s",
    },
    {
      size: "w-3 h-3",
      color: "bg-red-300/60",
      top: "45%",
      left: "95%",
      delay: "1.5s",
      duration: "10s",
    },
    {
      size: "w-2 h-2",
      color: "bg-white/30",
      top: "70%",
      left: "10%",
      delay: "3s",
      duration: "7s",
    },
    {
      size: "w-5 h-5",
      color: "bg-yellow-400/40",
      top: "30%",
      left: "3%",
      delay: "2.5s",
      duration: "11s",
    },
    {
      size: "w-2 h-2",
      color: "bg-red-500/50",
      top: "90%",
      left: "50%",
      delay: "0s",
      duration: "8s",
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color}`}
          style={{
            top: p.top,
            left: p.left,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
      {/* Decorative rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/10" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/10" />
    </div>
  );
}

export default function WaitlistPage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    email: "",
    phone: "",
  });
  const [modal, setModal] = useState<ModalState>({ type: null });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      newErrors.full_name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^\+?[0-9\s\-().]{7,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const submitToWaitlist = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.everydaysurprises.com/v1/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          full_name: formData.full_name.trim(),
        }),
      });

      if (res.ok) {
        setModal({ type: "success" });
        setFormData({ full_name: "", email: "", phone: "" });
      } else {
        let errMsg = "Something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (data?.message) errMsg = data.message;
          else if (data?.error) errMsg = data.error;
        } catch {
          // Use default message
        }
        setModal({ type: "error", message: errMsg });
      }
    } catch {
      setModal({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await submitToWaitlist();
  };

  const handleRetry = () => {
    setModal({ type: null });
    submitToWaitlist();
  };

  const stats = [
    { icon: Users, label: "Early sign-ups", value: "2,400+" },
    { icon: Gift, label: "Surprise categories", value: "50+" },
    { icon: Star, label: "Verified vendors", value: "100+" },
  ];

  return (
    <>
      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        .animate-modal-in { animation: modal-in 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* Modals */}
      {modal.type === "success" && (
        <SuccessModal onClose={() => setModal({ type: null })} />
      )}
      {modal.type === "error" && (
        <ErrorModal
          message={modal.message || ""}
          onClose={() => setModal({ type: null })}
          onRetry={handleRetry}
        />
      )}

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* ─── LEFT PANEL (brand / decorative) ─────────────────────────── */}
        <div className="relative hidden lg:flex lg:w-[52%] bg-[#072147] flex-col justify-between overflow-hidden">
          <FloatingParticles />

          <div className="relative z-10 flex flex-col h-full px-14 py-12">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/images/Logo.png"
                alt="Everyday Surprises"
                width={120}
                height={40}
                className="h-10 w-auto object-contain mb-10"
              />
            </Link>

            {/* Main Copy */}
            <div className="flex-1 flex flex-col justify-center gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 w-fit">
                <Sparkles size={14} className="text-yellow-400" />
                <span className="text-white/80 text-sm font-medium">
                  Coming very soon
                </span>
              </div>

              <div>
                <h1 className="text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                  Birthdays that feel{" "}
                  <span className="text-yellow-400">magical</span>
                  <br />
                  every time
                </h1>
                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                  Save up, invite friends to contribute, and let our verified
                  vendors craft & deliver the perfect surprise — all from one
                  app.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {stats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 bg-white/10 rounded-2xl px-4 py-4 border border-white/10"
                  >
                    <Icon size={18} className="text-yellow-400 mb-1" />
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-white/60 text-xs leading-tight">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Testimonial blurb */}
              <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-5 border border-white/10 max-w-md">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[#072147] font-bold">
                  A
                </div>
                <div>
                  <p className="text-white/80 text-sm leading-relaxed italic">
                    &ldquo;I can&apos;t wait for this to launch. Planning my
                    sister&apos;s birthday is always stressful — this sounds
                    like a dream!&rdquo;
                  </p>
                  <p className="text-white/50 text-xs mt-1.5">
                    — Adaeze, Lagos
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom hint */}
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Clock size={14} />
              <span>Join now before we hit capacity</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL (form) ──────────────────────────────────────── */}
        <div className="flex-1 bg-white flex flex-col min-h-screen">
          {/* Mobile logo bar */}
          <div className="lg:hidden flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <Link href="/">
              <Image
                src="/images/Logo.png"
                alt="Everyday Surprises"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
              <Sparkles size={11} /> Coming soon
            </span>
          </div>

          {/* Form area */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-12 max-w-lg mx-auto w-full">
            {/* Header */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-sm font-semibold mb-5">
                🎁 Get early access
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                Join the waitlist
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Be among the first to experience Everyday Surprises when we
                launch. No spam, ever.
              </p>
            </div>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Full name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="full_name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="e.g. Adaeze Johnson"
                  autoComplete="name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full border rounded-2xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.full_name
                      ? "border-red-400 focus:ring-red-200"
                      : "border-gray-200 focus:ring-[#072147]/20 focus:border-[#072147]"
                  }`}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded-2xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.email
                      ? "border-red-400 focus:ring-red-200"
                      : "border-gray-200 focus:ring-[#072147]/20 focus:border-[#072147]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-gray-700"
                >
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+234 801 234 5678"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-2xl px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                    errors.phone
                      ? "border-red-400 focus:ring-red-200"
                      : "border-gray-200 focus:ring-[#072147]/20 focus:border-[#072147]"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.phone}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full flex items-center justify-center gap-2.5 bg-[#FF304E] hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Joining…
                  </>
                ) : (
                  <>
                    Join the waitlist
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 leading-relaxed">
                By joining, you agree to our{" "}
                <Link
                  href="/terms-privacy"
                  className="underline hover:text-gray-600 transition-colors"
                >
                  Terms & Privacy Policy
                </Link>
                . We&apos;ll only use your info to notify you about our launch.
              </p>
            </form>

            {/* Mobile stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 lg:hidden">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 bg-[#072147]/5 rounded-2xl px-3 py-4 text-center"
                >
                  <Icon size={16} className="text-[#072147] mx-auto mb-1" />
                  <p className="text-lg font-bold text-[#072147]">{value}</p>
                  <p className="text-gray-500 text-xs leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Back to home */}
            <div className="mt-10 text-center">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-[#072147] transition-colors inline-flex items-center gap-1.5"
              >
                ← Back to home
              </Link>
            </div>
          </div>

          {/* Mobile footer strip */}
          <div className="lg:hidden px-6 pb-8 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Everyday Surprises. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
