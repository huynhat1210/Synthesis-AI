/**
 * @file components/dashboard/HelpView.tsx
 * @description Renders static manual guide and FAQ guide page.
 */
"use client";

import React from "react";

export function HelpView() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">HELP & MANUAL GUIDE</h2>
        <p className="text-sm text-on-surface-variant">
          Frequently Asked Questions & guidelines to make the most out of Synthesis AI.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl animate-fade-in">
        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">What is Synthesis AI PitchPerfect?</h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            PitchPerfect is a premium context-aware narrative generation suit. By matching your
            expert background profile and unique projects with target audiences, it generates
            bespoke pitch presentations with tailored messaging.
          </p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">
            How can I feed custom project data to the AI?
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Navigate to the <strong>Projects</strong> tab in the sidebar navigation rail to add
            and edit your project experience. Once added, the AI engine intelligently integrates
            them as proof dimensions.
          </p>
        </div>

        <div className="p-4 bg-surface rounded-xl border border-outline-variant">
          <h3 className="text-sm font-bold text-primary mb-1">
            Can I copy the generated scenarios easily?
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Yes! Inside the <strong>Live Pitch Preview</strong> at the bottom of the dashboard, you
            will find copy-icon triggers next to each card to instantly save text to your clipboard.
          </p>
        </div>
      </div>
    </div>
  );
}
