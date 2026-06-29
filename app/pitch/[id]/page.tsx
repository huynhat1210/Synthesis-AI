/**
 * @file app/pitch/[id]/page.tsx
 * @description Publicly accessible client-facing landing page.
 *              Displays the optimized pitch alongside the professional's profile and projects.
 *              Securely fetches from database via readPitchPublic (does not require Clerk auth).
 */
import React from "react";
import { notFound } from "next/navigation";
import { Sparkles, Mail, Globe, Briefcase, Award, CheckCircle, ArrowRight } from "lucide-react";
import { readPitchPublic } from "@/lib/storage";

interface PitchPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicPitchPage({ params }: PitchPageProps) {
  const { id } = await params;
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

  return (
    <div className="min-h-screen bg-[#070913] text-gray-100 font-sans selection:bg-secondary/30 selection:text-white">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-secondary-container" />
            <span className="text-sm font-bold font-geist tracking-wider uppercase text-gray-300">
              Synthesis Portal
            </span>
          </div>
          <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
            Tailored Proposal Pitch
          </span>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Dynamic Pitch Scenarios (Client Focused) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs text-secondary-container uppercase font-bold tracking-widest">
                Optimized Proposal for {data.context.targetAudience}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif text-white font-bold leading-tight">
                {data.pitch.scenarioA.title}
              </h1>
              <p className="text-base text-gray-300 leading-relaxed">
                {data.pitch.scenarioA.content}
              </p>
            </div>

            {/* Strategic proof points */}
            {data.pitch.scenarioA.bullets && data.pitch.scenarioA.bullets.length > 0 && (
              <div className="border border-white/10 rounded-xl p-6 bg-white/5 space-y-4">
                <h3 className="text-xs font-bold text-secondary-container uppercase tracking-wider">
                  Strategic Focus Pillars
                </h3>
                <ul className="space-y-3">
                  {data.pitch.scenarioA.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-secondary-container mt-0.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visionary Alternate Scenario */}
            <div className="border border-white/5 rounded-xl p-6 bg-[#0c1020] space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Alternative Vision: {data.pitch.scenarioB.label}
                </span>
                <span className="text-[10px] bg-secondary/20 text-secondary-container px-2 py-0.5 rounded font-semibold uppercase">
                  Agile
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                {data.pitch.scenarioB.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {data.pitch.scenarioB.content}
              </p>
            </div>
          </div>

          {/* RIGHT: Professional Profile Snap */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-md">
            
            {/* Header info */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center font-bold text-xl text-secondary-container border border-white/15">
                {profile.fullName.slice(0, 1) || "P"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{profile.fullName}</h2>
                <p className="text-xs text-secondary-container font-semibold mt-0.5">
                  {profile.jobTitle}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Me</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Key Skills */}
            {profile.skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Core Capabilities</h3>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-md text-[10px] font-medium"
                    >
                      {skill}
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
                      <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                      {proj.outcome && (
                        <span className="inline-block text-[10px] text-secondary-container font-medium mt-1">
                          Result: {proj.outcome}
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
      </div>
    </div>
  );
}
