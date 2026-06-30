/**
 * @file app/pitch/[id]/page.tsx
 * @description Publicly accessible client-facing landing page.
 *              Displays the selected optimized pitch scenario alongside the professional's profile.
 *              Supports `?scenario=A` or `?scenario=B` filtering.
 *              Premium light theme (black-and-white style) matching the workspace aesthetics.
 */
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Briefcase, CheckCircle, ArrowRight } from "lucide-react";
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
    .replace(/([áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹ])\s+([cmnptuyo]|ng|nh|ch)(?=\s|$)/gi, "$1$2")
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
  const labelGoal = isVi ? "Mục tiêu Dự án" : "Proposal Goal";
  const labelPrepared = isVi ? "Dành cho Đối tác" : "Prepared For";

  const isA = activeScenario === "A";
  const title = isA ? data.pitch.scenarioA.title : data.pitch.scenarioB.title;
  const content = isA ? data.pitch.scenarioA.content : data.pitch.scenarioB.content;
  const label = isA ? labelA : labelB;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-secondary/30 selection:text-[#191c1e]">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-16 border-b border-[#c8c5d0] pb-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.png"
              alt="Synthesis AI Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-bold font-geist tracking-wider uppercase text-primary">
              Synthesis Portal
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="bg-white text-[#47464f] px-3 py-1 rounded-full text-xs font-semibold border border-[#c8c5d0] hidden sm:inline shadow-sm">
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
            
            {/* Context Summary block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border border-[#c8c5d0] rounded-xl p-4 shadow-sm mb-6">
              <div>
                <span className="text-[10px] text-[#787680] font-bold uppercase tracking-wider block mb-1">{labelGoal}</span>
                <span className="text-xs font-bold text-primary">{cleanVietnamese(data.context.pitchGoal)}</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-[#c8c5d0] pt-3 sm:pt-0 sm:pl-4">
                <span className="text-[10px] text-[#787680] font-bold uppercase tracking-wider block mb-1">{labelPrepared}</span>
                <span className="text-xs font-bold text-primary">{cleanVietnamese(data.context.targetAudience)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs text-secondary font-bold uppercase tracking-widest block">
                {label}
              </span>
              <h1 className="text-3xl md:text-4xl font-geist text-primary font-black leading-tight tracking-tight">
                {cleanVietnamese(title)}
              </h1>
              <p className="text-base text-[#47464f] leading-relaxed text-justify">
                {cleanVietnamese(content)}
              </p>
            </div>

            {/* Strategic focus pillars (for Scenario A) */}
            {isA && data.pitch.scenarioA.bullets && data.pitch.scenarioA.bullets.length > 0 && (
              <div className="border border-[#c8c5d0] rounded-xl p-6 bg-white space-y-4 shadow-sm">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-[#c8c5d0] pb-2">
                  {labelPillars}
                </h3>
                <ul className="space-y-3">
                  {data.pitch.scenarioA.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#47464f] leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
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
                  <div key={idx} className="bg-white rounded-xl p-4 border border-[#c8c5d0] flex flex-col justify-between min-h-[70px] shadow-sm">
                    <p className="text-xs text-[#47464f] font-semibold leading-relaxed text-justify">{cleanVietnamese(stat.label)}</p>
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
          <div className="lg:col-span-5 bg-white border border-[#c8c5d0] rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Header info */}
            <div className="flex items-center gap-4 border-b border-[#c8c5d0] pb-6">
              <div className="w-14 h-14 rounded-full bg-[#006b5f]/10 flex items-center justify-center font-bold text-xl text-[#006b5f] border border-[#006b5f]/20">
                {profile.fullName.slice(0, 1).toUpperCase() || "P"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">{cleanVietnamese(profile.fullName)}</h2>
                <p className="text-xs text-secondary font-bold mt-0.5">
                  {cleanVietnamese(profile.jobTitle)}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#787680] uppercase tracking-wider">About Me</h3>
              <p className="text-xs text-[#47464f] leading-relaxed text-justify">{cleanVietnamese(profile.bio)}</p>
            </div>

            {/* Key Skills */}
            {profile.skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-[#787680] uppercase tracking-wider">Core Capabilities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#f2f4f6] text-[#47464f] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#c8c5d0]"
                    >
                      {cleanVietnamese(skill)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Projects */}
            {profile.projects.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#c8c5d0]">
                <h3 className="text-xs font-bold text-[#787680] uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-secondary" />
                  Portfolio Proof Points
                </h3>
                <div className="space-y-3">
                  {profile.projects.slice(0, 2).map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 border border-[#c8c5d0] rounded-xl bg-[#f2f4f6]/40 hover:bg-[#f2f4f6]/80 transition-all space-y-1"
                    >
                      <h4 className="text-xs font-bold text-primary">{cleanVietnamese(proj.title)}</h4>
                      <p className="text-[11px] text-[#47464f] leading-relaxed text-justify">
                        {cleanVietnamese(proj.description)}
                      </p>
                      {proj.outcome && (
                        <span className="inline-block text-[10px] text-secondary font-bold mt-1">
                          Result: {cleanVietnamese(proj.outcome)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connect CTA */}
            <div className="pt-6 border-t border-[#c8c5d0]">
              <a
                href={`mailto:hello@synthesis.ai?subject=Regarding your custom pitch proposal`}
                className="w-full bg-[#006b5f] hover:bg-[#006b5f]/90 text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
              >
                Connect With Me <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-[#c8c5d0] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#787680]">
          <span>Powered by <strong className="text-primary">Synthesis AI</strong> — Context-Aware Pitch Engine</span>
          <Link href="/dashboard" className="text-secondary hover:underline font-bold">
            Create your own pitch →
          </Link>
        </footer>
      </div>
    </div>
  );
}
