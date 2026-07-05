"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Calendar, Clock, Shield, Clock4, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1";

interface EventInfo {
  public_id: string;
  celebrant_name: string;
  event_date: string | null;
  cover_photo: string | null;
  funded_amount: number;
  contributor_count: number;
  target_amount: number | null;
  contribution_url: string;
}

interface Contribution {
  name: string;
  amount: number;
  message: string | null;
  createdAt: string | null;
}

const QUICK_AMOUNTS = [5000, 7000, 10000, 15000];

function fmt(n: number) {
  return n.toLocaleString("en-NG");
}

function daysTo(dateStr: string | null) {
  if (!dateStr) return null;
  const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  return diff > 0 ? diff : null;
}

function fmtDate(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" });
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short" });
}

export default function ContributePage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = params.token;

  const [event, setEvent] = useState<EventInfo | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(5000);
  const [amountStr, setAmountStr] = useState("5,000");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [evRes, cxRes] = await Promise.all([
          fetch(`${API}/events/contribute/${token}`),
          fetch(`${API}/events/contribute/${token}/contributions`),
        ]);
        if (!evRes.ok) {
          const j = await evRes.json().catch(() => ({}));
          throw new Error(j.message || "Event not found");
        }
        const evData = await evRes.json();
        setEvent(evData.data);
        if (cxRes.ok) {
          const cxData = await cxRes.json();
          setContributions(cxData.data || []);
        }
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Could not load this event.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  function handleAmountInput(val: string) {
    const raw = val.replace(/,/g, "").replace(/[^0-9]/g, "");
    const num = parseInt(raw, 10) || 0;
    setAmount(num);
    setAmountStr(num > 0 ? fmt(num) : "");
  }

  function selectQuick(n: number) {
    setAmount(n);
    setAmountStr(fmt(n));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!isAnonymous && !name.trim()) return setFormError("Name is required");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFormError("A valid email is required");
    if (!amount || amount < 100) return setFormError("Minimum contribution is ₦100");

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/events/contribute/${token}/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          contributor_name: isAnonymous ? "Anonymous" : name.trim(),
          contributor_email: email.trim(),
          ...(message.trim() && { message: message.trim() }),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment initialization failed");
      // Redirect to Paystack checkout
      window.location.href = data.data?.authorization_url || data.data?.data?.authorization_url;
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const progress = event?.target_amount && event.target_amount > 0
    ? Math.min(100, Math.round((event.funded_amount / event.target_amount) * 100))
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-poppins flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-secondary-red border-t-transparent rounded-full animate-spin" />
          <p className="text-primary/60 text-sm font-medium">Loading event…</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] font-poppins flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">Link unavailable</h2>
          <p className="text-gray-500 text-sm">{error || "This contribution link is no longer active."}</p>
          <Link href="/" className="inline-block mt-6 px-6 py-2.5 bg-secondary-red text-white rounded-full text-sm font-semibold">
            Go home
          </Link>
        </div>
      </div>
    );
  }

  const days = daysTo(event.event_date);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-poppins pb-20">
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 mt-6 md:mt-10">
        {/* Hero Banner */}
        <div className="w-full bg-[#FECC4F] rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-sm">
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-secondary-red rounded-[100px] rotate-45 opacity-90 hidden sm:block" />
          <div className="absolute right-28 -bottom-20 w-40 h-40 bg-secondary-red rounded-[80px] -rotate-12 opacity-90 hidden sm:block" />
          <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1.5">Welcome to Everyday Surprises</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-red mb-4">Contributors Portal</h2>
            <p className="text-primary/80 font-medium text-sm">Find the Celebrant's details and how to contribute below:</p>
          </div>
        </div>

        {/* Celebrant Profile */}
        <div className="flex flex-col items-center mt-10 mb-8 text-center px-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-gray-100 flex items-center justify-center">
            {event.cover_photo ? (
              <img src={event.cover_photo} alt={event.celebrant_name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">🎉</span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">{event.celebrant_name}</h2>
          <p className="text-gray-500 text-sm mb-5">Help us make {event.celebrant_name.split("'")[0]}&apos;s surprise a reality!</p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-gray-500">
            {event.event_date && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} /> {fmtDate(event.event_date)}
              </div>
            )}
            {event.event_date && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <Clock size={14} /> {fmtTime(event.event_date)}
                </div>
              </>
            )}
            {days !== null && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 hidden sm:block" />
                <div className="flex items-center gap-1.5 bg-[#E8F7FA] text-secondary-blue px-3 py-1.5 rounded-full">
                  <Clock4 size={13} /> {days} day{days !== 1 ? "s" : ""} to go
                </div>
              </>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-5">
          {/* Progress + Form Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">

            {/* Progress */}
            <div className="p-5 sm:p-7 border-b border-gray-100">
              {event.target_amount ? (
                <>
                  <div className="flex justify-between items-end mb-2">
                    <div className="font-bold text-base sm:text-lg">
                      <span className="text-primary">₦{fmt(event.funded_amount)}</span>
                      <span className="text-gray-400 font-medium text-sm ml-1">/ ₦{fmt(event.target_amount)}</span>
                    </div>
                    <span className="text-secondary-yellow font-bold text-sm">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-yellow-100 rounded-full mb-5 overflow-hidden">
                    <div className="h-full bg-secondary-yellow rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </>
              ) : null}

              {event.contributor_count > 0 && (
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-7 h-7 bg-red-50 rounded-full">
                    <Users size={14} className="text-secondary-blue" />
                  </div>
                  <p className="text-xs text-secondary-blue font-semibold">
                    {event.contributor_count} {event.contributor_count === 1 ? "person has" : "people have"} already contributed
                  </p>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="p-5 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary block">Name</label>
                    <input
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      disabled={isAnonymous}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue bg-[#FAFBFD] placeholder:text-gray-400 text-sm disabled:opacity-50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-primary block">Email</label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue bg-[#FAFBFD] placeholder:text-gray-400 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-primary block">Amount</label>
                  <div className="flex w-full">
                    <div className="flex items-center justify-center border border-gray-200 border-r-0 rounded-l-xl px-4 bg-white text-primary font-bold text-base select-none">
                      ₦
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={amountStr}
                      onChange={e => handleAmountInput(e.target.value)}
                      className="w-full px-4 py-3 rounded-r-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue bg-[#FAFBFD] text-sm font-medium transition-all"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {QUICK_AMOUNTS.map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => selectQuick(n)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                          amount === n ? "bg-primary text-white" : "bg-[#F1F5F9] text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        ₦{fmt(n)}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(v => !v)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isAnonymous ? "bg-secondary-red border-secondary-red" : "border-gray-300 bg-white"
                    }`}
                  >
                    {isAnonymous && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                  </button>
                  <span className="text-sm font-medium text-secondary-blue select-none">Make this contribution anonymous</span>
                </label>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary block">
                    Birthday message <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    placeholder="Write special birthday wishes…"
                    rows={3}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue bg-[#FAFBFD] placeholder:text-gray-400 text-sm resize-none transition-all"
                  />
                </div>

                {formError && (
                  <p className="text-sm text-secondary-red font-medium">{formError}</p>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-secondary-red hover:bg-red-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-full transition-colors shadow-sm"
                  >
                    {submitting ? "Processing…" : "Contribute"}
                  </button>
                  <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    <Shield size={13} /> Secure Payment
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Recent Contributions */}
          {contributions.length > 0 && (
            <div className="bg-[#FAFBFD] rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-5 sm:p-7">
              <h3 className="font-bold text-primary text-base sm:text-lg mb-5">Recent contributions</h3>
              <div className="space-y-5">
                {contributions.map((c, i) => (
                  <div key={i}>
                    {i > 0 && <div className="h-px bg-gray-100 mb-5" />}
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        i % 3 === 0 ? "bg-red-50 text-secondary-red" : i % 3 === 1 ? "bg-[#E8F7FA] text-secondary-blue" : "bg-yellow-50 text-secondary-yellow"
                      }`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm text-primary leading-snug">
                            <span className="font-bold">{c.name}</span> contributed{" "}
                            <span className="font-bold text-secondary-yellow">₦{fmt(c.amount)}</span>
                          </p>
                          <span className="text-[10px] text-gray-400 font-medium shrink-0 pt-0.5">{timeAgo(c.createdAt)}</span>
                        </div>
                        {c.message && <p className="text-xs text-gray-500 mt-1">{c.message}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
