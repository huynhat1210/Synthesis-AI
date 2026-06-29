/**
 * @file components/dashboard/PitchCard.tsx
 * @description Individual saved pitch card component for the dashboard grid.
 */
"use client";

import { useState } from "react";
import { Star, Trash2, ExternalLink, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PitchCardProps } from "@/types";

export function PitchCard({ pitch, onDelete, onLoad, onStar, className }: PitchCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    onDelete(pitch.id);
  };

  const goalBadgeColor = [
    "bg-secondary-container/30 text-on-secondary-container",
    "bg-primary-container/30 text-on-primary-container",
    "bg-surface-container-high text-on-surface-variant",
  ][pitch.id.charCodeAt(0) % 3];

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden",
        className
      )}
    >
      {/* Accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-secondary to-primary" />

      <div className="flex-1 p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-primary truncate font-geist leading-tight">
              {pitch.pitch.scenarioA.title}
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">{pitch.date}</p>
          </div>
          {onStar && (
            <button
              onClick={() => onStar(pitch.id)}
              aria-label={pitch.starred ? "Unstar pitch" : "Star pitch"}
              className="text-on-surface-variant hover:text-secondary transition-colors shrink-0 mt-0.5"
            >
              <Star
                className={cn(
                  "w-4 h-4",
                  pitch.starred && "fill-secondary text-secondary"
                )}
              />
            </button>
          )}
        </div>

        {/* Goal + audience badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide", goalBadgeColor)}>
            {pitch.context.pitchGoal}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-surface-container text-on-surface-variant">
            {pitch.context.style}
          </span>
        </div>

        {/* Audience preview */}
        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
          {pitch.context.targetAudience}
        </p>

        {/* Scenario A bullets preview */}
        {pitch.pitch.scenarioA.bullets.length > 0 && (
          <ul className="space-y-1">
            {pitch.pitch.scenarioA.bullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-on-surface-variant">
                <span className="mt-1 w-1 h-1 rounded-full bg-secondary shrink-0" />
                <span className="line-clamp-1">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer actions */}
      <div className="px-5 pb-4 flex items-center justify-between gap-2 border-t border-outline-variant/50 pt-3">
        <button
          onClick={handleDelete}
          aria-label="Delete pitch"
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium transition-colors",
            confirmDelete
              ? "text-error font-bold"
              : "text-on-surface-variant hover:text-error"
          )}
        >
          <Trash2 className="w-3.5 h-3.5" />
          {confirmDelete ? "Confirm?" : "Delete"}
        </button>

        <button
          onClick={() => onLoad(pitch)}
          className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
        >
          View Pitch
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
