/**
 * @file components/dashboard/ProjectsView.tsx
 * @description Renders the featured projects management tab.
 */
"use client";

import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { MasterProfile, Project } from "@/types";

interface ProjectsViewProps {
  profile: MasterProfile;
  editingProject: Project | null;
  projectTitle: string;
  setProjectTitle: (val: string) => void;
  projectDesc: string;
  setProjectDesc: (val: string) => void;
  openProjectModal: (proj?: Project) => void;
  handleSaveProject: () => void;
  handleDeleteProject: (id: string) => void;
  setEditingProject: (proj: Project | null) => void;
  mockImages: string[];
}

export function ProjectsView({
  profile,
  editingProject,
  projectTitle,
  setProjectTitle,
  projectDesc,
  setProjectDesc,
  openProjectModal,
  handleSaveProject,
  handleDeleteProject,
  setEditingProject,
  mockImages,
}: ProjectsViewProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-xl font-bold font-geist text-primary">FEATURED PROJECTS</h2>
          <p className="text-sm text-on-surface-variant">
            Featured projects provide proof points for target proposals.
          </p>
        </div>
        <button
          onClick={() => openProjectModal()}
          className="bg-secondary text-on-secondary px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* Add/Edit project Inline Form */}
      {editingProject && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-surface border border-outline-variant rounded-xl p-5 space-y-4 overflow-hidden"
        >
          <h3 className="text-sm font-bold text-primary flex items-center gap-1.5">
            <Edit2 className="w-4 h-4" />
            {editingProject.id ? "Edit Project Details" : "Add New Featured Project"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. Enterprise CRM System"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Impact & Core Result Summary
              </label>
              <input
                type="text"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="e.g. Redesigned customer journey decreasing churn rate by 22%."
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2.5 text-xs focus:border-secondary outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={() => setEditingProject(null)}
              className="px-3.5 py-2 border border-outline text-primary rounded-lg text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProject}
              className="px-3.5 py-2 bg-secondary text-on-secondary rounded-lg text-xs font-semibold"
            >
              Save Project
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.projects.map((proj) => (
          <div
            key={proj.id}
            className="border border-outline-variant rounded-xl overflow-hidden bg-surface hover:shadow-sm transition-all flex flex-col justify-between h-72 animate-fade-in"
          >
            <div>
              <div className="relative h-40 bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proj.image || mockImages[0]}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => openProjectModal(proj)}
                    className="bg-surface-container-lowest p-2 rounded-full border border-outline-variant shadow text-primary hover:text-secondary transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="bg-surface-container-lowest p-2 rounded-full border border-outline-variant shadow text-on-surface-variant hover:text-error transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-primary mb-1.5">{proj.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        {profile.projects.length === 0 && (
          <div className="col-span-2 text-center py-12 border-2 border-dashed border-outline-variant rounded-xl text-sm text-on-surface-variant">
            No projects in profile. Add your first project above to serve as a stellar proof point!
          </div>
        )}
      </div>
    </div>
  );
}
