/**
 * @file components/dashboard/AnalyticsView.tsx
 * @description Renders the match analytics dashboard using real AI evaluation metrics.
 *              Contains zero mock/placeholder data.
 */
"use client";

import React from "react";
import { TrendingUp, Users, Rocket, CheckCircle, AlertCircle, Award } from "lucide-react";
import type { MasterProfile, SavedPitch } from "@/types";
import { cn } from "@/lib/utils";
import { translations, type Language } from "@/lib/translations";

interface AnalyticsViewProps {
  profile: MasterProfile;
  savedPitches: SavedPitch[];
  lang: Language;
}

export function AnalyticsView({ profile, savedPitches, lang }: AnalyticsViewProps) {
  const t = translations[lang];
  const latestPitch = savedPitches[0];
  const analysis = latestPitch?.pitch?.matchAnalysis;
  const alignmentScore = analysis ? analysis.alignmentScore : 0;

  // Extract last 5 pitches for the chart
  const chartData = savedPitches
    .slice(0, 5)
    .reverse()
    .map((p, idx) => ({
      label: `Pitch ${idx + 1}`,
      score: p.pitch.matchAnalysis?.alignmentScore || 0,
      goal: p.context.pitchGoal.slice(0, 12) + (p.context.pitchGoal.length > 12 ? "..." : ""),
    }));

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">{t.analyticsHeader}</h2>
        <p className="text-sm text-on-surface-variant">
          {t.analyticsDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat A */}
        <div className="border border-outline-variant rounded-xl p-5 bg-surface animate-fade-in">
          <TrendingUp className="w-8 h-8 text-secondary mb-3" />
          <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">
            {t.totalPitches}
          </span>
          <h3 className="text-3xl font-bold font-geist text-primary mt-1">{savedPitches.length}</h3>
          <p className="text-[11px] text-on-surface-variant mt-2">
            {lang === "vi" ? "Mẫu hoạt động được lưu trong cơ sở dữ liệu." : "Active templates saved in local PostgreSQL database."}
          </p>
        </div>
        {/* Stat B */}
        <div className="border border-outline-variant rounded-xl p-5 bg-surface animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Users className="w-8 h-8 text-secondary mb-3" />
          <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">
            {t.averageScore}
          </span>
          <h3 className="text-3xl font-bold font-geist text-primary mt-1">
            {alignmentScore > 0 ? `${alignmentScore}%` : "—"}
          </h3>
          <p className="text-[11px] text-on-surface-variant mt-2">
            {analysis
              ? `${lang === "vi" ? "Điểm phù hợp với:" : "Suitability score for:"} "${latestPitch.context.targetAudience.slice(0, 30)}..."`
              : (lang === "vi" ? "Tạo bài pitch để tính toán chỉ số tương thích." : "Generate a pitch to compute match alignment metrics.")}
          </p>
        </div>
        {/* Stat C */}
        <div className="border border-outline-variant rounded-xl p-5 bg-surface animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Rocket className="w-8 h-8 text-secondary mb-3" />
          <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider">
            {lang === "vi" ? "Kỹ Năng Nổi Bật" : "Featured Core Skills"}
          </span>
          <h3 className="text-3xl font-bold font-geist text-primary mt-1">{profile.skills.length}</h3>
          <p className="text-[11px] text-on-surface-variant mt-2">
            {lang === "vi" ? "Các thẻ kỹ năng chuyên môn thúc đẩy AI tạo prompt." : "Unique professional tags driving AI prompt generation."}
          </p>
        </div>
      </div>

      {/* SVG Historical Score Trend Chart */}
      <div className="border border-outline-variant rounded-xl p-6 bg-surface space-y-4 animate-fade-in">
        <div>
          <h3 className="text-sm font-bold text-primary">
            {lang === "vi" ? "Xu Hướng Lịch Sử Điểm Tương Thích" : "Alignment Score History Trend"}
          </h3>
          <p className="text-[11px] text-on-surface-variant">
            {lang === "vi" ? "Tiến độ tối ưu hóa điểm qua các lần tạo bài pitch." : "Match score optimization progression over generated pitch iterations."}
          </p>
        </div>

        {savedPitches.length > 0 ? (
          <div className="w-full overflow-x-auto pt-4">
            <svg className="w-full min-w-[500px] h-[220px]" viewBox="0 0 600 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((percent, idx) => {
                const y = 170 - (percent / 100) * 150;
                return (
                  <g key={idx}>
                    <line x1="50" y1={y} x2="550" y2={y} stroke="#e5e7eb" strokeDasharray="4 4" strokeWidth="1" />
                    <text x="25" y={y + 4} fill="#6b7280" fontSize="10" className="font-bold text-right">{percent}%</text>
                  </g>
                );
              })}

              {/* Render Bars & Data */}
              {chartData.map((data, idx) => {
                const x = 100 + idx * 100;
                const y = 170 - (data.score / 100) * 150;
                const barHeight = 170 - y;

                return (
                  <g key={idx} className="group">
                    {/* Vertical bar */}
                    <rect
                      x={x - 20}
                      y={y}
                      width="40"
                      height={barHeight}
                      fill="url(#barGrad)"
                      rx="6"
                      className="transition-all duration-300 hover:opacity-100 opacity-90"
                    />
                    {/* Glowing top line indicator */}
                    <line x1={x - 20} y1={y} x2={x + 20} y2={y} stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    
                    {/* Score Label above bar */}
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fill="#111827"
                      fontSize="11"
                      className="font-bold"
                    >
                      {data.score}%
                    </text>

                    {/* Pitch goal hover tooltip label */}
                    <text
                      x={x}
                      y="192"
                      textAnchor="middle"
                      fill="#111827"
                      fontSize="10"
                      className="font-bold uppercase tracking-wider"
                    >
                      {data.label}
                    </text>
                    <text
                      x={x}
                      y="208"
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="9"
                      className="opacity-80"
                    >
                      {data.goal}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-outline-variant rounded-xl bg-surface-container-low/30">
            <TrendingUp className="w-10 h-10 text-outline mx-auto mb-2" />
            <h4 className="text-xs font-bold text-primary mb-1">
              {lang === "vi" ? "Chưa Có Dữ Liệu Lịch Sử" : "No Historical Trend Data"}
            </h4>
            <p className="text-[10px] text-on-surface-variant max-w-xs mx-auto">
              {lang === "vi"
                ? "Tạo và lưu bài pitch đầu tiên để bắt đầu theo dõi điểm tương thích chuyên môn của bạn."
                : "Generate and save your first context-aware proposal pitch to start tracking your professional suitability score progression."}
            </p>
          </div>
        )}
      </div>

      {/* AI Alignment Breakdown Panel */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Strengths Card */}
          <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-low/30 space-y-4">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
              <CheckCircle className="w-5 h-5 text-secondary" />
              {t.strengthsLabel}
            </h3>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps / Advice Card */}
          <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-low/30 space-y-4">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
              <AlertCircle className="w-5 h-5 text-error" />
              {t.gapsLabel}
            </h3>
            <ul className="space-y-3">
              {analysis.gaps.map((gap, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-error/10 text-error flex items-center justify-center font-bold text-[10px] shrink-0">
                    !
                  </span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Skills active status summary */}
      <div className="border border-outline-variant rounded-xl p-6 bg-surface space-y-4 animate-fade-in">
        <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
          <Award className="w-5 h-5 text-secondary" />
          {lang === "vi" ? "Tóm Tắt Kỹ Năng Đang Hoạt Động" : "Active Profile Skills Summary"}
        </h3>
        <div className="space-y-3">
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills.map((skill) => {
                const isActiveInLatest = latestPitch?.context?.selectedSkills
                  ? latestPitch.context.selectedSkills.includes(skill)
                  : true; // If no selectedSkills array (old pitch or default), treat all as active
                
                return (
                  <span
                    key={skill}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all duration-200",
                      isActiveInLatest
                        ? "bg-secondary/10 text-secondary border-secondary/20"
                        : "bg-surface text-on-surface-variant/70 border-outline-variant"
                    )}
                  >
                    👤 {skill} {isActiveInLatest ? `• ${lang === "vi" ? "Đang dùng" : "Active"}` : ""}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-on-surface-variant">
              {lang === "vi"
                ? "Thêm kỹ năng vào hồ sơ Master để xem chúng được tóm tắt tại đây."
                : "Add skills to your Master Profile to see them summarized here."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
