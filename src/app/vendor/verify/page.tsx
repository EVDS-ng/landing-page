"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PencilLine } from "lucide-react";


function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@example.com";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1); // Only allow 1 char
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Auto-focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(30);
    // Add logic to resend OTP
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      // Dummy check for success/error
      if (otpValue === "0000") {
        router.push("/vendor/error"); // Example of error routing
      } else {
        router.push("/vendor/success");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <h1 className="text-3xl font-bold mb-4">
        Verify <span className="text-secondary-red">Your Account</span>
      </h1>
      
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        An OTP has been sent to your email at <span className="text-secondary-blue font-semibold">{email}</span> for verification purpose.
      </p>

      <button 
        onClick={() => router.push("/vendor/register")}
        className="flex items-center gap-1.5 text-secondary-red text-sm font-semibold hover:text-red-600 transition-colors mb-8"
      >
        Change email <PencilLine size={16} />
      </button>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-primary block">
            Enter OTP
          </label>
          <div className="flex gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                className="w-16 h-16 text-center text-2xl font-bold rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue transition-all bg-transparent"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Didn't receive code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-semibold ${timeLeft > 0 ? 'text-secondary-blue' : 'text-secondary-red hover:underline'}`}
          >
            Resend {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, "0")}` : ""}
          </button>
        </div>

        <button
          type="submit"
          disabled={otp.join("").length !== 4}
          className="w-full bg-secondary-red hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-sm mt-4"
        >
          Verify <span className="text-lg leading-none">→</span>
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
