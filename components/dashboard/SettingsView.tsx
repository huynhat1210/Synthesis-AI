/**
 * @file components/dashboard/SettingsView.tsx
 * @description Renders the system settings configuration tab.
 */
"use client";

import React from "react";

interface SettingsViewProps {
  hasApiKey: boolean;
  handleResetState: () => void;
}

export function SettingsView({ hasApiKey, handleResetState }: SettingsViewProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm space-y-6 animate-fade-in">
      <div className="border-b border-outline-variant pb-4">
        <h2 className="text-xl font-bold font-geist text-primary">SYSTEM SETTINGS</h2>
        <p className="text-sm text-on-surface-variant">
          Configure default writing properties and sandbox simulation modes.
        </p>
      </div>

      <div className="space-y-5 max-w-xl animate-fade-in">
        <div>
          <h3 className="text-sm font-bold text-primary mb-2">Sandbox simulation mode</h3>
          <p className="text-xs text-on-surface-variant mb-3">
            If Gemini API key is missing, PitchPerfect automatically falls back to beautiful
            smart-personalized sandbox mock simulations.
          </p>
          <div className="p-3 bg-surface rounded-lg border border-outline-variant flex items-center justify-between">
            <span className="text-xs font-semibold text-primary">Simulation state</span>
            <span className="text-xs font-bold text-secondary uppercase bg-secondary-container/10 px-2.5 py-1 rounded">
              {hasApiKey ? "AI Active" : "Mock Fallback Activated"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-primary mb-2">Clear Local Storage Cache</h3>
          <p className="text-xs text-on-surface-variant mb-3">
            This will restore the app state back to default placeholders, removing all your changes
            and saved pitches.
          </p>
          <button
            onClick={handleResetState}
            className="bg-error text-on-error hover:bg-error/95 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
          >
            Reset Application State
          </button>
        </div>
      </div>
    </div>
  );
}
