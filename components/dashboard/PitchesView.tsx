/**
 * @file components/dashboard/PitchesView.tsx
 * @description Renders the pitch history archive tab with target client search filters.
 */
"use client";

import React, { useState } from "react";
import { FileText, Star, Copy, Trash2, Globe, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SavedPitch } from "@/types";
import { translations, type Language } from "@/lib/translations";

interface PitchesViewProps {
  savedPitches: SavedPitch[];
  loadSavedPitch: (saved: SavedPitch) => void;
  handleStarSavedPitch: (id: string) => void;
  copyToClipboard: (text: string, id: string) => void;
  handleDeleteSavedPitch: (id: string) => void;
  lang: Language;
}

export function PitchesView({
  savedPitches,
  loadSavedPitch,
  handleStarSavedPitch,
  copyToClipboard,
  handleDeleteSavedPitch,
  lang,
}: PitchesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[lang];

  // Dynamic client-side filtering based on target client, goal, and scenario titles
  const filteredPitches = savedPitches.filter((saved) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      saved.context.targetAudience.toLowerCase().includes(query) ||
      saved.context.pitchGoal.toLowerCase().includes(query) ||
      saved.pitch.scenarioA.title.toLowerCase().includes(query) ||
      saved.pitch.scenarioB.title.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-4">
        <div>
          <h2 className="text-xl font-bold font-geist text-primary uppercase">{t.historyHeader}</h2>
          <p className="text-sm text-on-surface-variant">
            {t.historyDesc}
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-surface border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-xs focus:border-secondary outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredPitches.map((saved) => (
          <div
            key={saved.id}
            className="border border-outline-variant rounded-xl p-5 bg-surface hover:shadow-sm transition-all flex flex-col lg:flex-row justify-between gap-4 animate-fade-in text-left"
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
                Audience: &ldquo;{saved.context.targetAudience.normalize("NFC")}&rdquo;
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="border-l-2 border-secondary pl-2">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                    Scenario A: {saved.pitch.scenarioA.title.normalize("NFC")}
                  </span>
                  <span className="text-xs text-on-surface-variant line-clamp-1">
                    {saved.pitch.scenarioA.content.normalize("NFC")}
                  </span>
                </div>
                <div className="border-l-2 border-primary-container pl-2">
                  <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                    Scenario B: {saved.pitch.scenarioB.title.normalize("NFC")}
                  </span>
                  <span className="text-xs text-on-surface-variant line-clamp-1">
                    {saved.pitch.scenarioB.content.normalize("NFC")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:self-center shrink-0">
              <button
                onClick={() => loadSavedPitch(saved)}
                className="bg-primary-container hover:bg-primary-container/95 text-on-primary px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                {t.loadContextBtn}
              </button>
              <button
                onClick={() => handleStarSavedPitch(saved.id)}
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-primary transition-colors cursor-pointer"
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
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-primary transition-colors cursor-pointer"
                title={t.copyBtn}
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
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-primary transition-colors flex items-center gap-1 hover:text-secondary cursor-pointer"
                title={t.shareBtn}
              >
                <Globe className="w-4 h-4 text-secondary" />
                <span className="text-[10px] font-semibold text-secondary px-0.5">{t.sharePageBtn}</span>
              </button>
              <button
                onClick={() => handleDeleteSavedPitch(saved.id)}
                className="p-2 border border-outline hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                title={t.deletePitchTitle}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {savedPitches.length > 0 && filteredPitches.length === 0 && (
          <div className="text-center py-16 border border-dashed border-outline-variant rounded-xl">
            <FileText className="w-12 h-12 text-outline mx-auto mb-3" />
            <h3 className="text-sm font-bold text-primary mb-1">{t.noMatches}</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
              {t.noSearchResults}
            </p>
          </div>
        )}

        {savedPitches.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-outline-variant rounded-xl">
            <FileText className="w-12 h-12 text-outline mx-auto mb-3" />
            <h3 className="text-sm font-bold text-primary mb-1">{t.archiveEmptyHeader}</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
              {t.archiveEmptyDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
