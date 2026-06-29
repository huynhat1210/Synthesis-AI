/**
 * @file components/dashboard/ProfileView.tsx
 * @description Renders the Master Profile editing tab.
 */
"use client";

import React from "react";
import { X } from "lucide-react";
import type { MasterProfile } from "@/types";

interface ProfileViewProps {
  profile: MasterProfile;
  setProfileState: React.Dispatch<React.SetStateAction<MasterProfile>>;
  newSkill: string;
  setNewSkill: (val: string) => void;
  handleAddSkill: (e: React.FormEvent) => void;
  handleRemoveSkill: (skill: string) => void;
  setActiveTab: (tab: any) => void;
  showNotification: (msg: string, type?: "success" | "info") => void;
  syncProfileToServer: (p: MasterProfile) => void;
}

export function ProfileView({
  profile,
  setProfileState,
  newSkill,
  setNewSkill,
  handleAddSkill,
  handleRemoveSkill,
  setActiveTab,
  showNotification,
  syncProfileToServer,
}: ProfileViewProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">MASTER PROFILE CONTEXT</h2>
        <p className="text-sm text-on-surface-variant">
          Design the foundation of your expert background to align with all generated narrative
          streams.
        </p>
      </div>

      <div className="space-y-5 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
              Full Professional Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfileState({ ...profile, fullName: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
              Job Designation / Title
            </label>
            <input
              type="text"
              value={profile.jobTitle}
              onChange={(e) => setProfileState({ ...profile, jobTitle: e.target.value })}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
            Professional Bio Summary
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfileState({ ...profile, bio: e.target.value })}
            rows={5}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/10 outline-none leading-relaxed"
            placeholder="Detail your professional highlights..."
          />
        </div>

        {/* Manage Skills directly */}
        <div>
          <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wide">
            Expert Skills Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-3 p-3 border border-outline-variant rounded-lg bg-surface">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-primary-container/10 text-primary-container px-3 py-1 rounded-full text-xs font-semibold border border-outline-variant flex items-center gap-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-on-surface-variant hover:text-error"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddSkill} className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. Next.js, Strategic Modeling, Venture Capital"
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs focus:border-secondary outline-none w-full max-w-xs"
            />
            <button
              type="submit"
              className="bg-secondary text-on-secondary px-4 py-2 rounded-lg text-xs font-semibold"
            >
              Add Tag
                        </button>
          </form>
        </div>

        <div className="pt-4 border-t border-outline-variant">
          <button
            onClick={async () => {
              showNotification("Master Profile updated successfully!");
              setActiveTab("dashboard");
              await syncProfileToServer(profile);
            }}
            className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            Save and Return
          </button>
        </div>
      </div>
    </div>
  );
}
