/**
 * @file components/dashboard/ProjectsView.tsx
 * @description Renders the featured projects management tab.
 *              Displays projects as clean text-based cards (no images) with tech stack,
 *              role details, challenge descriptions, and impact metrics.
 */
"use client";

import React from "react";
import { Plus, Edit2, Trash2, Code, Briefcase, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import type { MasterProfile, Project } from "@/types";
import { translations, type Language } from "@/lib/translations";

interface ProjectsViewProps {
  profile: MasterProfile;
  editingProject: Project | null;
  projectTitle: string;
  setProjectTitle: (val: string) => void;
  projectDesc: string;
  setProjectDesc: (val: string) => void;
  projectRole: string;
  setProjectRole: (val: string) => void;
  projectChallenge: string;
  setProjectChallenge: (val: string) => void;
  projectTags: string;
  setProjectTags: (val: string) => void;
  projectOutcome: string;
  setProjectOutcome: (val: string) => void;
  openProjectModal: (proj?: Project) => void;
  handleSaveProject: () => void;
  handleDeleteProject: (id: string) => void;
  setEditingProject: (proj: Project | null) => void;
  mockImages: string[];
  lang: Language;
}

export function ProjectsView({
  profile,
  editingProject,
  projectTitle,
  setProjectTitle,
  projectDesc,
  setProjectDesc,
  projectRole,
  setProjectRole,
  projectChallenge,
  setProjectChallenge,
  projectTags,
  setProjectTags,
  projectOutcome,
  setProjectOutcome,
  openProjectModal,
  handleSaveProject,
  handleDeleteProject,
  setEditingProject,
  lang,
}: ProjectsViewProps) {
  const t = translations[lang];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-xl font-bold font-geist text-primary">{t.featuredProjectsHeader}</h2>
          <p className="text-sm text-on-surface-variant">
            {t.featuredProjectsDesc}
          </p>
        </div>
        <button
          onClick={() => openProjectModal()}
          className="bg-secondary text-on-secondary px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> {t.addProjectBtn}
        </button>
      </div>

      {/* Add/Edit project Inline Form */}
      {editingProject && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-surface border border-outline-variant rounded-xl p-5 space-y-4 overflow-hidden text-left"
        >
          <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
            <Edit2 className="w-4 h-4" />
            {editingProject.id ? t.editProjectDetails : t.addNewProjectDetails}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {t.projectTitleLabel}
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder={lang === "vi" ? "Ví dụ: Hệ thống CRM Doanh nghiệp" : "e.g. Enterprise CRM System"}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {t.projectRoleLabel}
              </label>
              <input
                type="text"
                value={projectRole}
                onChange={(e) => setProjectRole(e.target.value)}
                placeholder={lang === "vi" ? "Ví dụ: Trưởng nhóm, Kiến trúc sư hệ thống" : "e.g. Lead Architect, Senior Developer"}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {t.projectTagsLabel}
              </label>
              <input
                type="text"
                value={projectTags}
                onChange={(e) => setProjectTags(e.target.value)}
                placeholder="e.g. Next.js, TypeScript, PostgreSQL, AWS"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                {t.projectOutcomeLabel}
              </label>
              <input
                type="text"
                value={projectOutcome}
                onChange={(e) => setProjectOutcome(e.target.value)}
                placeholder={lang === "vi" ? "Ví dụ: Giảm 40% thời gian tải và tăng 99% bảo mật." : "e.g. Reduced loading times by 40% and improved security by 99%."}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">
              {t.projectDescLabel}
            </label>
            <input
              type="text"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              placeholder={lang === "vi" ? "Tóm tắt kiến trúc tổng thể và những gì đã xây dựng..." : "Provide a general summary of the project architecture and what was built..."}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">
              {t.projectChallengeLabel}
            </label>
            <textarea
              value={projectChallenge}
              onChange={(e) => setProjectChallenge(e.target.value)}
              placeholder={lang === "vi" ? "Bài toán/vấn đề của khách hàng trước khi bắt đầu dự án là gì?" : "What was the client's problem or system bottleneck before starting?"}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none h-20 resize-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => setEditingProject(null)}
              className="px-3.5 py-2 border border-outline text-primary rounded-lg text-xs font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              {lang === "vi" ? "Hủy" : "Cancel"}
            </button>
            <button
              onClick={handleSaveProject}
              className="px-3.5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-bold hover:shadow-sm cursor-pointer"
            >
              {lang === "vi" ? "Lưu Dự Án" : "Save Project"}
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List Grid (Clean Flat Design - No Images) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.projects.map((proj) => (
          <div
            key={proj.id}
            className="border border-outline-variant rounded-xl p-5 bg-surface-container-lowest hover:shadow-md transition-all flex flex-col justify-between min-h-[220px] hover:border-secondary/35 group relative text-left"
          >
            <div className="space-y-3">
              {/* Header: Title, Role and Action buttons */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-sm font-black text-primary leading-tight truncate">{proj.title}</h3>
                  {proj.role && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                      <Briefcase className="w-2.5 h-2.5" />
                      {proj.role}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => openProjectModal(proj)}
                    className="p-1.5 rounded-full border border-outline-variant bg-surface text-primary hover:bg-secondary/10 hover:text-secondary transition-colors cursor-pointer"
                    title={lang === "vi" ? "Chỉnh sửa dự án" : "Edit project"}
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-1.5 rounded-full border border-outline-variant bg-surface text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors cursor-pointer"
                    title={lang === "vi" ? "Xóa dự án" : "Delete project"}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Tech Stack Tags */}
              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-low text-on-surface-variant text-[8px] font-extrabold uppercase px-2 py-0.5 rounded border border-outline-variant/30 flex items-center gap-1"
                    >
                      <Code className="w-2 h-2 text-outline" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {proj.description}
                </p>
                
                {/* Challenge section if available */}
                {proj.challenge && (
                  <div className="text-[10px] bg-slate-50 p-2 rounded-md border border-slate-100 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-bold text-[9px] text-slate-500 uppercase block leading-none mb-1">
                        {lang === "vi" ? "Thách thức:" : "Challenge:"}
                      </span>
                      <p className="text-[10px] text-slate-600 leading-normal line-clamp-2">{proj.challenge}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Impact Metric result outcome */}
            {proj.outcome && (
              <div className="mt-3 pt-3 border-t border-outline-variant/50">
                <div className="flex items-start gap-2 bg-emerald-50 text-emerald-800 text-[10px] p-2 rounded-lg border border-emerald-100 leading-normal">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-[8px] text-emerald-700 uppercase block leading-none mb-0.5">
                      {lang === "vi" ? "Kết quả thực tế:" : "Impact Result:"}
                    </span>
                    <p className="font-medium text-emerald-900">{proj.outcome}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {profile.projects.length === 0 && (
          <div className="col-span-2 text-center py-12 border-2 border-dashed border-outline-variant rounded-xl text-sm text-on-surface-variant">
            <p className="font-semibold text-primary mb-1">{t.noProjectsHeader}</p>
            <p>{t.noProjectsDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
