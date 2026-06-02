"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1";

interface TxResult {
  amount: number;
  reference: string;
  celebrant_name?: string | null;
  status: string;
}

function fmt(n: number) {
  return n.toLocaleString("en-NG");
}

export default function ContributionSuccessPage() {
  const params = useParams<{ token: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = params.token;
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [tx, setTx] = useState<TxResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const verified = useRef(false);

  useEffect(() => {
    if (!reference || verified.current) return;
    verified.current = true;

    async function verify() {
      try {
        const res = await fetch(`${API}/events/contribute/${token}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error((data.message as string) || "Verification failed");
        const d = data.data as { amount?: number; reference?: string; status?: string; metadata?: { celebrant_name?: string }; celebrant_name?: string };
        setTx({
          amount: d.amount ?? 0,
          reference: d.reference ?? reference!,
          celebrant_name: d.metadata?.celebrant_name ?? d.celebrant_name ?? null,
          status: d.status ?? "success",
        });
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Could not verify payment.");
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [reference, token]);

  if (!reference) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-poppins flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Invalid payment link.</p>
          <Link href="/" className="inline-block mt-4 px-6 py-2.5 bg-secondary-red text-white rounded-full text-sm font-semibold">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-poppins flex flex-col">
      {/* Header */}
      <header className="w-full bg-white py-4 px-5 sm:px-8 md:px-12 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
        <Link href="/">
          <Image src="/images/Logo.png" alt="Everyday Surprises" width={130} height={40} className="h-9 w-auto object-contain" />
        </Link>
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-[#E8F7FA] text-primary hover:bg-[#D4EBEF] px-4 py-2 rounded-full font-semibold text-sm transition-colors"
        >
          <LogOut size={15} className="rotate-180" /> Exit
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md flex flex-col items-center text-center">

          {loading ? (
            <>
              <div className="w-10 h-10 border-4 border-secondary-yellow border-t-transparent rounded-full animate-spin mb-6" />
              <p className="text-primary/60 text-sm font-medium">Verifying payment…</p>
            </>
          ) : error ? (
            <>
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
                <span className="text-3xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-primary mb-2">Verification failed</h1>
              <p className="text-gray-500 text-sm mb-8">{error}</p>
              <button
                onClick={() => router.push(`/contribute/${token}`)}
                className="w-full max-w-xs bg-[#E8F7FA] text-primary font-semibold py-3.5 rounded-full transition-colors"
              >
                Try again
              </button>
            </>
          ) : (
            <>
              {/* Decorative success icon */}
              <div className="relative mb-8">
                <div className="absolute -top-5 -left-5 w-2.5 h-2.5 rounded-full bg-secondary-blue" />
                <div className="absolute top-0 -right-3 w-3 h-3 rounded-full bg-secondary-blue opacity-50" />
                <div className="absolute -left-9 top-1/2 w-2 h-2 rounded-full bg-secondary-yellow" />
                <div className="absolute -bottom-2 -left-3 text-secondary-yellow text-xl leading-none">✨</div>
                <div className="absolute -top-7 right-3 text-gray-300 text-base leading-none">✕</div>
                <div className="absolute bottom-3 -right-12 text-secondary-red text-base leading-none">●</div>
                <div className="absolute top-3 -left-10 text-secondary-red text-xl leading-none">✦</div>
                <div className="w-24 h-24 rounded-full bg-[#FECC4F] shadow-md flex items-center justify-center relative z-10 border-4 border-yellow-100">
                  <Check size={44} className="text-white" strokeWidth={3} />
                </div>
                <div className="absolute -bottom-1.5 left-2 w-4 h-4 rounded-full bg-primary z-20" />
              </div>

              <h1 className="text-3xl font-bold text-primary mb-3">Thank you!</h1>
              <p className="text-primary/70 font-medium text-sm mb-10 leading-relaxed max-w-[300px]">
                {tx?.celebrant_name
                  ? `Your contribution to ${tx.celebrant_name} has been received. A payment receipt has been sent to your email.`
                  : "Your contribution has been received. A payment receipt has been sent to your email."}
              </p>

              {/* Receipt Card */}
              <div className="w-full bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Amount</span>
                    <span className="font-bold text-primary text-base">₦{fmt(tx?.amount ?? 0)}</span>
                  </div>
                  <div className="w-full h-px bg-gray-100" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">Reference ID</span>
                    <span className="font-bold text-gray-500 text-xs tracking-wide">#{tx?.reference}</span>
                  </div>
                  <div className="pt-3 space-y-3">
                    <button
                      onClick={() => window.print()}
                      className="w-full bg-secondary-red hover:bg-red-600 text-white font-semibold py-3.5 rounded-full transition-colors shadow-sm"
                    >
                      Download receipt
                    </button>
                    <button
                      onClick={() => router.push(`/contribute/${token}`)}
                      className="w-full bg-[#E8F7FA] hover:bg-[#D4EBEF] text-primary font-semibold py-3.5 rounded-full transition-colors"
                    >
                      Contribute again
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
