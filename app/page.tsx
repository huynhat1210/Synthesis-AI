/**
 * @file app/page.tsx
 * @description Premium product landing page for Synthesis AI.
 *              Contains full-screen snap-scrolling sections, custom brand favicon,
 *              modern Framer Motion scroll-triggered animations, and an embedded
 *              self-running loop UI Dashboard Simulator matching user screenshots.
 *              Uses font-geist (Be Vietnam Pro) for all headings to fix Vietnamese tone mark bugs.
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Sparkles, Sliders, TrendingUp, CheckCircle, Play, X, Zap, Check, RotateCcw, HelpCircle, Bell, Plus, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translations } from "@/lib/translations";

export default function RootPage() {
  const { userId } = useAuth();
  const dashboardLink = userId ? "/dashboard" : "/dashboard";

  const [lang, setLang] = useState<"vi" | "en">("vi");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("pitch_lang") as "vi" | "en";
      if (savedLang === "en" || savedLang === "vi") {
        setLang(savedLang);
      }
    }
  }, []);

  const handleToggleLang = () => {
    const nextLang = lang === "vi" ? "en" : "vi";
    setLang(nextLang);
    localStorage.setItem("pitch_lang", nextLang);
  };

  const t = translations[lang];

  // ── DEMO SIMULATOR STATE (LOOPING CONTINUOUSLY) ─────────────────────
  const [demoStep, setDemoStep] = useState(0); // 0: Idle, 1: Typing, 2: Skills, 3: Slider, 4: Generating, 5: Done
  const [typedText, setTypedText] = useState("");
  const [sliderVal, setSliderVal] = useState(50);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "LLM INTEGRATION", "TAILWIND CSS"]);
  const [scoreVal, setScoreVal] = useState(0);

  const fullText = "Khách hàng là một công ty startup công nghệ tài chính (FinTech) đang cần tìm lập trình viên để xây dựng bảng điều khiển quản lý chi tiêu. Họ rất quan tâm đến bảo mật và hiệu suất.";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (demoStep === 0) {
      timer = setTimeout(() => setDemoStep(1), 1000);
    } 
    else if (demoStep === 1) {
      if (typedText.length < fullText.length) {
        timer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 15);
      } else {
        timer = setTimeout(() => setDemoStep(2), 1200);
      }
    } 
    else if (demoStep === 2) {
      timer = setTimeout(() => {
        setSelectedSkills(["NEXT.JS", "TYPESCRIPT", "POSTGRESQL"]);
        timer = setTimeout(() => {
          setSelectedSkills(["NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "LLM INTEGRATION", "TAILWIND CSS"]);
          timer = setTimeout(() => setDemoStep(3), 800);
        }, 600);
      }, 500);
    } 
    else if (demoStep === 3) {
      let currentVal = 50;
      const slideInterval = setInterval(() => {
        if (currentVal < 80) {
          currentVal += 2;
          setSliderVal(currentVal);
        } else {
          clearInterval(slideInterval);
          timer = setTimeout(() => setDemoStep(4), 800);
        }
      }, 35);
    } 
    else if (demoStep === 4) {
      timer = setTimeout(() => {
        setDemoStep(5);
      }, 2000);
    }
    else if (demoStep === 5) {
      if (scoreVal < 94) {
        timer = setTimeout(() => {
          setScoreVal((prev) => prev + 2);
        }, 15);
      } else {
        // Endless loop: Reset back to step 0 after 6 seconds of showing the finished pitch
        timer = setTimeout(() => {
          handleRestartDemo();
        }, 6000);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [demoStep, typedText, scoreVal]);

  const handleRestartDemo = () => {
    setDemoStep(0);
    setTypedText("");
    setSliderVal(50);
    setSelectedSkills(["NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "LLM INTEGRATION", "TAILWIND CSS"]);
    setScoreVal(0);
  };

  const handleScrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white font-sans antialiased md:snap-y md:snap-mandatory overflow-y-auto h-screen scroll-smooth">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.png"
            alt="Synthesis AI Logo"
            className="w-8 h-8 rounded-lg object-contain bg-slate-100 p-0.5 border border-slate-200/60"
          />
          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            Synthesis AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#features" className="hover:text-teal-600 transition-colors">
            {lang === "vi" ? "Tính năng" : "Features"}
          </a>
          <a href="#pricing" className="hover:text-teal-600 transition-colors">
            {lang === "vi" ? "Bảng giá" : "Pricing"}
          </a>
          <a href="#faq" className="hover:text-teal-600 transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* i18n Language Toggle Button */}
          <button
            onClick={handleToggleLang}
            className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 rounded-full text-xs font-bold text-slate-700 bg-white shadow-sm flex items-center gap-1 cursor-pointer transition-all hover:bg-slate-50"
            title={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
          >
            <span className="text-sm">🌐</span>
            <span>{lang === "vi" ? "EN" : "VI"}</span>
          </button>
          
          <Link
            href={dashboardLink}
            className="inline-flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {userId ? t.vàoDashboard : t.bắtĐầuNgay}
          </Link>
        </div>
      </header>

      {/* ── SECTION 1: HERO ────────────────────────────────────────────── */}
      <section className="w-full h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 relative overflow-hidden md:snap-start shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 font-geist">
            {lang === "vi" ? "Chinh Phục Khách Hàng Với Bài Pitch Cá Nhân Hóa Bằng AI" : "Win More Clients with AI-Driven Contextual Pitches"}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
            {lang === "vi"
              ? "Nâng tầm chiến lược kinh doanh. Động cơ trí tuệ nhân tạo phân tích hồ sơ năng lực của bạn để viết những bản đề xuất thuyết phục, nhắm đúng mục tiêu chỉ trong vài giây."
              : "Elevate your sales strategy. Our intelligence engine analyzes your prospect's unique profile to generate compelling, targeted pitches in seconds. Stop guessing, start closing."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={dashboardLink}
              className="inline-flex items-center justify-center bg-teal-800 hover:bg-teal-900 text-white font-semibold px-8 py-3.5 rounded-full transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer gap-2"
            >
              <span>{userId ? t.vàoDashboard : t.bắtĐầuNgay}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleScrollToDemo}
              className="inline-flex items-center justify-center border border-teal-800 text-teal-800 hover:bg-teal-55 font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer gap-2"
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span>{t.viewDemo}</span>
            </button>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 text-xs font-semibold animate-bounce">
          <span>{lang === "vi" ? "Cuộn xuống xem tiếp" : "Scroll down to continue"}</span>
          <div className="w-1.5 h-3 bg-slate-400 rounded-full"></div>
        </div>
      </section>

      {/* ── SECTION 2: PRODUCT MOCKUP & SIMULATOR ───────────────────────── */}
      <section id="demo" className="w-full h-screen flex flex-col justify-center items-center px-6 md:px-12 bg-white relative overflow-hidden md:snap-start shrink-0 border-t border-slate-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl w-full flex flex-col items-center"
        >
          <div className="text-center mb-4">
            <span className="text-teal-800 text-xs font-extrabold tracking-widest uppercase mb-0.5 block">Live Demo</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight font-geist">
              Trình Mô Phỏng Dashboard Đột Phá
            </h2>
          </div>

          {/* Interactive Simulation Dashboard (Embedded Right on Page) */}
          <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-50 flex flex-col h-[70vh] relative text-slate-800 text-left">
            
            {/* Simulation Header Bar */}
            <div className="bg-white border-b border-slate-200 px-5 py-2.5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/favicon.png"
                  alt="Synthesis AI Logo"
                  className="w-5 h-5 rounded object-contain bg-slate-50 p-0.5 border border-slate-200"
                />
                <span className="font-extrabold text-[10px] text-slate-600 uppercase tracking-wider">
                  Interactive Live Demo Simulator (Looping)
                </span>
              </div>
              <button
                onClick={handleRestartDemo}
                className="flex items-center gap-1 text-[10px] text-teal-800 hover:underline font-bold uppercase transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Replay
              </button>
            </div>

            {/* Inner Dashboard Layout */}
            <div className="flex-1 overflow-hidden flex bg-slate-100">
              
              {/* ── SideNavBar ── */}
              <nav className="hidden md:flex w-[210px] bg-white border-r border-slate-200 flex-col py-4 shrink-0 text-left">
                <div className="px-4 mb-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/favicon.png" alt="Logo" className="w-6 h-6 rounded object-contain" />
                    <h2 className="text-sm font-bold font-geist text-slate-900 tracking-tight">
                      Synthesis AI
                    </h2>
                  </div>
                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                    Context-Aware Generator
                  </p>
                </div>

                {/* Profile switcher */}
                <div className="px-4 mb-4">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-teal-800">
                      Active Profile
                    </span>
                    <span className="text-[8px] text-teal-800 font-bold uppercase cursor-pointer hover:underline">+ NEW</span>
                  </div>
                  <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-[10px] font-bold text-slate-700 flex justify-between items-center cursor-pointer">
                    <span>👤 Primary Profile</span>
                    <span className="text-[8px]">▼</span>
                  </div>
                </div>

                <div className="px-4 mb-3">
                  <button className="w-full bg-slate-900 text-white py-1.5 rounded-md text-[10px] font-bold shadow-sm">
                    New Pitch
                  </button>
                </div>

                <ul className="flex-1 px-2 space-y-0.5">
                  <li>
                    <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-bold text-[10px] bg-slate-100 text-teal-900 border-r-4 border-teal-800">
                      🏠 Dashboard
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-semibold text-[10px] text-slate-500">
                      👤 Master Profile
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-semibold text-[10px] text-slate-500">
                      💼 Projects (2)
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-semibold text-[10px] text-slate-500 relative">
                      ✨ Generated Pitches
                      <span className="absolute right-2 bg-teal-800 text-white text-[8px] font-bold px-1 py-0.1 rounded-full">4</span>
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-semibold text-[10px] text-slate-500">
                      📈 Analytics
                    </div>
                  </li>
                </ul>

                <div className="mt-auto px-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-teal-800 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0">
                    N
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-800 truncate">Nhất Huy</p>
                  </div>
                </div>
              </nav>

              {/* ── Dashboard Workspace ── */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
                {/* TopNavBar */}
                <header className="h-10 w-full flex justify-between items-center px-4 border-b border-slate-200 bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[10px] text-slate-800 tracking-tight">Synthesis AI</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                      Gemini AI Connected (Online)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-slate-400" />
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                  </div>
                </header>

                {/* Workspace Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Step Indicator */}
                  <div className="bg-teal-800 text-white p-2.5 rounded-lg text-[10px] font-bold flex justify-between items-center shadow-sm shrink-0">
                    <span>
                      {demoStep === 0 && "🚀 Chuẩn bị bắt đầu mô phỏng tạo Pitch..."}
                      {demoStep === 1 && "✍️ Bước 1: Người dùng nhập mô tả đối tác ('công ty fintech, cần lập trình viên...')."}
                      {demoStep === 2 && "🏷️ Bước 2: Tự động đánh dấu kỹ năng liên quan trong bộ kỹ năng Master Profile."}
                      {demoStep === 3 && "🎚️ Bước 3: Điều chỉnh thanh trượt tông giọng lên mức Startup (80/100)."}
                      {demoStep === 4 && "⚡ Bước 4: Nhấn nút để khởi tạo Pitch..."}
                      {demoStep === 5 && scoreVal < 94 && "⚙️ Đang chạy đánh giá mức độ tương thích của hồ sơ..."}
                      {demoStep === 5 && scoreVal >= 94 && "✨ Hoàn thành! Bản Pitch tối ưu đã sẵn sàng xuất bản!"}
                    </span>
                    <span className="text-[8px] uppercase bg-white/20 px-1.5 py-0.2 rounded">
                      Step {demoStep}/5
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Left Panel: Profile */}
                    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 text-left">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-black text-slate-800 uppercase">BUILD YOUR MASTER PROFILE</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase mb-0.5">Full Name</label>
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 font-bold text-slate-700">Nhất Huy</div>
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase mb-0.5">Job Title</label>
                          <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 font-bold text-slate-700 truncate">Full-Stack Developer & AI Specialist</div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-500 uppercase mb-0.5">Professional Bio</label>
                        <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 text-[10px] text-slate-500 leading-relaxed max-h-16 overflow-y-auto">
                          Tôi chuyên xây dựng các ứng dụng web hiệu suất cao và tích hợp trí tuệ nhân tạo để tự động hóa quy trình làm việc...
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-500 uppercase mb-0.5">Key Skills</label>
                        <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200 rounded-md p-1.5">
                          {["Next.js", "TypeScript", "PostgreSQL", "LLM Integration", "Tailwind CSS"].map((s) => (
                            <span key={s} className="bg-white border border-slate-200 px-1.5 py-0.2 rounded-full text-[8px] font-bold text-slate-600 flex items-center gap-0.5 shadow-sm">
                              {s} <span className="text-slate-300 text-[8px]">x</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-500 uppercase mb-0.5">Featured Projects</label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="border border-slate-200 rounded-md p-2 bg-slate-50 flex items-start gap-1.5">
                            <div className="w-6 h-6 rounded bg-teal-900 flex items-center justify-center text-[8px] text-white shrink-0 font-bold">AI</div>
                            <div className="min-w-0">
                              <h4 className="text-[9px] font-bold text-slate-700 truncate">AI Support Hub</h4>
                              <p className="text-[8px] text-slate-400 truncate">Serverless integration...</p>
                            </div>
                          </div>
                          <div className="border border-slate-200 rounded-md p-2 bg-slate-50 flex items-start gap-1.5">
                            <div className="w-6 h-6 rounded bg-teal-950 flex items-center justify-center text-[8px] text-white shrink-0 font-bold">PW</div>
                            <div className="min-w-0">
                              <h4 className="text-[9px] font-bold text-slate-700 truncate">PerfWatch Platform</h4>
                              <p className="text-[8px] text-slate-400 truncate">API performance...</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Generate */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 text-left">
                      <div className="border-b border-slate-100 pb-2">
                        <h3 className="text-xs font-black text-slate-800 uppercase flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-teal-800" /> GENERATE PITCH
                        </h3>
                      </div>

                      {/* Audience Input */}
                      <div>
                        <div className="flex justify-between items-center mb-0.5">
                          <label className="block text-[8px] font-bold text-slate-500 uppercase">Target Audience Description</label>
                          <span className="text-[8px] text-teal-800 font-extrabold uppercase hover:underline cursor-pointer">UPLOAD JD PDF</span>
                        </div>
                        <div className="w-full bg-slate-50 border border-slate-200 rounded-md p-2.5 text-[10px] min-h-[75px] text-slate-700 leading-relaxed relative">
                          {typedText}
                          {demoStep === 1 && <span className="inline-block w-1 h-3 bg-slate-500 ml-0.5 animate-pulse"></span>}
                          {typedText === "" && <span className="text-slate-400">Describe who you are pitching to...</span>}
                        </div>
                      </div>

                      {/* Smart Selector skills */}
                      <div>
                        <label className="block text-[8px] font-bold text-slate-500 uppercase mb-1">Customize Included Skills (Smart Selector)</label>
                        <div className="flex flex-wrap gap-1">
                          {["NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "LLM INTEGRATION", "TAILWIND CSS"].map((s) => {
                            const isSelected = selectedSkills.includes(s);
                            return (
                              <span
                                key={s}
                                className={`px-1.5 py-0.2 rounded text-[8px] font-black tracking-wider transition-all duration-300 ${
                                  isSelected
                                    ? "bg-teal-800 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-300"
                                }`}
                              >
                                {s}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tone Slider */}
                      <div>
                        <div className="flex justify-between text-[8px] font-bold text-slate-500 uppercase mb-0.5">
                          <span>Tone of Voice (Slider)</span>
                          <span className="text-teal-800 font-bold bg-teal-50 px-1 py-0.1 rounded">
                            {sliderVal < 35 ? `Formal (${sliderVal}/100)` : sliderVal > 70 ? `Startup (${sliderVal}/100)` : `Balanced (${sliderVal}/100)`}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderVal}
                          readOnly
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none accent-teal-800 cursor-pointer"
                        />
                      </div>

                      {/* Generate button */}
                      <button
                        className={`w-full py-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex justify-center items-center gap-1.5 transition-all duration-300 ${
                          demoStep === 4
                            ? "bg-teal-900/90 text-white scale-[0.98] shadow-inner"
                            : demoStep > 4
                            ? "bg-emerald-600 text-white cursor-default"
                            : "bg-teal-800 text-white shadow-sm hover:bg-teal-900"
                        }`}
                      >
                        {demoStep === 4 ? (
                          <>
                            <div className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                            <span>Generating Pitch Suite...</span>
                          </>
                        ) : demoStep > 4 ? (
                          <>
                            <Check className="w-3 h-3 text-white" />
                            <span>Pitch Generated!</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3 h-3 text-white fill-current animate-pulse" />
                            <span>Generate Dynamic Pitch</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Live Preview section */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 text-left relative min-h-[180px]">
                    {demoStep < 5 && (
                      <div className="absolute inset-0 bg-white/95 z-10 flex flex-col justify-center items-center p-4 text-center">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-2 animate-pulse">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-800">No Live Pitch Preview Loaded</h4>
                        <p className="text-[9px] text-slate-400 max-w-sm mt-0.5 leading-relaxed">
                          Describe your target audience in the input fields and click GENERATE DYNAMIC PITCH above to view your personalized scenarios!
                        </p>
                      </div>
                    )}

                    <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-black text-slate-800 uppercase">LIVE PITCH PREVIEW</h3>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100 shrink-0">
                        <span className="text-[8px] font-bold text-emerald-700">Alignment Score:</span>
                        <span className="text-[8px] font-black text-emerald-800">{scoreVal}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Scenario A */}
                      <div className="border border-slate-150 rounded-md p-2 bg-slate-50/50 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-black text-teal-800 uppercase bg-teal-50 px-1 py-0.2 rounded">Scenario A: Strategic Path</span>
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">↑ 15% Hiệu năng</span>
                        </div>
                        <h4 className="text-[10px] font-bold text-slate-800 leading-tight">Giải pháp tối ưu hóa hiệu suất và chất lượng</h4>
                        <p className="text-[9px] text-slate-500 leading-relaxed line-clamp-3">
                          Chào bạn, mình là Nhất Huy, chuyên gia về Next.js và PostgreSQL. Đối với mục tiêu tuyển dụng của bên bạn đang cần xây dựng dashboard chi tiêu tài chính, mình đề xuất giải pháp tối ưu hệ thống, giảm thiểu độ trễ tải dữ liệu và tăng tốc độ hiển thị. Mình cam kết thiết kế quy trình bảo mật chuẩn chỉnh để bảo vệ tối đa dữ liệu VIP của khách hàng. Hãy kết nối với mình để bắt đầu nhé.
                        </p>
                      </div>

                      {/* Scenario B */}
                      <div className="border border-indigo-150 rounded-md p-2 bg-indigo-50/20 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-black text-indigo-850 uppercase bg-indigo-50 px-1 py-0.2 rounded">Scenario B: Visionary Path</span>
                          <span className="text-[8px] font-bold text-indigo-600 bg-indigo-50 px-1 rounded">Rocket Speed</span>
                        </div>
                        <h4 className="text-[10px] font-bold text-slate-800 leading-tight">Đột phá trải nghiệm người dùng thế hệ mới</h4>
                        <p className="text-[9px] text-slate-500 leading-relaxed line-clamp-3">
                          Hi there! Hãy cùng mình tạo nên sự đột phá cho hệ thống quản lý chi tiêu FinTech của bạn. Mình mang đến phong cách thiết kế giao diện tinh gọn, mượt mà và trực quan hóa dữ liệu đỉnh cao. Tích hợp AI để gợi ý tiết kiệm thông minh sẽ nâng tầm trải nghiệm của người dùng VIP. Nhắn tin cho mình để chúng ta cùng bắt tay xây dựng ngay hôm nay!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3: FEATURES GRID ───────────────────────────────────── */}
      <section id="features" className="w-full h-screen flex flex-col justify-center items-center py-16 px-6 md:px-12 bg-slate-50 relative overflow-hidden md:snap-start shrink-0 border-t border-slate-100">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight font-geist mb-4">
              Intelligent Features for Modern Teams
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
              Everything you need to craft the perfect message, every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white border-t-4 border-teal-800 hover:border-teal-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left"
            >
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-6 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Context-Aware AI
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our AI understands your audience's unique needs by analyzing industry trends, company data, and recent news to build a foundation of relevance.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left"
            >
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-6 shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Tone of Voice Selector
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Match your pitch to your client's personality. Whether they prefer formal, casual, or highly technical communication, adjust instantly with a slider.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start text-left"
            >
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-800 mb-6 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Premium Analytics
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Track engagement and optimize your pitch performance. See exactly which sections prospects read longest and A/B test variations effortlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PRICING ──────────────────────────────────────────── */}
      <section id="pricing" className="w-full h-screen flex flex-col justify-center items-center py-16 px-6 md:px-12 bg-slate-50 relative overflow-hidden md:snap-start shrink-0 border-t border-slate-100">
        <div className="max-w-7xl w-full flex flex-col items-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-950 tracking-tight font-geist mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
              Scale your outreach without breaking the bank.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full items-stretch">
            {/* Pricing 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0 }}
              className="bg-white border border-slate-155 rounded-xl p-6 shadow-sm flex flex-col justify-between text-left"
            >
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Starter</h3>
                <div className="text-3xl font-extrabold text-slate-950 mb-2">Free</div>
                <p className="text-[11px] text-slate-400 mb-6">Perfect for individuals starting out.</p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>10 Pitches/month</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Basic Templates</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Advanced Tone Selection</span>
                  </li>
                </ul>
              </div>
              <Link
                href={dashboardLink}
                className="w-full text-center border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-full transition-all text-xs cursor-pointer"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Pricing 2 (Pro) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="bg-white border-2 border-teal-800 rounded-xl p-6 shadow-md flex flex-col justify-between text-left relative"
            >
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-teal-800 text-white text-[8px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Pro</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-extrabold text-slate-950">$29</span>
                  <span className="text-slate-400 text-xs">/mo</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-6">For professionals closing deals daily.</p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Unlimited Pitches</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Context-Aware AI Engine</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Advanced Tone Selection</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Basic Analytics</span>
                  </li>
                </ul>
              </div>
              <Link
                href={dashboardLink}
                className="w-full text-center bg-teal-800 hover:bg-teal-900 text-white font-semibold py-2 rounded-full transition-all text-xs cursor-pointer"
              >
                Bắt đầu ngay
              </Link>
            </motion.div>

            {/* Pricing 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="bg-white border border-slate-155 rounded-xl p-6 shadow-sm flex flex-col justify-between text-left"
            >
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Enterprise</h3>
                <div className="text-3xl font-extrabold text-slate-950 mb-2">Custom</div>
                <p className="text-[11px] text-slate-400 mb-6">For large sales teams and agencies.</p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Custom CRM Integrations</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>Dedicated Success Manager</span>
                  </li>
                </ul>
              </div>
              <Link
                href="mailto:contact@synthesis.ai"
                className="w-full text-center border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-2 rounded-full transition-all text-xs cursor-pointer"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FAQ & FOOTER ────────────────────────────────────── */}
      <section id="faq" className="w-full h-screen flex flex-col justify-between py-16 px-6 md:px-12 bg-white relative overflow-hidden md:snap-start shrink-0 border-t border-slate-100">
        {/* FAQ Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full mx-auto my-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-950 font-geist mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Giải đáp những thắc mắc phổ biến về dịch vụ của chúng tôi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2">Synthesis AI hoạt động như thế nào?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chúng tôi kết nối hồ sơ năng lực Master Profile của bạn với bối cảnh mục tiêu (JD tuyển dụng, mô tả dự án) để tạo ra các bài pitch được cá nhân hóa cao thông qua API Gemini.
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2">Tôi có thể tải đề xuất dưới dạng tệp gì?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bạn có thể sao chép nhanh định dạng Markdown chuẩn hoặc kết xuất trực tiếp ra file PDF chuyên nghiệp để gửi ngay qua Email.
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2">Tôi có thể cấu hình bao nhiêu Profile?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Đối với gói Pro, bạn có thể tạo không giới hạn Master Profile để phục vụ cho các định hướng công việc khác nhau (Freelancer, Tư vấn, Quản lý).
              </p>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2">Dự án có bảo mật thông tin hồ sơ của tôi không?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tuyệt đối bảo mật. Mọi thông tin hồ sơ và kịch bản tạo ra được lưu trữ trong cơ sở dữ liệu riêng tư liên kết với tài khoản Clerk của bạn.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-8 shrink-0">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.png"
                alt="Synthesis AI Logo"
                className="w-6 h-6 rounded object-contain bg-slate-100 p-0.5 border border-slate-200/60"
              />
              <span className="font-extrabold text-base text-slate-800">Synthesis AI</span>
            </div>
            <p className="text-[10px] text-slate-400">© 2026 Synthesis AI. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-[11px] text-slate-500 font-semibold">
            <a href="#" className="hover:text-teal-600">Privacy Policy</a>
            <a href="#" className="hover:text-teal-600">Terms of Service</a>
            <a href="#" className="hover:text-teal-600">Contact Us</a>
          </div>
        </footer>
      </section>
    </div>
  );
}
