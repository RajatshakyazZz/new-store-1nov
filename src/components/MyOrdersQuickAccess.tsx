'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, FolderDown, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';

export default function MyOrdersQuickAccess() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;
    router.push(`/my-order?email=${encodeURIComponent(cleanEmail)}`);
  };

  return (
    <section className="py-4 sm:py-6 [contain:layout_style]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-[24px] sm:rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-[#1f0d05] border border-orange-500/30 p-5 sm:p-7 text-white shadow-xl overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Info */}
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[11px] font-black uppercase tracking-wider">
                <FolderDown className="w-3.5 h-3.5 text-orange-400" />
                <span>Instant Download &amp; Order Access</span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight leading-snug">
                Already Purchased? Access Your Orders Anytime
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed">
                Apna checkout email niche dalein aur bina kisi password ya login ke turant Google Drive download links access karein.
              </p>
            </div>

            {/* Right: Quick Email Form & Button */}
            <div className="w-full lg:w-auto lg:min-w-[420px] space-y-2.5">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-1 min-w-0">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter checkout email (e.g. name@gmail.com)"
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-orange-500/50 focus:border-orange-400 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_0_24px_rgba(255,107,0,0.6)] active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  <span>Get Instant Access</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-orange-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>100% Instant Cloud Delivery</span>
                </div>

                <Link
                  href="/my-order"
                  className="text-orange-400 hover:text-orange-300 font-bold hover:underline flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Open My Orders Portal →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
