/**
 * @file app/page.tsx
 * @description Premium product landing page for PitchPerfect.
 *              Contains interactive video demo player, favicon logo, and clerk auth check.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Sparkles, Sliders, TrendingUp, CheckCircle, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function RootPage() {
  const { userId } = useAuth();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const dashboardLink = userId ? "/dashboard" : "/dashboard"; // clerk will redirect to login if not authenticated

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white font-sans antialiased">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.png"
            alt="PitchPerfect Logo"
            className="w-8 h-8 rounded-lg object-contain bg-slate-100 p-0.5 border border-slate-200/60"
          />
          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            PitchPerfect
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-teal-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-teal-600 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-teal-600 transition-colors">FAQ</a>
        </nav>

        <div>
          <Link
            href={dashboardLink}
            className="inline-flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {userId ? "Vào Dashboard" : "Bắt đầu ngay"}
          </Link>
        </div>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6 font-serif">
          Win More Clients with AI-Driven Contextual Pitches
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
          Elevate your sales strategy. Our intelligence engine analyzes your prospect's unique profile 
          to generate compelling, targeted pitches in seconds. Stop guessing, start closing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
          <Link
            href={dashboardLink}
            className="inline-flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer gap-2"
          >
            <span>{userId ? "Vào Dashboard" : "Bắt đầu ngay"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsVideoOpen(true)}
            className="inline-flex items-center justify-center border border-teal-800 text-teal-800 hover:bg-teal-50 font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer gap-2"
          >
            <Play className="w-4 h-4 fill-current shrink-0" />
            <span>View Demo</span>
          </button>
        </div>

        {/* ── MOCKUP ──────────────────────────────────────────────────────── */}
        <div 
          onClick={() => setIsVideoOpen(true)}
          className="w-full max-w-5xl rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white p-2 cursor-pointer group relative"
        >
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 z-10 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-teal-800/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/dashboard_mockup.png"
            alt="Synthesis AI Dashboard Mockup"
            className="w-full h-auto rounded-xl object-cover group-hover:scale-[1.005] transition-all duration-500"
          />
        </div>
      </section>

      {/* ── FEATURES SECTION ────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-slate-50 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight font-serif mb-4">
            Intelligent Features for Modern Teams
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
            Everything you need to craft the perfect message, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white border-t-4 border-teal-800 hover:border-teal-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-6 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Context-Aware AI
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our AI understands your audience's unique needs by analyzing industry trends, company data, and recent news to build a foundation of relevance.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-6 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Tone of Voice Selector
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Match your pitch to your client's personality. Whether they prefer formal, casual, or highly technical communication, adjust instantly with a slider.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-6 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Premium Analytics
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Track engagement and optimize your pitch performance. See exactly which sections prospects read longest and A/B test variations effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 bg-slate-50 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tight font-serif mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
            Scale your outreach without breaking the bank.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Pricing 1 */}
          <div className="bg-white border border-slate-150 rounded-xl p-8 shadow-sm flex flex-col justify-between text-left">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Starter</h3>
              <div className="text-4xl font-extrabold text-slate-950 mb-3">Free</div>
              <p className="text-xs text-slate-400 mb-8">Perfect for individuals starting out.</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>10 Pitches/month</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Basic Templates</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Advanced Tone Selection</span>
                </li>
              </ul>
            </div>
            <Link
              href={dashboardLink}
              className="w-full text-center border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-full transition-all text-sm cursor-pointer"
            >
              Get Started
            </Link>
          </div>

          {/* Pricing 2 (Pro) */}
          <div className="bg-white border-2 border-teal-800 rounded-xl p-8 shadow-md flex flex-col justify-between text-left relative">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-teal-800 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Pro</h3>
              <div className="flex items-baseline mb-3">
                <span className="text-4xl font-extrabold text-slate-950">$29</span>
                <span className="text-slate-400 text-sm">/mo</span>
              </div>
              <p className="text-xs text-slate-400 mb-8">For professionals closing deals daily.</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Unlimited Pitches</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Context-Aware AI Engine</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Advanced Tone Selection</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Basic Analytics</span>
                </li>
              </ul>
            </div>
            <Link
              href={dashboardLink}
              className="w-full text-center bg-teal-800 hover:bg-teal-900 text-white font-semibold py-2.5 rounded-full transition-all text-sm cursor-pointer"
            >
              Bắt đầu ngay
            </Link>
          </div>

          {/* Pricing 3 */}
          <div className="bg-white border border-slate-150 rounded-xl p-8 shadow-sm flex flex-col justify-between text-left">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Enterprise</h3>
              <div className="text-4xl font-extrabold text-slate-950 mb-3">Custom</div>
              <p className="text-xs text-slate-400 mb-8">For large sales teams and agencies.</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Custom CRM Integrations</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                  <span>Dedicated Success Manager</span>
                </li>
              </ul>
            </div>
            <Link
              href="mailto:contact@synthesis.ai"
              className="w-full text-center border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-full transition-all text-sm cursor-pointer"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.png"
                alt="PitchPerfect Logo"
                className="w-6 h-6 rounded object-contain bg-slate-100 p-0.5 border border-slate-200/60"
              />
              <span className="font-extrabold text-base text-slate-800">PitchPerfect</span>
            </div>
            <p className="text-xs text-slate-400">© 2026 PitchPerfect by Synthesis AI. All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-xs text-slate-500 font-semibold">
            <a href="#" className="hover:text-teal-600">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600">Terms of Service</a>
            <a href="#" className="hover:text-teal-600">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* ── VIDEO MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 max-w-4xl w-full aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full border border-white/10 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
              
              <video
                src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f41a12a1f07f4d2f83f5e5b38a7c2be6d4e5f0d&profile_id=139&oauth2_token_id=57447761"
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
