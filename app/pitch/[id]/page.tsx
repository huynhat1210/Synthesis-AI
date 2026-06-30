/**
 * @file app/pitch/[id]/page.tsx
 * @description Publicly accessible client-facing landing page.
 *              Displays the selected optimized pitch scenario alongside the professional's profile.
 *              Supports `?scenario=A` or `?scenario=B` filtering.
 */
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, Mail, Globe, Briefcase, Award, CheckCircle, ArrowRight } from "lucide-react";
import { readPitchPublic } from "@/lib/storage";
import { PitchActions } from "./PitchActions";

interface PitchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ scenario?: string }>;
}

/**
 * Normalizes Vietnamese text and removes double spaces and odd LLM accent gaps.
 */
function cleanVietnamese(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .replace(/([áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹ])\s+([cmnptuyo]|ng|nh|ch)\b/gi, "$1$2")
    .trim();
}

export default async function PublicPitchPage({ params, searchParams }: PitchPageProps) {
  const { id } = await params;
  const { scenario } = await searchParams;
  const data = await readPitchPublic(id);

  if (!data) {
    notFound();
  }

  const profile = data.creatorProfile || {
    fullName: data.profileSnap.fullName || "A Professional",
    jobTitle: data.profileSnap.jobTitle || "Strategic Specialist",
    bio: "This specialist leverages structured workflows and dynamic AI alignment to deliver bespoke professional outcomes.",
    skills: [],
    projects: [],
  };

  const isVi = data.context.lang === "vi";
  const activeScenario = scenario === "B" ? "B" : "A";

  const labelA = isVi ? "Đề xuất Chiến lược" : "Strategic Proposal";
  const labelB = isVi ? "Phương án Thay thế" : "Alternative Approach";
  const labelPillars = isVi ? "Các điểm trọng tâm chiến lược" : "Strategic Focus Pillars";

  const isA = activeScenario === "A";
  const title = isA ? data.pitch.scenarioA.title : data.pitch.scenarioB.title;
  const content = isA ? data.pitch.scenarioA.content : data.pitch.scenarioB.content;
  const label = isA ? labelA : labelB;

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 font-sans selection:bg-secondary/30 selection:text-white">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.png"
              alt="Synthesis AI Logo"
              className="w-6 h-6 object-contain brightness-0 invert opacity-80"
            />
            <span className="text-sm font-bold font-geist tracking-wider uppercase text-gray-300">
              Synthesis Portal
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold border border-white/10 hidden sm:inline">
              Tailored Proposal Pitch
            </span>
            {/* ── Download & Copy Actions ── */}
            <PitchActions
              pitch={data}
              profile={profile}
            />
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Dynamic Pitch Scenarios (Client Focused) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs text-secondary-container uppercase font-bold tracking-widest">
                {label} for {cleanVietnamese(data.context.targetAudience)}
              </span>
              <h1 className="text-3xl md:text-4xl font-geist text-white font-black leading-tight tracking-tight">
                {cleanVietnamese(title)}
              </h1>
              <p className="text-base text-gray-300 leading-relaxed text-justify">
                {cleanVietnamese(content)}
              </p>
            </div>

            {/* Strategic focus pillars (for Scenario A) */}
            {isA && data.pitch.scenarioA.bullets && data.pitch.scenarioA.bullets.length > 0 && (
              <div className="border border-white/10 rounded-xl p-6 bg-white/5 space-y-4">
                <h3 className="text-xs font-bold text-secondary-container uppercase tracking-wider">
                  {labelPillars}
                </h3>
                <ul className="space-y-3">
                  {data.pitch.scenarioA.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-secondary-container mt-0.5 shrink-0" />
                      <span className="text-justify">{cleanVietnamese(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stats Grid (for Scenario B) */}
            {!isA && data.pitch.scenarioB.stats && data.pitch.scenarioB.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {data.pitch.scenarioB.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col justify-between min-h-[70px]">
                    <p className="text-xs text-gray-300 font-medium leading-relaxed text-justify">{cleanVietnamese(stat.label)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Mobile Download Button */}
            <div className="flex justify-center lg:hidden pt-4">
              <PitchActions
                pitch={data}
                profile={profile}
              />
            </div>
          </div>

          {/* RIGHT: Professional Profile Snap */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-md">
            
            {/* Header info */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center font-bold text-xl text-secondary-container border border-white/15">
                {profile.fullName.slice(0, 1).toUpperCase() || "P"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{cleanVietnamese(profile.fullName)}</h2>
                <p className="text-xs text-secondary-container font-semibold mt-0.5">
                  {cleanVietnamese(profile.jobTitle)}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Me</h3>
              <p className="text-xs text-gray-300 leading-relaxed text-justify">{cleanVietnamese(profile.bio)}</p>
            </div>

            {/* Key Skills */}
            {profile.skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Core Capabilities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/10 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10"
                    >
                      {cleanVietnamese(skill)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Projects */}
            {profile.projects.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-secondary-container" />
                  Portfolio Proof Points
                </h3>
                <div className="space-y-3">
                  {profile.projects.slice(0, 2).map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all space-y-1"
                    >
                      <h4 className="text-xs font-bold text-white">{cleanVietnamese(proj.title)}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed text-justify">
                        {cleanVietnamese(proj.description)}
                      </p>
                      {proj.outcome && (
                        <span className="inline-block text-[10px] text-secondary-container font-medium mt-1">
                          Result: {cleanVietnamese(proj.outcome)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connect CTA */}
            <div className="pt-6 border-t border-white/10">
              <a
                href={`mailto:hello@synthesis.ai?subject=Regarding your custom pitch proposal`}
                className="w-full bg-secondary-container hover:bg-secondary-container/90 text-primary py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                Connect With Me <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>Powered by <strong className="text-gray-400">Synthesis AI</strong> — Context-Aware Pitch Engine</span>
          <Link href="/dashboard" className="text-secondary-container hover:underline font-semibold">
            Create your own pitch →
          </Link>
        </footer>
      </div>
    </div>
  );
}
