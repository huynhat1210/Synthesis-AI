/**
 * @file components/dashboard/DashboardView.tsx
 * @description Renders the main dashboard workspace containing
 *              profile summary and pitch generation configuration.
 */
"use client";

import { Sparkles, Zap, ChevronRight, CheckCircle, Check, Copy, Share2, TrendingUp, X, RefreshCw, FileUp, FileDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { MasterProfile, ClientContext, GeneratedPitch } from "@/types";
import { translations, type Language } from "@/lib/translations";

interface DashboardViewProps {
  profile: MasterProfile;
  setProfileState: React.Dispatch<React.SetStateAction<MasterProfile>>;
  inputs: ClientContext;
  setInputs: React.Dispatch<React.SetStateAction<ClientContext>>;
  newSkill: string;
  setNewSkill: (val: string) => void;
  handleAddSkill: (e: React.FormEvent) => void;
  handleRemoveSkill: (skill: string) => void;
  handleGeneratePitch: () => void;
  currentResult: GeneratedPitch | null;
  copiedScenario: string | null;
  copyToClipboard: (text: string, id: string) => void;
  setActiveTab: (tab: any) => void;
  showNotification: (msg: string, type?: "success" | "info" | "error") => void;
  syncProfileToServer: (p: MasterProfile) => void;
  handleSaveCurrentPitch: () => void;
  renderIcon: (name: string) => React.ReactNode;
  handlePdfUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  parsingPdf: boolean;
  lang: Language;
}

export function DashboardView({
  profile,
  setProfileState,
  inputs,
  setInputs,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleRemoveSkill,
  handleGeneratePitch,
  currentResult,
  copiedScenario,
  copyToClipboard,
  setActiveTab,
  showNotification,
  syncProfileToServer,
  handleSaveCurrentPitch,
  renderIcon,
  handlePdfUpload,
  parsingPdf,
  lang,
}: DashboardViewProps) {
  const handleExportPdf = () => {
    if (!currentResult) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showNotification("Pop-up blocked! Please allow pop-ups to export PDF.", "info");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <title>Tailored Pitch Proposal - ${profile.fullName || "Synthesis User"}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1f2937; padding: 40px; line-height: 1.6; }
            .header { border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 40px; }
            .logo { font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 2px; color: #2563eb; }
            h1 { font-family: Georgia, serif; font-size: 28px; color: #111827; margin: 10px 0; }
            h2 { font-size: 20px; color: #1e3a8a; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
            p { font-size: 14px; color: #374151; }
            ul { padding-left: 20px; }
            li { font-size: 13px; color: #4b5563; margin-bottom: 8px; }
            .meta { font-size: 11px; color: #6b7280; margin-top: 8px; }
            .footer { margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 11px; color: #9ca3af; text-align: center; }
            @media print {
              body { padding: 20px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <span class="logo">Synthesis AI Proposal</span>
            <h1>${currentResult.scenarioA.title}</h1>
            <p class="meta">Prepared for: <strong>${inputs.targetAudience}</strong></p>
          </div>
          
          <h2>Proposal Scenario A: Strategic Path</h2>
          <p>${currentResult.scenarioA.content}</p>
          ${
            currentResult.scenarioA.bullets && currentResult.scenarioA.bullets.length > 0
              ? `
              <h3>Key Deliverables & Metrics</h3>
              <ul>
                ${currentResult.scenarioA.bullets.map((b) => `<li>${b}</li>`).join("")}
              </ul>
              `
              : ""
          }

          <h2>Proposal Scenario B: Agile & Visionary Path</h2>
          <p>${currentResult.scenarioB.content}</p>

          <div class="footer">
            Generated via Synthesis AI. Professional Profile: ${profile.fullName} — ${profile.jobTitle}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleCopyMarkdown = () => {
    if (!currentResult) return;
    const md = `
# Tailored Pitch Proposal: ${currentResult.scenarioA.title}

**Target Client/Audience**: ${inputs.targetAudience}
**Proposal Goal**: ${inputs.pitchGoal}

---

## 📈 Scenario A: Strategic & Metric-Driven
*${currentResult.scenarioA.label}*

${currentResult.scenarioA.content}

${
  currentResult.scenarioA.bullets && currentResult.scenarioA.bullets.length > 0
    ? `### Key Focus Dimensions:\n${currentResult.scenarioA.bullets.map((b) => `- ${b}`).join("\n")}`
    : ""
}

---

## 🚀 Scenario B: Energetic & Visionary
*${currentResult.scenarioB.label}*

${currentResult.scenarioB.content}

---
*Generated via Synthesis AI — Personalised Dynamic Pitching Engine*
    `.trim();
    copyToClipboard(md, "markdown");
    showNotification("Formatted Markdown proposal copied to clipboard!", "success");
  };

  const t = translations[lang];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Build Master Profile */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative text-left"
        >
          <div className="border-b border-outline-variant pb-4 mb-6">
            <h3 className="text-lg font-bold font-geist text-primary uppercase">
              {t.buildProfile}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              {lang === "vi"
                ? "Thông tin nền tảng chuyên môn dùng để làm căn cứ tự động viết các bài pitch cá nhân hóa."
                : "Foundational professional context used to power your generated pitches."}
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfileState({ ...profile, fullName: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                  {t.jobTitle}
                </label>
                <input
                  type="text"
                  value={profile.jobTitle}
                  onChange={(e) => setProfileState({ ...profile, jobTitle: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  placeholder="e.g. Lead Strategic Designer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                {t.bio}
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfileState({ ...profile, bio: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all h-24 resize-none leading-relaxed"
                placeholder={lang === "vi" ? "Tóm tắt ngắn gọn chặng đường sự nghiệp của bạn..." : "Brief summary of your professional journey..."}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                {t.skills}
              </label>
              <div className="flex flex-wrap gap-2 mb-2 p-2 border border-outline-variant rounded-lg min-h-12 bg-surface">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-surface-container-low text-primary-container px-3 py-1 rounded-full text-xs font-medium border border-outline-variant"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-error text-on-surface-variant transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <form onSubmit={handleAddSkill} className="flex-1 min-w-[120px]">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="bg-transparent border-none text-xs p-1 outline-none w-full"
                    placeholder={t.addSkillPlaceholder}
                  />
                </form>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {t.featuredProjects}
                </label>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="text-xs text-secondary hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  {lang === "vi" ? "Quản lý dự án" : "Manage Projects"} <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.slice(0, 2).map((proj) => (
                  <div
                    key={proj.id}
                    className="border border-outline-variant rounded-lg p-3 flex items-start gap-3 bg-surface hover:bg-surface-container-low transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proj.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200"}
                      alt={proj.title}
                      className="w-12 h-12 rounded-md object-cover border border-outline-variant shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-primary truncate">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
                {profile.projects.length === 0 && (
                  <div className="col-span-2 text-center py-4 border border-dashed border-outline-variant rounded-lg text-xs text-on-surface-variant">
                    {lang === "vi" ? "Chưa có dự án nào. Bấm Quản lý dự án để thêm mới." : "No projects added yet. Click Manage Projects to add one."}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  showNotification(t.profileSaved);
                  syncProfileToServer(profile);
                }}
                className="bg-primary-container text-on-primary hover:bg-primary-container/95 px-5 py-2.5 rounded-lg text-xs font-semibold hover:shadow-sm transition-all cursor-pointer"
              >
                {t.saveProfileBtn}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Generate Pitch Configuration */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.05 }}
          className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>

          <div>
            <div className="border-b border-outline-variant pb-4 mb-6">
              <h3 className="text-lg font-bold font-geist text-primary flex items-center gap-2 uppercase">
                <Sparkles className="w-5 h-5 text-secondary" />
                {t.generatePitchHeader}
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider">
                    {t.targetAudienceLabel}
                  </label>
                  <label className="text-[10px] text-secondary hover:text-secondary/80 cursor-pointer font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                    <FileUp className="w-3.5 h-3.5" />
                    <span>{parsingPdf ? (lang === "vi" ? "Đang quét..." : "Scanning...") : t.uploadJdBtn}</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePdfUpload}
                      disabled={parsingPdf}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <textarea
                    value={inputs.targetAudience}
                    onChange={(e) => setInputs({ ...inputs, targetAudience: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all h-32 resize-none leading-relaxed"
                    placeholder={t.targetAudiencePlaceholder}
                  />
                  {parsingPdf && (
                    <div className="absolute inset-0 bg-surface/85 backdrop-blur-[1px] flex flex-col justify-center items-center rounded-lg z-10 overflow-hidden border border-secondary/20">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary shadow-[0_0_10px_#006b5f] animate-scan"></div>
                      <div className="flex items-center gap-2.5 text-secondary font-bold text-xs tracking-wider uppercase animate-pulse">
                        <div className="w-3.5 h-3.5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                        <span>{t.scanLaserTooltip}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                  {lang === "vi" ? "Mục tiêu / Loại bài Pitch" : "Pitch Goal / Context Type"}
                </label>
                <select
                  value={inputs.pitchGoal}
                  onChange={(e) => setInputs({ ...inputs, pitchGoal: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all cursor-pointer"
                >
                  <option value="Freelance Project Proposal">{lang === "vi" ? "Đề xuất dự án Freelance" : "Freelance Project Proposal"}</option>
                  <option value="Job Interview Presentation">{lang === "vi" ? "Thuyết trình phỏng vấn" : "Job Interview Presentation"}</option>
                  <option value="Sales Pitch & Demo">{lang === "vi" ? "Sales Pitch & Demo" : "Sales Pitch & Demo"}</option>
                  <option value="Internal Stakeholder Alignment">{lang === "vi" ? "Trình bày nội bộ" : "Internal Stakeholder Alignment"}</option>
                  <option value="Executive Briefing & Summary">{lang === "vi" ? "Báo cáo Ban Lãnh đạo" : "Executive Briefing & Summary"}</option>
                </select>
              </div>

              {profile.skills.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                    {t.smartSelectorLabel}
                  </label>
                  <p className="text-[10px] text-on-surface-variant mb-2">
                    {lang === "vi"
                      ? "Chọn kỹ năng nào trong hồ sơ sẽ được AI ưu tiên nhấn mạnh."
                      : "Toggle which Master Profile skills to focus the AI pitch generation on."}
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 border border-outline-variant rounded-lg bg-surface-container-lowest">
                    {profile.skills.map((skill) => {
                      const selected = (inputs.selectedSkills ?? profile.skills).includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            const current = inputs.selectedSkills ?? profile.skills;
                            const next = current.includes(skill)
                              ? current.filter((s) => s !== skill)
                              : [...current, skill];
                            setInputs({ ...inputs, selectedSkills: next });
                          }}
                          className={cn(
                            "px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer border",
                            selected
                              ? "bg-secondary text-on-secondary border-secondary"
                              : "bg-surface text-on-surface-variant border-outline-variant hover:bg-surface-container-high"
                          )}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider">
                    {t.toneSliderLabel}
                  </label>
                  <span className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-2 py-0.5 rounded">
                    {inputs.toneValue !== undefined
                      ? inputs.toneValue < 35
                        ? `${t.toneFormal} (${inputs.toneValue}/100)`
                        : inputs.toneValue > 70
                        ? `${t.toneCasual} (${inputs.toneValue}/100)`
                        : `${t.toneBalanced} (${inputs.toneValue}/100)`
                      : `${t.toneBalanced} (50/100)`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={inputs.toneValue !== undefined ? inputs.toneValue : 50}
                  onChange={(e) => setInputs({ ...inputs, toneValue: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant font-medium mt-1">
                  <span>{lang === "vi" ? "Trang trọng (0)" : "Corporate (0)"}</span>
                  <span>{lang === "vi" ? "Trung lập (50)" : "Balanced (50)"}</span>
                  <span>{lang === "vi" ? "Năng động (100)" : "Startup (100)"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                    {lang === "vi" ? "Phong cách viết AI" : "AI Writing Style"}
                  </label>
                  <select
                    value={inputs.style}
                    onChange={(e) => setInputs({ ...inputs, style: e.target.value as any })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  >
                    <option value="Persuasive">{lang === "vi" ? "Thuyết phục" : "Persuasive"}</option>
                    <option value="Creative">{lang === "vi" ? "Sáng tạo" : "Creative"}</option>
                    <option value="Analytical">{lang === "vi" ? "Phân tích" : "Analytical"}</option>
                    <option value="Bold">{lang === "vi" ? "Mạnh mẽ" : "Bold"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1.5 uppercase tracking-wider">
                    {lang === "vi" ? "Độ dài bài Pitch" : "Pitch Length"}
                  </label>
                  <select
                    value={inputs.length}
                    onChange={(e) => setInputs({ ...inputs, length: e.target.value as any })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  >
                    <option value="Short">{lang === "vi" ? "Ngắn (~100 từ)" : "Short (~100 words)"}</option>
                    <option value="Medium">{lang === "vi" ? "Vừa (~200 từ)" : "Medium (~200 words)"}</option>
                    <option value="Long">{lang === "vi" ? "Dài (~350 từ)" : "Long (~350 words)"}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 lg:mt-0">
            <button
              onClick={handleGeneratePitch}
              className="w-full bg-secondary hover:bg-secondary/95 text-on-secondary px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-md transition-all active:scale-98 flex justify-center items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-on-secondary" />
              {t.generatePitchBtn}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Live Pitch Preview Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-outline-variant pb-4 mb-6 gap-3">
          <div>
            <h3 className="text-lg font-bold font-geist text-primary uppercase">
              {t.livePreviewHeader}
            </h3>
            <p className="text-xs text-on-surface-variant">
              {lang === "vi"
                ? "Xem lại các kịch bản pitch đã được AI tối ưu hóa theo mục tiêu của bạn."
                : "Review the generated target scenarios dynamically optimized for your objectives."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab("profile");
                showNotification(lang === "vi" ? "Mở không gian chỉnh sửa hồ sơ Master Profile." : "Opening Master Profile edit space.");
              }}
              className="px-3.5 py-2 border border-outline text-primary hover:bg-surface-container-low rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              {lang === "vi" ? "Chỉnh sửa hồ sơ" : "Edit Profile Context"}
            </button>
            <button
              onClick={handleGeneratePitch}
              className="px-3.5 py-2 border border-outline text-primary hover:bg-surface-container-low rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {lang === "vi" ? "Tạo lại" : "Re-Generate"}
            </button>
            <button
              onClick={handleSaveCurrentPitch}
              className="px-3.5 py-2 bg-primary-container hover:bg-primary-container/95 text-on-primary rounded-lg text-xs font-semibold transition-all cursor-pointer"
            >
              {lang === "vi" ? "Lưu vào kho" : "Save to Archive"}
            </button>
          </div>
        </div>

        {!currentResult ? (
          <div className="flex flex-col items-center justify-center p-8 py-16 text-center gap-4 bg-surface rounded-xl border border-dashed border-outline-variant animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-secondary-container/10 border border-outline-variant flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary font-geist">{t.noPreviewLoaded}</h4>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1 leading-relaxed">
                {t.noPreviewDesc}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scenario A Card */}
              <div className="border border-outline-variant rounded-xl p-6 bg-surface-container-low/50 hover:bg-surface-container-low/80 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-surface-container-high text-primary-container px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {currentResult.scenarioA.label}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${currentResult.scenarioA.title}\n\n${currentResult.scenarioA.content}\n\nKey Focus:\n- ${currentResult.scenarioA.bullets.join("\n- ")}`,
                          "scenA"
                        )
                      }
                      className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant transition-colors relative cursor-pointer"
                      title={lang === "vi" ? "Sao chép kịch bản A" : "Copy Scenario A"}
                    >
                      {copiedScenario === "scenA" ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h4 className="text-xl font-serif text-primary font-bold mb-3 tracking-tight">
                    {currentResult.scenarioA.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                    {currentResult.scenarioA.content}
                  </p>
                </div>

                {currentResult.scenarioA.bullets && currentResult.scenarioA.bullets.length > 0 && (
                  <div className="border-t border-outline-variant/60 pt-4">
                    <h5 className="text-[11px] font-bold text-primary uppercase mb-2 tracking-wider">
                      {lang === "vi" ? "Các điểm trọng tâm" : "Key Focus Dimensions"}
                    </h5>
                    <ul className="space-y-2">
                      {currentResult.scenarioA.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                          <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Scenario B Card */}
              <div className="border border-primary-container rounded-xl p-6 bg-[#0B0F19] text-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-white/10 text-secondary-container px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {currentResult.scenarioB.label}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${currentResult.scenarioB.title}\n\n${currentResult.scenarioB.content}`,
                          "scenB"
                        )
                      }
                      className="p-1.5 hover:bg-white/10 rounded text-gray-300 transition-colors cursor-pointer"
                      title={lang === "vi" ? "Sao chép kịch bản B" : "Copy Scenario B"}
                    >
                      {copiedScenario === "scenB" ? (
                        <Check className="w-4 h-4 text-secondary-container" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h4 className="text-xl font-sans font-bold text-white mb-3 tracking-tight">
                    {currentResult.scenarioB.title}
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed mb-5">
                    {currentResult.scenarioB.content}
                  </p>
                </div>

                {currentResult.scenarioB.stats && currentResult.scenarioB.stats.length > 0 && (
                  <div className="border-t border-white/10 pt-4">
                    <h5 className="text-[11px] font-bold text-secondary-container uppercase mb-2.5 tracking-wider">
                      {lang === "vi" ? "Điểm tăng tốc chiến lược" : "Strategic Accelerators"}
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      {currentResult.scenarioB.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 p-3 rounded-lg border border-white/10 flex flex-col justify-between"
                        >
                          {renderIcon(stat.icon)}
                          <span className="text-[11px] font-medium text-gray-400 mt-1 leading-snug">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 border-t border-outline-variant pt-4 mt-6">
              <div className="text-xs text-on-surface-variant">
                {lang === "vi"
                  ? <>Nội dung đã sẵn sàng để trình bày. Dùng <strong>Sao chép</strong> hoặc lưu vào kho lưu trữ!</>
                  : <>Generated styled content ready to present. Use <strong>Copy</strong> or save it into the archive history!</>}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleCopyMarkdown}
                  className="text-primary hover:text-secondary flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" /> {lang === "vi" ? "Sao chép Markdown" : "Copy Markdown"}
                </button>
                <button
                  onClick={handleExportPdf}
                  className="text-primary hover:text-secondary flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FileDown className="w-4 h-4" /> {lang === "vi" ? "Tải PDF" : "Download PDF"}
                </button>
                <button
                  onClick={() => {
                    copyToClipboard(
                      `[${currentResult.scenarioA.label}]\n${currentResult.scenarioA.title}\n${currentResult.scenarioA.content}\n\n[${currentResult.scenarioB.label}]\n${currentResult.scenarioB.title}\n${currentResult.scenarioB.content}`,
                      "full"
                    );
                    showNotification(lang === "vi" ? "Đã sao chép toàn bộ bộ pitch!" : "Full pitch suite copied to clipboard!");
                  }}
                  className="text-primary hover:text-secondary flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> {lang === "vi" ? "Chia sẻ bộ pitch" : "Share Suite"}
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className="text-primary hover:text-secondary flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4" /> {lang === "vi" ? "Xem phân tích" : "Match Analytics"}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
