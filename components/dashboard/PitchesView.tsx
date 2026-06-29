/**
 * @file components/dashboard/PitchesView.tsx
 * @description Renders the pitch history archive tab.
 */
"use client";

import React from "react";
import { FileText, Star, Copy, Trash2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SavedPitch } from "@/types";

interface PitchesViewProps {
  savedPitches: SavedPitch[];
  loadSavedPitch: (saved: SavedPitch) => void;
  handleStarSavedPitch: (id: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  handleDeleteSavedPitch: (id: string) => void;
}

export function PitchesView({
  savedPitches,
  loadSavedPitch,
  handleStarSavedPitch,
  copyToClipboard,
  handleDeleteSavedPitch,
}: PitchesViewProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">PITCH HISTORY ARCHIVE</h2>
        <p className="text-sm text-on-surface-variant">
          Keep track of your generated pitches. Re-load, view, or delete past context-aware creations.
        </p>
      </div>

      <div className="space-y-4">
        {savedPitches.map((saved) => (
          <div
            key={saved.id}
            className="border border-outline-variant rounded-xl p-5 bg-surface hover:shadow-sm transition-all flex flex-col lg:flex-row justify-between gap-4 animate-fade-in"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary-container text-on-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {saved.context.pitchGoal}
                </span>
                <span className="text-xs text-on-surface-variant">{saved.date}</span>
                {saved.starred && (
                  <span className="text-secondary text-xs flex items-center gap-0.5 font-semibold">
                    <Star className="w-3 h-3 fill-secondary text-secondary" /> Starred
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-primary">
                Audience: &ldquo;{saved.context.targetAudience}&rdquo;
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="border-l-2 border-secondary pl-2">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                    Scenario A: {saved.pitch.scenarioA.title}
                  </span>
                  <span className="text-xs text-on-surface-variant line-clamp-1">
                    {saved.pitch.scenarioA.content}
                  </span>
                </div>
                <div className="border-l-2 border-primary-container pl-2">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                    Scenario B: {saved.pitch.scenarioB.title}
                  </span>
                  <span className="text-xs text-on-surface-variant line-clamp-1">
                    {saved.pitch.scenarioB.content}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:self-center shrink-0">
              <button
                onClick={() => loadSavedPitch(saved)}
                className="bg-primary-container hover:bg-primary-container/95 text-on-primary px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                Load Context
              </button>
              <button
                onClick={() => handleStarSavedPitch(saved.id)}
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-primary transition-colors"
                title="Star Pitch"
              >
                <Star className={cn("w-4 h-4", saved.starred && "fill-secondary text-secondary")} />
              </button>
              <button
                onClick={() =>
                  copyToClipboard(
                    `[Scenario A: ${saved.pitch.scenarioA.title}]\n${saved.pitch.scenarioA.content}\n\n[Scenario B: ${saved.pitch.scenarioB.title}]\n${saved.pitch.scenarioB.content}`,
                    saved.id
                  )
                }
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-primary transition-colors"
                title="Copy Pitch Content"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    const shareUrl = `${window.location.origin}/pitch/${saved.id}`;
                    copyToClipboard(shareUrl, `share-${saved.id}`);
                  }
                }}
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-primary transition-colors flex items-center gap-1 hover:text-secondary"
                title="Copy Public Share Link"
              >
                <Globe className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-semibold text-secondary px-0.5">Share Page</span>
              </button>
              <button
                onClick={() => handleDeleteSavedPitch(saved.id)}
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-error transition-colors"
                title="Delete Archived Pitch"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {savedPitches.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-outline-variant rounded-xl">
            <FileText className="w-12 h-12 text-outline mx-auto mb-3" />
            <h3 className="text-sm font-bold text-primary mb-1">Your Pitch Archive is Empty</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
              Generate a highly polished pitch in the Dashboard and save it to build a structured
              context history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
